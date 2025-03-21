export function serializeForm(formNode, request, id = undefined) {
  let data = new FormData(formNode)
  if (data.has('warehouseNumberArray')) {
    const arrayValue = data.get('warehouseNumberArray').match(/\b\w+?\b/g);
    data.set('warehouseNumberArray', JSON.stringify(arrayValue));
  }
  request(data, data.get('id'))
  return data
}