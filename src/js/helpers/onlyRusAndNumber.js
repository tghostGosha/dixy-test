export const onlyRusAndNumber = (item) => {
  let res = /[^аА-яЯёЁ0-9 .-]/g.exec(item.value);
  item.value = item.value.replace(res, '');
}