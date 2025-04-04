export function serializeForm(formNode, request, id = undefined) {
  let data = new FormData(formNode)

  if (data.has('store')) {
    const arrayValue = data.get('store').match(/\b\w+?\b/g);

    for (let i = 0; i < arrayValue.length; i++) {
      data.append('store[]', arrayValue[i])
    }
    console.log(...data)
    console.log(Object.fromEntries(data))

    request(data, data.get('id'))
    return data
  }
  request(data, data.get('id'))
  return data
}