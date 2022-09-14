let pokemonRepository= (function() {
    let pokemonList=[];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    /*To fetch the pokemon list from the API and to add every single pokemon object from the list in to the pokemonList array.*/
    function loadList() {
        return fetch(apiUrl).then(function (response) {
          return response.json();
        }).then(function (json) {
          json.results.forEach(function (item) {
            let pokemon = {
              name: item.name,
              detailsUrl: item.url
            };
            add(pokemon);
          });
        }).catch(function (e) {
          console.error(e);
        })
      }

    /*Add single pokemon to pokemonList array. Before adding check whether the data type is object and whether the object contains
    the 'name' key. */
    function add(pokemon){
        if (typeof pokemon==="object" && "name" in pokemon) {
            pokemonList.push(pokemon);
        } else {
            console.log("Please input valid data type. The data need to be an object and contains the 'name' key.");
        }
    }

    /*Returen the whole pokemonList array. */
    function getAll(){
        return pokemonList;
    }

    /*Filter pokemons with name contains certain text. Returns an array of pokemon objects. */
    function filterByName(searchText){
        return pokemonList.filter (pokemon=>pokemon.name.indexOf(searchText)!==-1)
    }

    /*Add single pokemon item into the unordered list (pokemon-list class) as button, assign pokemon's name to the button
    and by clicking the button, log the name of the pokemon in console.*/
    function addListItem(pokemon) {
        let list=document.querySelector('.pokemon-list');
        let listItem=document.createElement('li');
        let button=document.createElement('button');
        button.innerText=pokemon.name;
        button.classList.add('pokemon-button');
        list.appendChild(listItem);
        listItem.appendChild(button);
        button.addEventListener('click', ()=>{
            showDetails(pokemon);
        });
    }

    function showDetails(pokemon) {
        console.log(pokemon.name);
    }

    return {
        loadList,
        add,
        getAll,
        filterByName,
        addListItem
    }
} ) ();


//List the name and height of every pokemon from the pokemonList.
pokemonRepository.loadList().then(function(){
    pokemonRepository.getAll().forEach (pokemonRepository.addListItem)
});



