# Azure Deployment Plan

## Status
Deployed: Azure API and Cloudflare frontend.

## Scope
Connect the standalone `#/translate` page to Azure Speech and verify real-time translation. Per the user's follow-up, translation is a separate page and main-menu entry, not an itinerary tab. At resume on 2026-10-18, read-only Azure discovery confirmed the previously existing dedicated resource group and all of its resources no longer exist. Provision the dedicated resource group and only the Speech and Functions resources this feature needs. Do not reuse unrelated resources.

## Recipe
- Deployment tool: Azure CLI with Bicep.
- Infrastructure template: `api/infra/subscription.bicep`, subscription scope in North Europe; creates `rg-trip-translator` and invokes `api/infra/main.bicep`.
- Code deployment: Azure Functions JavaScript v4 package deployment to the newly provisioned Flex Consumption Function App.

## Decisions
- Subscription: `shirokuma` (`f80766c9-6be7-43f9-8369-d492efceff1e`), confirmed as the Azure CLI default.
- Resource group: `rg-trip-translator`, absent at resume and to be created for this feature.
- Region: `northeurope`. West Europe is denied by a management-group policy; North Europe supports Azure Speech translation and Flex Consumption, and is where the existing resources are deployed.
- Classification/scale: inferred POC for the two travelers on the existing itinerary; use usage-based hosting and avoid unnecessary services.
- Function hosting: deploy Flex Consumption `FC1`; no existing app will be modified.
- New Function App: `func-trip-translate-kpy2a7mzjnpd4`; new isolated FC1 plan, backing Storage account, user-assigned managed identity, Log Analytics workspace, and Application Insights component are defined in Bicep.
- Speech: create `SpeechServices` resource `speech-trip-kpy2a7mzjnpd4` (S0) in `northeurope`.
- Historical discovery found a protected Function App, but fresh CLI discovery on resume found no trip resource group or Speech resource. Do not recreate Translator, Key Vault, or the old protected Function App.
- Add a storage account and Application Insights/Log Analytics for the new Flex app, following the Azure Functions JavaScript v4 Flex Consumption template with managed identity.
- Resolve the Speech key inside Azure deployment/runtime settings; never print it or include it in source control or Vite build output.
- Translation source locales remain manually selected (`de-DE`, `hu-HU`, `cs-CZ`) and target locale is Japanese (`ja`).
- The user selected a prototype public endpoint with Azure-side usage limiting instead of requiring Microsoft Entra sign-in; any rate limit held only in process memory is best-effort and is not strong abuse prevention.
- The `Microsoft.Quota` provider is not registered, so the quota CLI check could not run. Do not register it just for this small feature; existing resources are already provisioned.
- Expected spend is usage-based (Flex Consumption, storage/telemetry, and S0 Speech); the retail-pricing query returned no matching price rows, so no exact estimate is asserted.
- The new Function App CORS policy allows all origins because the site may be served from Cloudflare or a local preview; the endpoint has no credentialed browser access and returns only short-lived Speech tokens.
- Flex Consumption's maximum-instance setting is 40 (the platform minimum). The in-memory six-requests-per-minute limit is per instance, best-effort, and not a hard cost ceiling.

## Components
- Frontend: React/Vite static app hosted on Cloudflare Workers Static Assets.
- Backend: new public Azure Functions HTTP trigger issues short-lived Azure Speech tokens; apply a best-effort per-instance limit and configure CORS for the app.
- Speech: Azure AI Speech handles continuous speech translation to Japanese. A separate Text Translation resource is not needed.

## All validation checks pass
- [x] Frontend and API checks.
  - [x] `npm run lint`.
  - [x] `npm run build`.
  - [x] `node --check api\src\functions\speechToken.js`.
  - [x] `npm audit --omit=dev --audit-level=high` from the root and `api` directories.
  - [x] `npm --prefix api test`: five token-endpoint regression tests pass.
- [x] Azure Bicep core validation using `validate-deployment.ps1`.
  - [x] `az version` and `az account show` succeed.
  - [x] `az bicep build --file api\infra\subscription.bicep` succeeds.
  - [x] `az deployment sub validate` succeeds for the subscription template.
  - [x] `az deployment sub what-if` shows only additive resources in `rg-trip-translator`.
- [x] Static RBAC review: managed identity receives only Storage Blob Data Owner on the new backing storage and Monitoring Metrics Publisher on the new Application Insights resource.
- [x] After deployment, verify token endpoint preflight and response shape without printing token contents.
- [x] Verify standalone translation route, common menu, error/retry UI, and mobile width in a browser.
- [x] Verify live translation with synthetic speech and stream cleanup on stop/navigation, including delayed token and microphone responses.
- [ ] Physical device microphone and human speech verification (not performed).
- [x] Publish frontend to Cloudflare after user renewed authentication.

