let next;
let numberOfClick= 0;

const PageList = (argument = "") => {
  const preparePage = () => {
    
    const cleanedArgument = argument.replace(/\s+/g, "-");

    const fetchList = (url, argument) => {
      let finalURL = url;
      if (argument) {
        finalURL = url + "search=" + argument;
      } else {
        finalURL = url + "dates=2021-01-01,2022-01-01&ordering=-added";
      }
      console.log(finalURL)
      fetch(`${finalURL}`)
        .then((response) => response.json())
        .then((response) => {
          next = response.next;
          numberOfClick = 0;
          document.querySelector(".page-list .articles").innerHTML = "";
          show(response);
          
          document.querySelector(".showMore").innerHTML = `
            <button class="btnShowMore">Show more</button>
          `;
          document.querySelector(".btnShowMore").addEventListener("click", () => nextPage())
          document.querySelector(".platform").innerHTML = `
            <select name="platforms" id="platforms-select">
              <option value="1,2,3,4,5,6,7,8">Platform : any</option>
              <option value="1">PC</option>
              <option value="2">Playstation</option>
              <option value="3">Xbox</option>
              <option value="4">Ios</option>
              <option value="5">Mac</option>
              <option value="6">Linux</option>
              <option value="7">Nintendo</option>
              <option value="8">Android</option>
            </select>
          `
          document.querySelector("#platforms-select").addEventListener('change', (event) => selectPlatforms(event));

          document.querySelector(".welcome").innerHTML = 

          `
          <h2>Welcome,</h2>
          <p>The Hyper Progame is the world’s premier event for computer and video games and related products. At The Hyper Progame,
          the video game industry’s top talent pack the Los Angeles Convention Center, connecting tens of thousands of the best,
          brightest, and most innovative in the interactive entertainment industry. For three exciting days, leading-edge companies,
          groundbreaking new technologies, and never-before-seen products will be showcased. The Hyper Progame connects you
          with both new and existing partners, industry executives, gamers, and social influencers providing unprecedented exposure</p>
          `
        });
    };

    fetchList("https://api.rawg.io/api/games?page=1&page_size=9&", cleanedArgument);
  };

  const render = () => {
    pageContent.innerHTML = `
      <section class="page-list">
        <div class="articles">...loading</div>
      </section>
    `;

    preparePage();
  };

  render();
};

const nextPage = () => {
  fetch(`${next}`)
        .then((response) => response.json())
        .then((response) => {
          next = response.next;
          numberOfClick ++;
          if(numberOfClick == 2) document.querySelector(".showMore").innerHTML = "";
          show(response);

        });
}

const selectPlatforms = (event) => {
  let path = window.location.hash.substring(1).split("/");
  let pageArgument = path[1] || "";
  const cleanedArgument = pageArgument.replace(/\s+/g, "-");
  let select = document.querySelector("#platforms-select").value;
  let url = `https://api.rawg.io/api/games?page=1&page_size=9&`
  let finalURL = url;
  if(cleanedArgument) {
    finalURL = url + `parent_platforms=${select}&search=` + cleanedArgument;
  } else {
    finalURL = url + `parent_platforms=${select}&dates=2021-01-01,2022-01-01&ordering=-added`;
  }
  fetch(`${finalURL}`)
      .then((response) => response.json())
      .then((response) => {
        document.querySelector(".page-list .articles").innerHTML = "";
        next = response.next;
        numberOfClick = 0;
        show(response);
      });

}

const show = (response) => {
  response.results.forEach((article) => {
    let plat = "";
    let genres = "";
    article.parent_platforms.forEach(platform => {
      plat += `<p class="${platform.platform.name}"></p>`
    });
    article.genres.forEach(genre => {
      genres += `${genre.name} `
    })
    document.querySelector(".page-list .articles").innerHTML += `
          <a href = "#pagedetail/${article.id}">
            <div class="cardGame">
              <img class="card-img" src="${article.background_image}">
              <div class="show-hover">
                <h3>${article.released}</h3>
                <h3>${article.rating}/5 - ${article.ratings_count} votes</h3>
                <h3>${genres}</h3>
              </div>
              <h1>${article.name}</h1>
              <div class="platform">${plat}</div>
            </div>
          </a>
  `;
  })
  let observer = new IntersectionObserver(function (entries) {
    entries.forEach(element => {
      if(element.intersectionRatio > 0.1){
        element.target.classList.remove('not-visible');
      } else {
        element.target.classList.add('not-visible')
      }
    })
  }, {
    threshold: [0.1]
  })
  let items = document.querySelectorAll('.cardGame')
  items.forEach(item => {
    item.classList.add('not-visible')
    observer.observe(item)
  })

}

export default PageList;