let pokemonRepository= (function() {
    let pokemonList=[];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

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
        let list=document.querySelector('.pokemon-list');
        let listItem=document.createElement('li');
        let button=document.createElement('button');
        button.innerText=uppercaseFirst(pokemon.name);
        button.classList.add('pokemon-button');
        list.appendChild(listItem);
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
    //modalContainer and modal need to be global variable for the showDetails function and the hideModal function.
    let modalContainer=document.querySelector('#modal-container');
    let modal=document.createElement('div');
    modal.classList.add('modal');
    modalContainer.appendChild(modal);

    /*addListItem function calls this function, via click event on pokemon button. Modal will be shown, with detailed pokemon
    information on it.*/
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function(){
            console.log(pokemon)
            /*Show modal */
            //To show modal container, when the pokemon button is clicked the 'is-visible' class will be added to the container.
            modalContainer.classList.add('is-visible');

            /*Creat elements within modal, which are header, content and closeButton. Within content there are
            imageContainer, pokemonInfo1 and pokemonInfo2. The imageContainer is a wrapper for the pokemonImage element.*/
            modal.innerHTML='';

            let modalCloseButton=document.createElement('button');
            modalCloseButton.classList.add('modal-close-button');
            modalCloseButton.innerText='Close';
            modalCloseButton.addEventListener('click', hideModal);

            let modalHeader=document.createElement('h1');
            modalHeader.innerText=uppercaseFirst(pokemon.name);
            
            let modalContent=document.createElement('div');
            modalContent.classList.add('modal-content');

            let imageContainer=document.createElement('div');
            imageContainer.classList.add('image-container');
            let pokemonImage=document.createElement('img');
            pokemonImage.src=pokemon.imageUrl;
            pokemonImage.alt='A front image of the choosen pokemon';

            let pokemonInfo1=document.createElement('p');
            pokemonInfo1.innerHTML=`Height: ${pokemon.height}`;
            let pokemonInfo2=document.createElement('p');
            pokemonInfo2.innerText='Type: ' + pokemonTypes(pokemon);

            //Append all the elements created here. 
            modal.appendChild(modalCloseButton);
            modal.appendChild(modalHeader);
            modal.appendChild(modalContent);
            modalContent.appendChild(imageContainer);
            modalContent.appendChild(pokemonInfo1);
            modalContent.appendChild(pokemonInfo2);
            imageContainer.appendChild(pokemonImage);

            //Fetch the type names from the types array of the detailed pokemon info object and assign them to a string. 
            function pokemonTypes (pokemon) {
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

    /*Reset the content in modal and hide the modal container.*/
    function hideModal(){
        modal.innerHTML='';
        modalContainer.classList.remove('is-visible');
    }

    window.addEventListener('keydown',(e)=>{
        if (e.key==='Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();
        }
    });

    //when a element is displayed as none, can it still be clicked on???
    modalContainer.addEventListener('click', (e)=>{
        if (e.target===modalContainer && modalContainer.classList.contains('is-visible')) {
            hideModal();
        }
    });

    function uppercaseFirst(str){
        str2=str.charAt(0).toUpperCase() + str.slice(1);
        return str2;
    }

        /*Filter pokemons with name contains certain text. Returns an array of pokemon objects. */
    function filterByName(searchText) {
        return pokemonList.filter(pokemon => pokemon.name.indexOf(searchText)!==-1);
    }

    function search(){
        let input=document.getElementById('search');
        console.log(filterByName(input.value));
    }
    

    return {        
        add,
        getAll,
        filterByName,
        addListItem,
        loadList,
        loadDetails,
        search
    }
} ) ();



//On the index page to list every pokemon from the pokemonList in the form of button.
pokemonRepository.loadList().then(function(){
    pokemonRepository.getAll().forEach (pokemonRepository.addListItem);
});

//window.pokemonRepository = pokemonRepository;