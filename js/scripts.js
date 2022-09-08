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
        pokemonList.push(pokemon);
    }

    function getAll(){
        return pokemonList;
    }

    return {
        add,
        getAll
    }
} ) ();

//List the name and height of every pokemon from the pokemonList. Label the pokemon with height great than 1.5.
pokemonRepository.getAll().forEach (pokemon =>
    {
        if (pokemon.height>1.5) {
            document.write(`<p><strong>${pokemon.name}</strong> (Height: ${pokemon.height}m) - Wow, that's big!</p>`);
        } else {
            document.write(`<p><strong>${pokemon.name}</strong> (Height: ${pokemon.height}m)</p>`);
        }
    }
);