let pokemonRepository= (function() {
    let pokemonList=[];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=1154';
    let pokemonListContainer=document.querySelector('#pokemon-list');

    /*Add single pokemon to pokemonList array. Before adding check whether the data type is object and whether the object contains
    the 'name' key. */
    function add(pokemon){
        if (typeof pokemon==="object" && "name" in pokemon && "detailsUrl" in pokemon) {
            pokemonList.push(pokemon);
        } else {
            console.log("Please input valid data type. The data need to be an object and contains the 'name' key.");
        }
    }

    /*Returen the whole pokemonList array. */
    function getAll(){
        return pokemonList;
    }

    /*Add single pokemon item into the unordered list (pokemon-list class) on the index page as a button, 
    assign pokemon's name to the button and by clicking the button, log the name of the pokemon in console.*/
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
        button.setAttribute('data-target', '#pokemon-modal')
        pokemonListContainer.appendChild(listItem);
        listItem.appendChild(button);
        button.addEventListener('click', ()=>{
            showDetails(pokemon);
        });
    }

    /*To fetch the pokemon list from the API and to add all the pokemon objects from the list into the pokemonList array
    via calling the add function. Every pokemon object contains the name and detailsUrl keys.*/
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

      /*To fetch the detailed information list from single pokemon from API, return a details object. Add and assign 
      the imageUrl, height and types(array) properties to the pokemon object in pokemonList.*/
      function loadDetails (pokemon) {
        let url=pokemon.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json()
        }).then(function(details){
            pokemon.imageUrl=details.sprites.front_default;
            pokemon.height=details.height;
            pokemon.types=details.types;
        }).catch(function (e){
            crossOriginIsolated.error(e);
        });
      }

    /*Modal*/
    /*addListItem function calls this function, via click event on pokemon button. Modal will be shown, with detailed pokemon
    information on it.*/
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function(){
            let modalTitle=document.querySelector('.modal-title');
            modalTitle.innerText=uppercaseFirst(pokemon.name);

            let modalBody=document.querySelector('.modal-body');
            modalBody.innerHTML='';
            
            let pokemonImage=document.createElement('img');
            pokemonImage.src=pokemon.imageUrl || 'img/pokemon.png';
            pokemonImage.alt='A front image of the choosen pokemon';
            pokemonImage.classList.add('pokemon-img');
            modalBody.appendChild(pokemonImage);
             
            let pokemonInfo1=document.createElement('p');
            pokemonInfo1.innerHTML=`Height: ${pokemon.height || '?'}`;
            let pokemonInfo2=document.createElement('p');
            pokemonInfo2.innerText='Type: ' + (pokemonTypes(pokemon) || '?');
            modalBody.appendChild(pokemonInfo1);
            modalBody.appendChild(pokemonInfo2);
           
            //Fetch the type names from the types array of the detailed pokemon info object and assign them to a string. 
            function pokemonTypes (pokemon) {
                /* Alternative for this function:
                return pokemon.types.map(item => item.type.name).join(', ');*/

                let types=pokemon.types;
                let pokemonTypes='';

                for (let i=0; i<types.length; i++) {
                    if (!types[i+1]) {
                    pokemonTypes=pokemonTypes + types[i].type.name;
                    } else {
                    pokemonTypes=pokemonTypes + types[i].type.name +', ';
                    }
                }
                return pokemonTypes;
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
    

    return {        
        add,
        getAll,
        addListItem,
        loadList,
        loadDetails,
        showDetails,
        uppercaseFirst,
        filterByName,
        search
    }
} ) ();


//On the index page to list every pokemon from the pokemonList in the form of button.
pokemonRepository.loadList().then(function(){
    pokemonRepository.getAll().forEach (pokemonRepository.addListItem);
});

window.pokemonRepository = pokemonRepository;