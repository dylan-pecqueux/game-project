import "./styles.scss";
import routes from './route';


let pageArgument;
const pageContent = document.getElementById("pageContent");

const search = (event) => {
  event.preventDefault();
  const mySearch = document.searchForm.searchBar.value;
  const formatSearch = mySearch.toLowerCase().split(" ").join("+");
  window.location.hash = "#pagelist/" + formatSearch;
}

const moreInfo = (element) => {
  window.location.hash = "#pagelist/" + element;
}

const setRoute = () => {
  let path = window.location.hash.substring(1).split("/");
  pageArgument = path[1] || "";
  
  routes[path[0]](pageArgument);
  return true;
};


document.querySelector(".searchZone .btn").addEventListener("click", (event) => search(event));
window.addEventListener("hashchange", () => setRoute());
window.addEventListener("DOMContentLoaded", () => setRoute());

export default moreInfo;