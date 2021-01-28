/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/styles.scss":
/*!*************************!*\
  !*** ./src/styles.scss ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://rawg/./src/styles.scss?");

/***/ }),

/***/ "./src/PageDetail.js":
/*!***************************!*\
  !*** ./src/PageDetail.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ \"./src/index.js\");\n\n\nconst PageDetail = (argument) => {\n  const preparePage = () => {\n    const cleanedArgument = argument.replace(/\\s+/g, \"-\");\n\n\n    const fetchGame = (url, argument) => {\n      let finalURL = url + argument;\n\n      fetch(`${finalURL}`)\n        .then((response) => response.json())\n        .then((response) => {\n          console.log(response)\n          show(response)\n        });\n    };\n\n    fetchGame(\"https://api.rawg.io/api/games/\", cleanedArgument);\n  };\n\n  const render = () => {\n    document.querySelector(\".platform\").innerHTML = \"\";\n    document.querySelector(\".welcome\").innerHTML = \"\";\n    document.querySelector(\".showMore\").innerHTML = \"\";\n    pageContent.innerHTML = `\n      <section class=\"page-detail\">\n        <div class=\"article\">\n          <h1 class=\"title\">Loading...</h1>   \n        </div>\n      </section>\n    `;\n\n    preparePage();\n  };\n\n  render();\n};\n\nconst show = (game) => {\n  fetch(`https://api.rawg.io/api/games/${game.slug}/screenshots?page_size=4`)\n        .then((response) => response.json())\n        .then((response) => {\n          \n          response.results.forEach(screen => {\n            document.querySelector(\".img-screen\").innerHTML += `<img src=\"${screen.image}\">`\n          });\n          \n        });\n  fetch(`https://api.rawg.io/api/games/${game.id}/youtube?page_size=4`)\n        .then((response) => response.json())\n        .then((response) => {\n          response.results.forEach((url, index) => {\n            if(index == 0) {\n              document.querySelector(\".youtube .first\").innerHTML = `\n                \n                  <a href=\"https://www.youtube.com/watch?v=${url.external_id}\">\n                    <img src=\"${url.thumbnails.high.url}\">\n                  </a>\n                  <div>\n                    <h3>${url.name}</h3>\n                    <h4>${url.channel_title} - ${url.created}</h4>\n                  </div>\n                \n              `\n            } else {\n              document.querySelector(\".youtube .other\").innerHTML += `\n              <div>\n              <a href=\"https://www.youtube.com/watch?v=${url.external_id}\">\n              <img src=\"${url.thumbnails.high.url}\">\n              </a>\n                    <h3>${url.name}</h3>\n                    <h4>${url.channel_title} - ${url.created}</h4>\n                    </div>\n              `\n            }\n           \n          });\n          \n          console.log(response);\n          \n        });\n\n        fetch(`https://api.rawg.io/api/games/${game.id}/suggested?page_size=6`)\n        .then((response) => response.json())\n        .then((response) => {\n          response.results.forEach((article) => {\n            let plat = \"\";\n            let genres = \"\";\n            article.parent_platforms.forEach(platform => {\n              plat += `<p class=\"${platform.platform.name}\"></p>`\n            });\n            article.genres.forEach(genre => {\n              genres += `${genre.name} `\n            })\n            document.querySelector(\".similar .similar-game\").innerHTML += `\n                  <a href = \"#pagedetail/${article.id}\">\n                    <div class=\"cardGame\">\n                      <img class=\"card-img\" src=\"${article.background_image}\">\n                      <div class=\"show-hover\">\n                        <p>Released : ${article.released}</p>\n                        <p>Rating : ${article.rating}/5 - ${article.ratings_count} votes</p>\n                        <p>Genres : ${genres}</p>\n                      </div>\n                      <h1>${article.name}</h1>\n                      <div class=\"platform\">${plat}</div>\n                    </div>\n                  </a>\n            `;\n          })\n          \n        });\n\n  let platforms = \"\";\n  let genres = \"\";\n  let tags = \"\";\n  let buy = \"\";\n  game.platforms.forEach(platform => {\n    platforms += `<button class=\"searchInfo\" value=\"&platforms=${platform.platform.id}&dates=2020-12-01,2021-01-30&ordering=-added\">${platform.platform.name}</button> `\n  });\n  game.genres.forEach(genre => {\n    genres += `<button class=\"searchInfo\" value=\"&genres=${genre.slug}\">${genre.name}</button>`\n  });\n  game.tags.forEach(tag => {\n    tags += `<button class=\"searchInfo\" value=\"&tags=${tag.slug}\">${tag.name}</button>`\n  });\n  game.stores.forEach(store => {\n    buy += `<a href=\"${store.url}\">${store.store.name}</a>`\n  });\n  document.querySelector(\".page-detail\").innerHTML = `\n          <div class=\"game-img\" style=\"background-image:url(${game.background_image});\">\n            <a href=\"${game.website}\">Check Website <img src=\"src/images/fleche.png\"></a>\n          </div>\n          <div class=\"presentation\">\n            <h1>${game.name},</h1>\n            <h3>${game.rating}/5 - ${game.ratings_count} votes</h3>\n          </div>\n          <div class=\"description\">\n            ${game.description}\n          </div>\n          <div class=\"info\">\n            <div>\n              <h3>Released</h3>\n              <p>${game.released}</p>\n            </div>\n            <div>\n              <h3>Developer</h3>\n              <button class=\"searchInfo\" value=\"&developers=${game.developers[0].slug}\">${game.developers[0].name}</button>\n            </div>\n            <div>\n              <h3>Platforms</h3>\n              <p>${platforms}</p>\n            </div>\n            <div>\n              <h3>Publisher</h3>\n              <button class=\"searchInfo\" value=\"&publishers=${game.publishers[0].slug}\">${game.publishers[0].name}</button>\n            </div>\n            <div>\n              <h3>Genre</h3>\n              ${genres}\n            </div>\n            <div>\n              <h3>Tags</h3>\n              ${tags}\n            </div>\n          </div>\n\n          <div class=\"buy\">\n            <h2>Buy</h2>\n            ${buy}\n          </div>\n          <div class=\"trailer\">\n            <h2>Trailer</h2>\n            <video src=\"${game.clip.clip}\" width=100% controls poster=\"${game.clip.preview}\">\n              Cette vidéo ne peut être affichée sur votre navigateur Internet.\n            </video>\n          </div>\n          <div class=\"screenshots\">\n            <h2>SCREENSHOTS</h2>\n            <div class=\"img-screen\"></div>\n          </div>\n          <div class=\"youtube\">\n            <h2>YOUTUBE</h2>\n            <div class=\"first\"></div>\n            <div class=\"other\"></div>\n          </div>\n          <div class=\"similar\">\n            <h2>SIMILAR GAME</h2>\n            <div class=\"similar-game\"></div>\n          </div>\n          <footer>\n            <div class=\"underline\"></div>\n            <p>Dylan @ 2020 - Fictionnal website for exercice</p>\n          </footer>\n\n  `\n\n  document.querySelectorAll(\".searchInfo\").forEach(element => {\n    element.addEventListener(\"click\", () => (0,_index__WEBPACK_IMPORTED_MODULE_0__.default)(element.value));\n  });\n}\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PageDetail);\n\n//# sourceURL=webpack://rawg/./src/PageDetail.js?");

/***/ }),

