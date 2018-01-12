export function getApiAFormatter (data) {
  if (data && data.retcode === 0 && data.data) {
    return data.data
  }

  return null
}