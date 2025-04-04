import {searchInput} from "../helpers/search";

if (window.location.pathname.includes('history')) {
  //======Поиск====///
  const search = document.querySelector('#search')
  const searchButton = document.querySelector('#search-button');
  searchInput(search, searchButton)
}