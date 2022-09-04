
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
for(i=0;pokemonList[i];i++) {
    if (pokemonList[i].height>1.5) {
        document.write(`<p><strong>${pokemonList[i].name}</strong> (Height: ${pokemonList[i].height}m) - Wow, that's big!</p>`);
    } else {
        document.write(`<p><strong>${pokemonList[i].name}</strong> (Height: ${pokemonList[i].height}m)</p>`);
    }
}
