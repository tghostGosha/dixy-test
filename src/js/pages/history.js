import {searchInput, searchPage, sortTypeHistory} from "../helpers/search";

if (window.location.pathname.includes('history')) {
  //======Поиск====///
  const search = document.querySelector('#search')
  const searchButton = document.querySelector('#search-button');
  const pageValue = document.querySelector('#pageNumber');

  searchInput(search, searchButton,  )
  searchPage(pageValue)

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