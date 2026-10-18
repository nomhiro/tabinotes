# Trip Speech Token API

This Azure Functions JavaScript v4 app exchanges the Speech resource key for a short-lived Azure Speech authorization token. The key stays in Azure app settings and is never included in the browser bundle.

## Local development

Install dependencies and start Azure Functions Core Tools from this directory. Provide `SPEECH_KEY` and `SPEECH_REGION` through the local process environment; do not commit `local.settings.json` or credentials.

## Azure deployment

Deploy `infra/subscription.bicep` at subscription scope in `northeurope`. It creates dedicated `rg-trip-translator`, Speech S0, an isolated Flex Consumption Function App, backing storage, managed identity, and telemetry resources. ARM `listKeys` passes the Speech key into a secure app-settings module parameter without printing it. No unrelated Function App is modified.

From the repository root, after validating the infrastructure:

```powershell
az deployment sub create --name trip-speech-translation --location northeurope --template-file .\api\infra\subscription.bicep --parameters .\api\infra\main.parameters.json
Compress-Archive -Path api\host.json,api\package.json,api\package-lock.json,api\src -DestinationPath "$env:TEMP\tabinotes-speech-api.zip" -Force
az functionapp deployment source config-zip -g rg-trip-translator -n func-trip-translate-kpy2a7mzjnpd4 --src "$env:TEMP\tabinotes-speech-api.zip" --build-remote true
```

The endpoint is `POST /api/speech-token`; `OPTIONS` supports browser preflight. Its in-memory per-client request limit is a prototype safeguard, not a hard spend cap or distributed abuse control. Flex Consumption requires a maximum-instance setting of at least 40, so limits are not shared across instances.

The Function project and infrastructure baseline follow the MIT-licensed Azure sample `Azure-Samples/functions-quickstart-javascript-azd`; see `LICENSE.md`.
