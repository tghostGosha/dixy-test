
const historyState = () => {
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
}


const url = new URL(window.location);

export const searchInput = (input, button) => {
  if (input) {
    input.addEventListener('input', (event) => {
      url.searchParams.set('q', event.target.value);
      window.history.pushState({}, '', url);
      button.href = window.location.href
    });
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        window.location.assign(
          `${window.location.href}`
        )
      }

    })
  }

}
export const searchDate = (value) => {
  url.searchParams.set('date', value);
  window.history.pushState({}, '', url);
}

export const sortType = (button) => {
  url.searchParams.set('sort_id', button.value);
  url.searchParams.set('sort_type', 'DESC');
  window.history.pushState({}, '', url);
  window.location.assign(
    `${window.location.href}`
  )
}

export const sortTypeHistory = (button) => {
  url.searchParams.set('sort_id', 'UF_DATE_UPDATED');
  url.searchParams.set('sort_type', button.value);
  window.history.pushState({}, '', url);
  window.location.assign(
    `${window.location.href}`
  )
}

export const searchPage = (input) => {
  if (input) {
    input.addEventListener('keyup', (event) => {
      url.searchParams.set('page', `page-${event.target.value}`);
      window.history.pushState({}, '', url);

    });
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        window.location.assign(
          `${window.location.href}`
        )
      }

    })
  }
}

