const proxyConfigMappings = {
  dev: {
    prefix: '/api',
    target: 'http://49.235.91.60:8080/',
  },
  test: {
    prefix: '/api',
    target: 'http://localhost:8080',
  },
  prod: {
    prefix: '/api',
    target: 'http://localhost:8080',
  },
}

export function getProxyConfig(envType = 'dev') {
  return proxyConfigMappings[envType]
}
