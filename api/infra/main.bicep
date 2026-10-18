targetScope = 'resourceGroup'

param location string = 'northeurope'
param functionAppName string = 'func-trip-translate-kpy2a7mzjnpd4'
param functionPlanName string = 'plan-trip-translate-kpy2a7mzjnpd4'
param storageAccountName string = 'sttrpspeechkpy2a7mzjnpd4'
param identityName string = 'id-trip-translate-kpy2a7mzjnpd4'
param logAnalyticsName string = 'log-trip-translate-kpy2a7mzjnpd4'
param applicationInsightsName string = 'appi-trip-translate-kpy2a7mzjnpd4'
param speechResourceName string = 'speech-trip-kpy2a7mzjnpd4'
param deploymentStorageContainerName string = 'function-app-deployment'

var tags = {
  feature: 'trip-speech-translation'
}
var blobDataOwnerRoleId = 'b7e6dc6d-f1e8-4753-8033-0f276bb0955b'
var monitoringMetricsPublisherRoleId = '3913510d-42f4-4e42-8a64-420c390055eb'

resource speech 'Microsoft.CognitiveServices/accounts@2023-05-01' = {
  name: speechResourceName
  location: location
  kind: 'SpeechServices'
  sku: {
    name: 'S0'
  }
  tags: tags
  properties: {
    publicNetworkAccess: 'Enabled'
  }
}

module identity 'br/public:avm/res/managed-identity/user-assigned-identity:0.4.1' = {
  name: 'tripSpeechIdentity'
  params: {
    name: identityName
    location: location
    tags: tags
  }
}

module plan 'br/public:avm/res/web/serverfarm:0.1.1' = {
  name: 'tripSpeechPlan'
  params: {
    name: functionPlanName
    sku: {
      name: 'FC1'
      tier: 'FlexConsumption'
    }
    reserved: true
    location: location
    tags: tags
  }
}

module storage 'br/public:avm/res/storage/storage-account:0.8.3' = {
  name: 'tripSpeechStorage'
  params: {
    name: storageAccountName
    allowBlobPublicAccess: false
    allowSharedKeyAccess: false
    dnsEndpointType: 'Standard'
    publicNetworkAccess: 'Enabled'
    networkAcls: {
      defaultAction: 'Allow'
      bypass: 'AzureServices'
    }
    blobServices: {
      containers: [
        {
          name: deploymentStorageContainerName
        }
      ]
    }
    minimumTlsVersion: 'TLS1_2'
    location: location
    tags: tags
  }
}

module logAnalytics 'br/public:avm/res/operational-insights/workspace:0.11.1' = {
  name: 'tripSpeechLogAnalytics'
  params: {
    name: logAnalyticsName
    location: location
    tags: tags
    dataRetention: 30
  }
}

module monitoring 'br/public:avm/res/insights/component:0.6.0' = {
  name: 'tripSpeechMonitoring'
  params: {
    name: applicationInsightsName
    location: location
    tags: tags
    workspaceResourceId: logAnalytics.outputs.resourceId
    disableLocalAuth: true
  }
}

resource storageAccount 'Microsoft.Storage/storageAccounts@2022-09-01' existing = {
  name: storageAccountName
}

resource applicationInsights 'Microsoft.Insights/components@2020-02-02' existing = {
  name: applicationInsightsName
}

resource storageBlobDataOwner 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid(storageAccount.id, identityName, blobDataOwnerRoleId)
  scope: storageAccount
  properties: {
    roleDefinitionId: subscriptionResourceId('Microsoft.Authorization/roleDefinitions', blobDataOwnerRoleId)
    principalId: identity.outputs.principalId
    principalType: 'ServicePrincipal'
  }
  dependsOn: [
    storage
  ]
}

resource appInsightsMetricsPublisher 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid(applicationInsights.id, identityName, monitoringMetricsPublisherRoleId)
  scope: applicationInsights
  properties: {
    roleDefinitionId: subscriptionResourceId('Microsoft.Authorization/roleDefinitions', monitoringMetricsPublisherRoleId)
    principalId: identity.outputs.principalId
    principalType: 'ServicePrincipal'
  }
  dependsOn: [
    monitoring
  ]
}

module api './app/api.bicep' = {
  name: 'tripSpeechApi'
  params: {
    name: functionAppName
    location: location
    tags: tags
    applicationInsightsName: monitoring.outputs.name
    appServicePlanId: plan.outputs.resourceId
    runtimeName: 'node'
    runtimeVersion: '22'
    storageAccountName: storage.outputs.name
    deploymentStorageContainerName: deploymentStorageContainerName
    identityId: identity.outputs.resourceId
    identityClientId: identity.outputs.clientId
    appSettings: {
      SPEECH_KEY: speech.listKeys().key1
      SPEECH_REGION: location
      TOKEN_RATE_LIMIT_PER_MINUTE: '6'
    }
    maximumInstanceCount: 40
  }
  dependsOn: [
    storageBlobDataOwner
    appInsightsMetricsPublisher
  ]
}

output functionAppName string = api.outputs.SERVICE_API_NAME
