const proxyConfigMappings = {
  // dev: {
  //   prefix: '/api',
  //   target: 'http://49.235.91.60:8080'
  // },
  dev: {
    prefix: '/api',
    target: 'https://test.feibao100.com/api'
  },
  test: {
    prefix: '/api',
    target: 'http://localhost:8080'
  },
  prod: {
    prefix: '/api',
    target: 'https://feibao100.com'
  }
}

export function getProxyConfig(envType = 'dev') {
  return proxyConfigMappings[envType]
}
