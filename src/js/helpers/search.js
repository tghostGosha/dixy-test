
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
      url.searchParams.delete('page');
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

export const resetSearch = (button) => {
  button.addEventListener('click', (e) => {
    url.searchParams.set('q', '');
    window.history.pushState({}, '', url);
    // button.href = window.location.href
  })

}

export const searchDate = (value) => {
  url.searchParams.set('date', value);
  window.history.pushState({}, '', url);
}

export const sortType = (button) => {
  url.searchParams.set('sort_id', button.value);
  if (button.value === 'UF_UPDATED_AT') {
    url.searchParams.set('sort_type', 'DESC');
  }
  if (button.value === 'UF_AREA') {
    url.searchParams.set('sort_type', 'ASC');
  }
  if (button.value === 'UF_NAME') {
    url.searchParams.set('sort_type', 'ASC');
  }
  window.history.pushState({}, '', url);
  window.location.assign(
    `${window.location.href}`
  )
}

export const sortTypeHistory = (button) => {
  url.searchParams.set('sort_id', 'UF_UPDATED_AT');
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

