let pokemonRepository= (function() {
    let pokemonList=[
        {
        name:'Bulbasaur',
        height:0.7,
        type: ['Grass','Poison']
        },

        {
        name:'Ivysaur',
        height:1,
        type: ['Grass','Poison']
        },

        {
        name:'Venusaur',
        height:2,
        type: ['Grass','Poison']
        }
    ];

    /*Add single pokemon to pokemon list. Before adding check whether the data type is object and whether the object contains
    the name, height and type keys. */
    /*Another way to check whether the added pokemon item is object and contains name, height and type keys:
    if (typeof pokemon==="object" && "name" in pokemon && "height" in pokemon && "type" in pokemon) */
    function add(pokemon){
        if (typeof pokemon==="object") {
            let pokeKeys=Object.keys(pokemon);
            if (pokeKeys.indexOf('name')!==-1 && pokeKeys.indexOf('height')!==-1 && pokeKeys.indexOf('type')!==-1){
                pokemonList.push(pokemon);                
            } else {
                console.log("Please enter the name, height and type of the pokemon!");
            }
        } else {
            console.log("Please input valid data type");
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
        add,
        getAll,
        filterByName,
        addListItem
    }
} ) ();

//Add one pokemon item.
pokemonRepository.add(
    {
        name:'Charmander',
        height: 0.6,
        type: ['Fire']
    }
);

//List the name and height of every pokemon from the pokemonList. Label the pokemon with height great than 1.5.
pokemonRepository.getAll().forEach (pokemonRepository.addListItem);



