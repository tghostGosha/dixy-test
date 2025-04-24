import {onlyRusAndNumber} from "./onlyRusAndNumber";

const url = new URL(window.location);

export const searchInput = (input, button) => {
  if (input) {
    input.addEventListener('input', (event) => {
      url.searchParams.set('q', event.target.value);
      url.searchParams.delete('page');
      window.history.pushState({}, '', url);
      button.href = window.location.href
      onlyRusAndNumber(input)
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
    url.searchParams.delete('q');
    window.history.pushState({}, '', url);
    if(url.searchParams.get('date')) {
      url.searchParams.delete('date')
      window.history.pushState({}, '', url);
    }
  })

}

export const searchDate = (value) => {
  const searchButton = document.querySelector('#search-button');
  url.searchParams.set('date', value);
  window.history.pushState({}, '', url);
  searchButton.href = window.location.href;
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
  url.searchParams.set('sort_id', 'UF_DATE');
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

