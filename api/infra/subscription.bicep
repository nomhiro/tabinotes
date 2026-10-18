targetScope = 'subscription'

param location string = 'northeurope'
param resourceGroupName string = 'rg-trip-translator'

resource rg 'Microsoft.Resources/resourceGroups@2024-03-01' = {
  name: resourceGroupName
  location: location
  tags: {
    feature: 'trip-speech-translation'
  }
}

module translation './main.bicep' = {
  name: 'tripSpeechResources'
  scope: rg
  params: {
    location: location
  }
}

output functionAppName string = translation.outputs.functionAppName
