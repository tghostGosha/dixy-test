export function serializeForm(formNode, request, id=undefined) {
  let data = new FormData(formNode)
  // if(!id) {
  //   request(data)
  // }
  request(data, data.get('id'))
  return data
}