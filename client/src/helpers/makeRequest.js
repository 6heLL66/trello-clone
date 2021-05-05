export default async function makeRequest(
  url,
  method,
  body,
  onsuccess,
  onerror
) {
  let request = {
    method,
    headers: {
      'Content-Type': 'application/json'
    }
  }
  if (body) {
    request.body = JSON.stringify(body)
  }
  const response = await fetch(url, request)
  if (response.ok) {
    onsuccess(await response.json())
    return true
  } else {
    onerror(await response.json())
    return false
  }
}
