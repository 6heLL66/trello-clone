export default async function makeRequest(
  url,
  method,
  body,
  onsuccess,
  onerror
) {
  let data = null
  if (body) data = JSON.stringify(body)
  const response = await fetch(url, {
    method,
    body: data,
    headers: {
      'Content-Type': 'application/json'
    }
  })
  if (response.ok) {
    onsuccess(await response.json())
    return true
  } else {
    onerror(await response.json())
    return false
  }
}