## Validation Proof
- 2026-10-18 12:18 JST: `validate-deployment.ps1 -Scope sub -Location northeurope -Template api\infra\subscription.bicep -Parameters api\infra\main.parameters.json -Subscription f80766c9-6be7-43f9-8369-d492efceff1e`: overall PASS. CLI authentication, Bicep compilation, subscription template validation, and what-if all pass. What-if: 14 creates, 0 modifications, 0 deletes.
- 2026-10-18: `npm run lint` passes with one pre-existing `PlansMap.jsx` Fast Refresh warning. `npm run build` succeeds; SDK is lazy-loaded, existing main bundle size warning remains.
- 2026-10-18: `node --check api\src\functions\speechToken.js` passes; `npm audit --omit=dev --audit-level=high` in both root and API reports zero production vulnerabilities.
- Static RBAC review: Storage Blob Data Owner scoped only to the new storage account; Monitoring Metrics Publisher scoped only to the new Application Insights component. Both target the new user-assigned managed identity (`ServicePrincipal`). No permissions are granted on unrelated resources or to interactive users. Deployment principal is subscription Owner.
- Bicep `appSettings` parameter marked secure; Speech `listKeys` executes in ARM, not in the frontend or CLI output.
- Initial group-scope validation failed because the previously existing resource group had disappeared. The replacement subscription template creates the dedicated RG; the full validation above supersedes that failure.
- 2026-10-18: subscription deployment `trip-speech-translation` succeeded. New Function App is Running with HTTPS-only access. Remote code build/deployment succeeded.
- 2026-10-18: live endpoint POST returns 200, a nonempty token, region `northeurope`, and `Cache-Control: no-store`. Preflight returns 204 with wildcard noncredentialed CORS. Token values were not printed.
- 2026-10-18: live Speech SDK tests of synthetic German, Hungarian, and Czech audio each return Japanese translation. Browser continuous German input displays `Guten Morgen.` and `おはようございます。`.
- 2026-10-18: browser checks confirm ended MediaStream tracks after stop and navigation; a microphone stream resolving after page exit is also stopped. Aborted connections do not open another microphone. Error responses display Japanese feedback and allow retry.
- 2026-10-18: `wrangler whoami` reports expired authentication, so no frontend deployment was attempted and no Access settings or public URLs were changed.
- 2026-10-18 12:39 JST: user renewed Cloudflare authentication; `npm run build`, `wrangler deploy --dry-run`, and `npm run deploy` succeeded. Active production deployment is 100% version `de911b4c-93cf-4b3e-9495-d4a7079515eb`.
- Production domain remains `tabinotes.norr-tech.com`; workers.dev and preview URLs remain disabled. Unauthenticated browser navigation correctly redirects to Cloudflare Access. The authenticated production page cannot be inspected without the user's website login; matching build routing and live Speech integration were verified locally.
- Post-publication Azure API check returns 200 with a valid token shape and region `northeurope`.
- 2026-10-18: follow-up adds Japanese ↔ German/Hungarian/Czech direction swapping on the standalone page. Speech recognition locale and translation target switch together; changing direction or language stops capture and aborts pending startup. Confirmed history retains its original language/direction.
- Synthetic Japanese audio translated live to German, Hungarian, and Czech through the browser UI. German→Japanese regression also passes. Direction changes stop all microphone tracks, including during connection startup. Mobile 390px layout has no horizontal overflow.
- Frontend rebuilt and deployed as version `74fc9c05-b4e9-4069-bd6e-4df8dd2b80d3`; Cloudflare API confirms 100% production traffic. Existing Access redirect is preserved. No Azure infrastructure or backend deployment changes were needed for bidirectional translation.
- Follow-up UI changes fold instructions into an accessible disclosure and compact the header and controls so translation results use the remaining viewport width and height. Mobile and desktop layout checks, disclosure keyboard operation, error display, and simulated long-history/stop/clear flows pass.
- Latest frontend version is `c67ebd7b-540b-4e0b-9107-fed58ef25007`, confirmed at 100% production traffic. The custom domain and Cloudflare Access redirect are preserved.

## Deployed Target
- Resource group: `rg-trip-translator`, North Europe.
- Speech: `speech-trip-kpy2a7mzjnpd4`, S0.
- API: `https://func-trip-translate-kpy2a7mzjnpd4.azurewebsites.net/api/speech-token` (POST).
- Frontend: `https://tabinotes.norr-tech.com/#/translate`, published to the existing protected Worker. Source and production build configured through the public API URL in `.env`.

## Deployment and Verification
- Use the official Azure Functions JavaScript v4 Flex Consumption HTTP template and Azure Verified Modules as the infrastructure baseline. Create the dedicated group in North Europe. Do not change unrelated resources.
- Configure the frontend with the new Function endpoint URL and the deployed Function App with the existing Speech resource region/key. Do not print tokens or keys during verification.
- Validate with safe endpoint checks and browser UI verification. A full live microphone test requires browser microphone permission and real audio; report any part that cannot be verified.
- Existing S0 Speech use and Flex Consumption are usage-based / quota-limited; monitor Azure usage. The prototype endpoint's in-memory rate limit does not guarantee a hard spend cap.
