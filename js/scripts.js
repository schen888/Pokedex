
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

for(i=0;pokemonList[i];i++) {
    document.write(`<p><strong>${pokemonList[i].name}</strong> (Height: ${pokemonList[i].height}m)</p>`);
}