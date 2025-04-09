export function serializeForm(formNode, request, id = undefined) {
  let data = new FormData(formNode)
  if (data.has('active')) {
    data.set('active', '1')
  }
  if (!data.has('active')) {
    data.set('active', '0')
  }
  if (data.has('delivery')) {
    data.set('delivery', 'true')
  }else {
    data.set('delivery', 'false')
  }
  if (data.has('pickup')) {
    data.set('pickup', 'true')
  }else {
    data.set('pickup', 'false')
  }

  if (data.has('store')) {
    const arrayValue = data.get('store').match(/\b\w+?\b/g);

    for (let i = 0; i < arrayValue.length; i++) {
      data.append('store[]', arrayValue[i])
    }

    request(data, data.get('id'))
    return data
  }
  request(data, data.get('id'))
  return data
}