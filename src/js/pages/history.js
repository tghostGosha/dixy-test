import {resetSearch, searchInput, searchPage, sortTypeHistory} from "../helpers/search";

if (window.location.pathname.includes('history')) {
  //======Поиск====///
  const search = document.querySelector('#search')
  const searchButton = document.querySelector('#search-button');
  const pageValue = document.querySelector('#pageNumber');

  searchInput(search, searchButton,  )
  searchPage(pageValue)

  //======Cброс query параметров поиска====///
  try {
    const resetButton = document.querySelector('[data-reset="search"]');
    resetSearch(resetButton)
  } catch (e) {}

  //======Сортировка======///
  try {
    document.addEventListener('click', function (e) {
      if (e.target.matches('[data-sort="sort"]')) {
        e.preventDefault()
        const sortDate = e.target
        sortTypeHistory(sortDate)
      }
    })
  } catch(e){

  }

}