/***/ "./src/PageList.js":
/*!*************************!*\
  !*** ./src/PageList.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\nlet next;\nlet numberOfClick= 0;\n\nconst PageList = (argument = \"\") => {\n  const preparePage = () => {\n    \n    const cleanedArgument = argument.replace(/\\s+/g, \"-\");\n\n    const fetchList = (url, argument) => {\n      let finalURL = url;\n      if (argument) {\n        finalURL = url + \"search=\" + argument;\n      } else {\n        finalURL = url + \"dates=2021-01-01,2022-01-01&ordering=-added\";\n      }\n      console.log(finalURL)\n      fetch(`${finalURL}`)\n        .then((response) => response.json())\n        .then((response) => {\n          next = response.next;\n          numberOfClick = 0;\n          document.querySelector(\".page-list .articles\").innerHTML = \"\";\n          show(response);\n          \n          document.querySelector(\".showMore\").innerHTML = `\n            <button class=\"btnShowMore\">Show more</button>\n          `;\n          document.querySelector(\".btnShowMore\").addEventListener(\"click\", () => nextPage())\n          document.querySelector(\".platform\").innerHTML = `\n            <select name=\"platforms\" id=\"platforms-select\">\n              <option value=\"1,2,3,4,5,6,7,8\">Platform : any</option>\n              <option value=\"1\">PC</option>\n              <option value=\"2\">Playstation</option>\n              <option value=\"3\">Xbox</option>\n              <option value=\"4\">Ios</option>\n              <option value=\"5\">Mac</option>\n              <option value=\"6\">Linux</option>\n              <option value=\"7\">Nintendo</option>\n              <option value=\"8\">Android</option>\n            </select>\n          `\n          document.querySelector(\"#platforms-select\").addEventListener('change', (event) => selectPlatforms(event));\n\n          document.querySelector(\".welcome\").innerHTML = \n\n          `\n          <h2>Welcome,</h2>\n          <p>The Hyper Progame is the world’s premier event for computer and video games and related products. At The Hyper Progame,\n          the video game industry’s top talent pack the Los Angeles Convention Center, connecting tens of thousands of the best,\n          brightest, and most innovative in the interactive entertainment industry. For three exciting days, leading-edge companies,\n          groundbreaking new technologies, and never-before-seen products will be showcased. The Hyper Progame connects you\n          with both new and existing partners, industry executives, gamers, and social influencers providing unprecedented exposure</p>\n          `\n        });\n    };\n\n    fetchList(\"https://api.rawg.io/api/games?page=1&page_size=9&\", cleanedArgument);\n  };\n\n  const render = () => {\n    pageContent.innerHTML = `\n      <section class=\"page-list\">\n        <div class=\"articles\">...loading</div>\n      </section>\n    `;\n\n    preparePage();\n  };\n\n  render();\n};\n\nconst nextPage = () => {\n  fetch(`${next}`)\n        .then((response) => response.json())\n        .then((response) => {\n          next = response.next;\n          numberOfClick ++;\n          if(numberOfClick == 2) document.querySelector(\".showMore\").innerHTML = \"\";\n          show(response);\n\n        });\n}\n\nconst selectPlatforms = (event) => {\n  let path = window.location.hash.substring(1).split(\"/\");\n  let pageArgument = path[1] || \"\";\n  const cleanedArgument = pageArgument.replace(/\\s+/g, \"-\");\n  let select = document.querySelector(\"#platforms-select\").value;\n  let url = `https://api.rawg.io/api/games?page=1&page_size=9&`\n  let finalURL = url;\n  if(cleanedArgument) {\n    finalURL = url + `parent_platforms=${select}&search=` + cleanedArgument;\n  } else {\n    finalURL = url + `parent_platforms=${select}&dates=2021-01-01,2022-01-01&ordering=-added`;\n  }\n  fetch(`${finalURL}`)\n      .then((response) => response.json())\n      .then((response) => {\n        document.querySelector(\".page-list .articles\").innerHTML = \"\";\n        next = response.next;\n        numberOfClick = 0;\n        show(response);\n      });\n\n}\n\nconst show = (response) => {\n  response.results.forEach((article) => {\n    let plat = \"\";\n    let genres = \"\";\n    article.parent_platforms.forEach(platform => {\n      plat += `<p class=\"${platform.platform.name}\"></p>`\n    });\n    article.genres.forEach(genre => {\n      genres += `${genre.name} `\n    })\n    document.querySelector(\".page-list .articles\").innerHTML += `\n          <a href = \"#pagedetail/${article.id}\">\n            <div class=\"cardGame\">\n              <img class=\"card-img\" src=\"${article.background_image}\">\n              <div class=\"show-hover\">\n                <h3>${article.released}</h3>\n                <h3>${article.rating}/5 - ${article.ratings_count} votes</h3>\n                <h3>${genres}</h3>\n              </div>\n              <h1>${article.name}</h1>\n              <div class=\"platform\">${plat}</div>\n            </div>\n          </a>\n  `;\n  })\n  let observer = new IntersectionObserver(function (entries) {\n    entries.forEach(element => {\n      if(element.intersectionRatio > 0.1){\n        element.target.classList.remove('not-visible');\n      } else {\n        element.target.classList.add('not-visible')\n      }\n    })\n  }, {\n    threshold: [0.1]\n  })\n  let items = document.querySelectorAll('.cardGame')\n  items.forEach(item => {\n    item.classList.add('not-visible')\n    observer.observe(item)\n  })\n\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PageList);\n\n//# sourceURL=webpack://rawg/./src/PageList.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles.scss */ \"./src/styles.scss\");\n/* harmony import */ var _route__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./route */ \"./src/route.js\");\n\n\n\n\nlet pageArgument;\nconst pageContent = document.getElementById(\"pageContent\");\n\nconst search = (event) => {\n  event.preventDefault();\n  const mySearch = document.searchForm.searchBar.value;\n  const formatSearch = mySearch.toLowerCase().split(\" \").join(\"+\");\n  window.location.hash = \"#pagelist/\" + formatSearch;\n}\n\nconst moreInfo = (element) => {\n  window.location.hash = \"#pagelist/\" + element;\n}\n\nconst setRoute = () => {\n  let path = window.location.hash.substring(1).split(\"/\");\n  pageArgument = path[1] || \"\";\n  \n  _route__WEBPACK_IMPORTED_MODULE_1__.default[path[0]](pageArgument);\n  return true;\n};\n\n\ndocument.querySelector(\".searchZone .btn\").addEventListener(\"click\", (event) => search(event));\nwindow.addEventListener(\"hashchange\", () => setRoute());\nwindow.addEventListener(\"DOMContentLoaded\", () => setRoute());\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (moreInfo);\n\n//# sourceURL=webpack://rawg/./src/index.js?");

/***/ }),

/***/ "./src/route.js":
/*!**********************!*\
  !*** ./src/route.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"routes\": () => /* binding */ routes,\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _PageList__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PageList */ \"./src/PageList.js\");\n/* harmony import */ var _PageDetail__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PageDetail */ \"./src/PageDetail.js\");\n\n\n\nconst routes = {\n  \"\": _PageList__WEBPACK_IMPORTED_MODULE_0__.default,\n  \"pagelist\": _PageList__WEBPACK_IMPORTED_MODULE_0__.default,\n  \"pagedetail\": _PageDetail__WEBPACK_IMPORTED_MODULE_1__.default,\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (routes);\n\n//# sourceURL=webpack://rawg/./src/route.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	__webpack_require__("./src/index.js");
/******/ })()
;