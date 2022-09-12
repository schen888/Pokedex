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

    function getAll(){
        return pokemonList;
    }

    function filterByName(searchText){
        return pokemonList.filter (pokemon=>pokemon.name.indexOf(searchText)!==-1)
    }

    function addListItem(pokemon) {
        let list=document.querySelector('.pokemon-list');
        let listItem=document.createElement('li');
        let button=document.createElement('button');
        button.innerText=pokemon.name;
        button.classList.add('pokemon-button');
        list.appendChild(listItem);
        listItem.appendChild(button);
    }

    function showDetails(pokemon) {
        console.log(pokemon);
    }

    return {
        add,
        getAll,
        filterByName,
        addListItem
    }
} ) ();

pokemonRepository.add(
    {
        name:'Charmander',
        height: 0.6,
        type: ['Fire']
    }
);

//List the name and height of every pokemon from the pokemonList. Label the pokemon with height great than 1.5.
pokemonRepository.getAll().forEach (pokemonRepository.addListItem);

/* pokemon =>
    {
        if (pokemon.height>1.5) {
            document.write(`<p><strong>${pokemon.name}</strong> (Height: ${pokemon.height}m) - Wow, that's big!</p>`);
        } else {
            document.write(`<p><strong>${pokemon.name}</strong> (Height: ${pokemon.height}m)</p>`);
        }
    } */

console.log(pokemonRepository.filterByName('saur'));


