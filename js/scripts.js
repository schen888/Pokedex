
let pokemon1={
    name:'Bulbasaur',
    height:0.7,
    type: ['Grass','Poison']
};

let pokemon2={
    name:'Ivysaur',
    height:1,
    type: ['Grass','Poison']
};

let pokemon3={
    name:'Venusaur',
    height:2,
    type: ['Grass','Poison']
};

let pokemonList=[
    pokemon1,
    pokemon2,
    pokemon3
];

//List the name and height of every pokemon from the pokemonList. Label the pokemon with height great than 1.5.
function pokemonHeightClass(pokemon) {
    if (pokemon.height>1.5) {
        document.write(`<p><strong>${pokemon.name}</strong> (Height: ${pokemon.height}m) - Wow, that's big!</p>`);
    } else {
        document.write(`<p><strong>${pokemon.name}</strong> (Height: ${pokemon.height}m)</p>`);
    }
}
pokemonList.forEach (pokemonHeightClass);