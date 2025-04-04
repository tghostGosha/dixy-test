let params = {
  q: '',
  sort_id: 'UF_XML_ID',
  sort_type: 'ASC',
  date: ''
}
export const paramsString = new URLSearchParams(params);

export const searchInput = (input, button) => {
  if (input) {
    input.addEventListener('keyup', (event) => {
      paramsString.set("q", event.target.value);
      if (window.history.replaceState) {
        const url = window.location.protocol
          + "//" + window.location.host
          + window.location.pathname
          + "?"
          + paramsString.toString();

        window.history.replaceState({
          path: url
        }, "", url)
      }
      button.href = window.location.href
    });
  }

}

