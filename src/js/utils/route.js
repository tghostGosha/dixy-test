const routes = {
  404: "/404.html",
  "/main": "/login.html",
  "/": "/main.html",
  "/warehouse": "/warehouse.html",
  "/sector": "/sector.html",
  "/history": "/history.html",
};

export const handleLocation = async () => {
  const path = window.location.pathname;
  const route = routes[path] || routes[404];
  console.log(path)
  const html = await fetch(route).then((data) => data.text());
  document.getElementById("main-page").innerHTML = html;

};


export const route = (event) => {
  event = event || window.event;
  event.preventDefault();
  window.history.pushState({}, "", event.target.href);
  handleLocation();
};


window.onpopstate = handleLocation;
window.route = route;

