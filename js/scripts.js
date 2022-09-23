let pokemonRepository= (function() {
    let pokemonList=[];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=1154';
    let pokemonListContainer=document.querySelector('#pokemon-list');

    /*To fetch the pokemon list from the API. Every pokemon object contains the name and detailsUrl keys.*/
    function loadList() {
        return fetch(apiUrl).then(function (response) {
          return response.json();
        }).then(function (json) {
            document.getElementById('pokemon-list').innerHTML='';
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

    //Add single pokemon to pokemonList array.
    function add(pokemon){
        if (typeof pokemon==="object" && "name" in pokemon && "detailsUrl" in pokemon) {
            pokemonList.push(pokemon);
        } else {
            console.log("Please input valid data type. The data need to be an object and contains the 'name' key.");
        }
    }

    //Returen the whole pokemonList array.
    function getAll(){
        return pokemonList;
    }

    //Add single pokemon item into .pokemon-list on the index page as a button
    function addListItem(pokemon) {
        let listItem=document.createElement('div');
        listItem.classList.add('pokemon-button-wrapper');
        listItem.classList.add('col');
        listItem.classList.add('col-lg-3');
        listItem.classList.add('col-md-4');
        listItem.classList.add('col-sm-6');
        
        let button=document.createElement('button');
        button.innerText=uppercaseFirst(pokemon.name);
        button.classList.add('pokemon-button');
        button.classList.add('btn');
        button.classList.add('btn-secondary');
        button.setAttribute('data-toggle', 'modal');
        button.setAttribute('data-target', '#pokemon-modal')//bootstrap built-in function. Click the button, modal will be shown.
        pokemonListContainer.appendChild(listItem);
        listItem.appendChild(button);
        button.addEventListener('click', ()=>{
            showDetails(pokemon);
        });
    }

    //To fetch the detailed information list of a single pokemon from API, return a details object.
    function loadDetails (pokemon){
        let url=pokemon.detailsUrl;
        return fetch(url).then(function (response){
            return response.json()
        }).then(function(details){
            pokemon.imageUrl=details.sprites.front_default;
            pokemon.height=details.height;
            pokemon.weight=details.weight;
            pokemon.types=details.types;
        }).catch(e=>crossOriginIsolated.error(e));
    }
    
    /*addListItem function calls this function, via click event on pokemon button modal will be filled with detailed infos.*/
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function(){
            let modalTitle=document.querySelector('.modal-title');
            modalTitle.innerText=uppercaseFirst(pokemon.name);

            let modalBody=document.querySelector('.modal-body');
            
            let pokemonImage=document.querySelector('#pokemon-img');
            console.log(pokemonImage);
            if(pokemon.imageUrl){
                pokemonImage.src=pokemon.imageUrl;
            }
             
            let pokemonHeight=document.getElementById('pokemon-height');
            console.log(pokemonHeight);
            pokemonHeight.innerText=`Height: ${pokemon.height || '?'}`;

            let pokemonWeight=document.getElementById('pokemon-weight');
            pokemonWeight.innerText=`Weight: ${pokemon.weight || '?'}`;

            let pokemonTypes=document.getElementById('pokemon-types');
            pokemonTypes.innerText='Type: ' + (strPokemonTypes(pokemon) || '?');
           
            //Fetch the type names from the types array of the detailed pokemon info object. 
            function strPokemonTypes (pokemon) {
                return pokemon.types.map(item => item.type.name).join(', ');
            }     
        });
    }

    function uppercaseFirst(str){
        str2=str.charAt(0).toUpperCase() + str.slice(1);
        return str2;
    }

    /*Filter pokemons with name contains certain text. Returns an array of pokemon objects. */
    function filterByName(searchText) {
        return pokemonList.filter(pokemon => pokemon.name.indexOf(searchText)!==-1);
    }

    function search(){
        let input=document.getElementById('search-pokemon');
        let searchList = filterByName(input.value);
        pokemonListContainer.innerHTML="";
        searchList.forEach(addListItem);
    }
    
     function searchField() {
        let searchField=document.getElementById('search-pokemon');
        searchField.addEventListener('keyup',()=>search());
    }


    return {        
        add,
        getAll,
        addListItem,
        loadList,
        loadDetails,
        showDetails,
        uppercaseFirst,
        filterByName,
        search,
        searchField
    }
} ) ();


//On the index page to list every pokemon from the pokemonList in the form of button.
pokemonRepository.loadList().then(function(){
    pokemonRepository.getAll().forEach (pokemonRepository.addListItem);
    pokemonRepository.searchField();
});
