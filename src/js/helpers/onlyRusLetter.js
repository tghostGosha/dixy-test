export const onlyRusLetter= (item) => {
  item.addEventListener('input', ()=> {
    let res = /[^аА-яЯёЁ .-]/g.exec(item.value);
    item.value = item.value.replace(res, '');
  } )
}