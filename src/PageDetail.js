import moreInfo from './index'

const PageDetail = (argument) => {
  const preparePage = () => {
    const cleanedArgument = argument.replace(/\s+/g, "-");


    const fetchGame = (url, argument) => {
      let finalURL = url + argument;

      fetch(`${finalURL}`)
        .then((response) => response.json())
        .then((response) => {
          console.log(response)
          show(response)
        });
    };

    fetchGame("https://api.rawg.io/api/games/", cleanedArgument);
  };

  const render = () => {
    document.querySelector(".platform").innerHTML = "";
    document.querySelector(".welcome").innerHTML = "";
    document.querySelector(".showMore").innerHTML = "";
    pageContent.innerHTML = `
      <section class="page-detail">
        <div class="article">
          <h1 class="title">Loading...</h1>   
        </div>
      </section>
    `;

    preparePage();
  };

  render();
};

const show = (game) => {
  fetch(`https://api.rawg.io/api/games/${game.slug}/screenshots?page_size=4`)
        .then((response) => response.json())
        .then((response) => {
          
          response.results.forEach(screen => {
            document.querySelector(".img-screen").innerHTML += `<img src="${screen.image}">`
          });
          
        });
  fetch(`https://api.rawg.io/api/games/${game.id}/youtube?page_size=4`)
        .then((response) => response.json())
        .then((response) => {
          response.results.forEach((url, index) => {
            if(index == 0) {
              document.querySelector(".youtube .first").innerHTML = `
                
                  <a href="https://www.youtube.com/watch?v=${url.external_id}">
                    <img src="${url.thumbnails.high.url}">
                  </a>
                  <div>
                    <h3>${url.name}</h3>
                    <h4>${url.channel_title} - ${url.created}</h4>
                  </div>
                
              `
            } else {
              document.querySelector(".youtube .other").innerHTML += `
              <div>
              <a href="https://www.youtube.com/watch?v=${url.external_id}">
              <img src="${url.thumbnails.high.url}">
              </a>
                    <h3>${url.name}</h3>
                    <h4>${url.channel_title} - ${url.created}</h4>
                    </div>
              `
            }
           
          });
          
          console.log(response);
          
        });

        fetch(`https://api.rawg.io/api/games/${game.id}/suggested?page_size=6`)
        .then((response) => response.json())
        .then((response) => {
          response.results.forEach((article) => {
            let plat = "";
            let genres = "";
            article.parent_platforms.forEach(platform => {
              plat += `<p class="${platform.platform.name}"></p>`
            });
            article.genres.forEach(genre => {
              genres += `${genre.name} `
            })
            document.querySelector(".similar .similar-game").innerHTML += `
                  <a href = "#pagedetail/${article.id}">
                    <div class="cardGame">
                      <img class="card-img" src="${article.background_image}">
                      <div class="show-hover">
                        <p>Released : ${article.released}</p>
                        <p>Rating : ${article.rating}/5 - ${article.ratings_count} votes</p>
                        <p>Genres : ${genres}</p>
                      </div>
                      <h1>${article.name}</h1>
                      <div class="platform">${plat}</div>
                    </div>
                  </a>
            `;
          })
          
        });

  let platforms = "";
  let genres = "";
  let tags = "";
  let buy = "";
  game.platforms.forEach(platform => {
    platforms += `<button class="searchInfo" value="&platforms=${platform.platform.id}&dates=2020-12-01,2021-01-30&ordering=-added">${platform.platform.name}</button> `
  });
  game.genres.forEach(genre => {
    genres += `<button class="searchInfo" value="&genres=${genre.slug}">${genre.name}</button>`
  });
  game.tags.forEach(tag => {
    tags += `<button class="searchInfo" value="&tags=${tag.slug}">${tag.name}</button>`
  });
  game.stores.forEach(store => {
    buy += `<a href="${store.url}">${store.store.name}</a>`
  });
  document.querySelector(".page-detail").innerHTML = `
          <div class="game-img" style="background-image:url(${game.background_image});">
            <a href="${game.website}">Check Website <img src="src/images/fleche.png"></a>
          </div>
          <div class="presentation">
            <h1>${game.name},</h1>
            <h3>${game.rating}/5 - ${game.ratings_count} votes</h3>
          </div>
          <div class="description">
            ${game.description}
          </div>
          <div class="info">
            <div>
              <h3>Released</h3>
              <p>${game.released}</p>
            </div>
            <div>
              <h3>Developer</h3>
              <button class="searchInfo" value="&developers=${game.developers[0].slug}">${game.developers[0].name}</button>
            </div>
            <div>
              <h3>Platforms</h3>
              <p>${platforms}</p>
            </div>
            <div>
              <h3>Publisher</h3>
              <button class="searchInfo" value="&publishers=${game.publishers[0].slug}">${game.publishers[0].name}</button>
            </div>
            <div>
              <h3>Genre</h3>
              ${genres}
            </div>
            <div>
              <h3>Tags</h3>
              ${tags}
            </div>
          </div>

          <div class="buy">
            <h2>Buy</h2>
            ${buy}
          </div>
          <div class="trailer">
            <h2>Trailer</h2>
            <video src="${game.clip.clip}" width=100% controls poster="${game.clip.preview}">
              Cette vidéo ne peut être affichée sur votre navigateur Internet.
            </video>
          </div>
          <div class="screenshots">
            <h2>SCREENSHOTS</h2>
            <div class="img-screen"></div>
          </div>
          <div class="youtube">
            <h2>YOUTUBE</h2>
            <div class="first"></div>
            <div class="other"></div>
          </div>
          <div class="similar">
            <h2>SIMILAR GAME</h2>
            <div class="similar-game"></div>
          </div>
          <footer>
            <div class="underline"></div>
            <p>Dylan @ 2020 - Fictionnal website for exercice</p>
          </footer>

  `

  document.querySelectorAll(".searchInfo").forEach(element => {
    element.addEventListener("click", () => moreInfo(element.value));
  });
}


export default PageDetail;