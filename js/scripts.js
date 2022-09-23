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
    
    //Modal
    let modalTitle=document.querySelector('.modal-title');
    let modalBody=document.querySelector('.modal-body');
    
    /*addListItem function calls this function, via click event on pokemon button modal will be filled with detailed infos.*/
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function(){
            modalTitle.innerText=uppercaseFirst(pokemon.name);
            modalBody.innerText='';
            
            let pokemonImage=document.createElement('img');
            pokemonImage.classList.add('pokemon-img');
            pokemonImage.alt = 'A front image of the choosen pokemon';
            pokemonImage.src = pokemon.imageUrl || 'img/pokemon.png';

            let pokemonHeight=document.createElement('p');
            pokemonHeight.innerText=`Height: ${pokemon.height || '?'}`;
        
            let pokemonWeight=document.createElement('p');
            pokemonWeight.innerText=`Weight: ${pokemon.weight || '?'}`;

            let pokemonTypes=document.createElement('p');
            pokemonTypes.innerText='Type: ' + (strPokemonTypes(pokemon) || '?');

            modalBody.appendChild(pokemonImage);
            modalBody.appendChild(pokemonHeight);
            modalBody.appendChild(pokemonWeight);
            modalBody.appendChild(pokemonTypes);

            //Fetch the type names from the types array of the detailed pokemon info object. 
            function strPokemonTypes (pokemon) {
                return pokemon.types.map(item => item.type.name).join(', ');
            }     
        });
    }

    function resetModalContent(){
        modalTitle.innerText='Pokémon name';
        modalBody.innerHTML='Loading...';
    }

    function resetModalByClose(){
        let modalCloseButton=document.getElementById('modal-close-button')
        modalCloseButton.addEventListener('click', resetModalContent);

        window.addEventListener('keydown',(e)=>{
            if(e.key==='Escape'){
                resetModalContent();
            }
        });

        let modalContainer=document.getElementById('pokemon-modal');
        modalContainer.addEventListener('click',(e)=>{
            let target=e.target;
            if (target===modalContainer) {
                resetModalContent();
            }
        })
    }

    function uppercaseFirst(str){
        str2=str.charAt(0).toUpperCase() + str.slice(1);
        return str2;
    }

    /*Filter pokemons with name contains certain text. Returns an array of pokemon objects. */
    function filterByName(searchText) {
        return pokemonList.filter(pokemon => pokemon.name.toUpperCase().indexOf(searchText.toUpperCase())!==-1);
    }

    let searchField=document.getElementById('search-pokemon');
    function search(){
        let searchList = filterByName(searchField.value);
        pokemonListContainer.innerHTML="";
        searchList.forEach(addListItem);
    }
    
     function initSearch() {
        searchField.addEventListener('keyup',search);
    }


    return {        
        add,
        getAll,
        addListItem,
        loadList,
        loadDetails,
        showDetails,
        resetModalContent,
        resetModalByClose,
        uppercaseFirst,
        filterByName,
        search,
        initSearch
    }
} ) ();


//On the index page to list every pokemon from the pokemonList in the form of button.
pokemonRepository.loadList().then(function(){
    pokemonRepository.getAll().forEach (pokemonRepository.addListItem);
    pokemonRepository.initSearch();
    pokemonRepository.resetModalByClose();
});
