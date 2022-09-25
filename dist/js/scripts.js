let pokemonRepository=function(){let e=[],t=document.querySelector("#pokemon-list");function n(t){"object"==typeof t&&"name"in t&&"detailsUrl"in t?e.push(t):console.log('Please input valid data type. The data need to be an object and contains the "name" key.')}function o(){return e}function i(e){let n=document.createElement("div");n.classList.add("pokemon-button-wrapper"),n.classList.add("col"),n.classList.add("col-lg-3"),n.classList.add("col-md-4"),n.classList.add("col-sm-6");let o=document.createElement("button");o.innerText=c(e.name),o.classList.add("pokemon-button"),o.classList.add("btn"),o.classList.add("btn-secondary"),o.setAttribute("data-toggle","modal"),o.setAttribute("data-target","#pokemon-modal"),t.appendChild(n),n.appendChild(o),o.addEventListener("click",()=>{d(e)})}function a(e){return fetch(e.detailsUrl).then(function(e){return e.json()}).then(function(t){e.imageUrl=t.sprites.front_default,e.height=t.height,e.weight=t.weight,e.types=t.types}).catch(e=>console.error(e))}let r=document.querySelector(".modal-title"),l=document.querySelector(".modal-body");function d(e){a(e).then(function(){var t;r.innerText=c(e.name),l.innerText="";let n=document.createElement("img");n.classList.add("pokemon-img"),n.alt="A front image of the choosen pokemon",n.src=e.imageUrl||"img/pokemon.png";let o=document.createElement("p");o.innerText=`Height: ${e.height||"?"}`;let i=document.createElement("p");i.innerText=`Weight: ${e.weight||"?"}`;let a=document.createElement("p");a.innerText="Type: "+(t=e,t.types.map(e=>c(e.type.name)).join(", ")||"?"),l.appendChild(n),l.appendChild(o),l.appendChild(i),l.appendChild(a)})}function s(){r.innerText="Pok\xe9mon name",l.innerHTML="Loading..."}function c(e){return e.charAt(0).toUpperCase()+e.slice(1)}function p(t){return e.filter(e=>-1!==e.name.toUpperCase().indexOf(t.toUpperCase()))}let m=document.getElementById("search-pokemon");function u(){let e=p(m.value);t.innerHTML="",e.forEach(i)}return{add:n,getAll:o,addListItem:i,loadList:function e(){return fetch("https://pokeapi.co/api/v2/pokemon/?limit=1154").then(function(e){return e.json()}).then(function(e){document.getElementById("pokemon-list").innerHTML="",e.results.forEach(function(e){n({name:e.name,detailsUrl:e.url})})}).catch(function(e){console.error(e)})},loadDetails:a,showDetails:d,resetModalContent:s,resetModalByClose:function e(){document.getElementById("modal-close-button").addEventListener("click",s),window.addEventListener("keydown",e=>{"Escape"===e.key&&s()});let t=document.getElementById("pokemon-modal");t.addEventListener("click",e=>{e.target===t&&s()})},uppercaseFirst:c,filterByName:p,search:u,initSearch:function e(){m.addEventListener("keyup",u),m.addEventListener("keyup",e=>{let t=e.code||e.keyCode;("Enter"===t||13===t)&&m.blur()})}}}();pokemonRepository.loadList().then(function(){pokemonRepository.getAll().forEach(pokemonRepository.addListItem),pokemonRepository.initSearch(),pokemonRepository.resetModalByClose()});