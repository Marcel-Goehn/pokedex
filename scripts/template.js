function getCardsTemplate(i) {
    return `<div class="card" onclick="showDialog(${i})">
                <h3>#<span>${pokemonsData[i].id}</span> <span>${pokemonsData[i].name}</span></h3>
                <div class="card-img-background ${pokemonsData[i].types[0].type.name}1">
                    <img src="${pokemonsData[i].sprites.front_default}" alt="${pokemonsData[i].name}">
                </div>
                <div class="align-elements">
                    ${getTypes(i)}
                </div>
            </div>`
}


function getDialogTemplate(i) {
    return `<div class="card">
                <h3>#<span>${pokemonsData[i].id}</span> <span>${pokemonsData[i].name}</span></h3>
                <div class="card-img-background ${pokemonsData[i].types[0].type.name}1">
                    <img src="${pokemonsData[i].sprites.front_default}" alt="${pokemonsData[i].name}">
                </div>
                <div class="align-elements-outside">
                    <img onclick="previousPokemon(${i}, event)" class="arrow-btns" src="../assets/img/arrow_circle_left.png">
                    <div class="align-elements">
                        ${getTypes(i)}
                    </div>
                    <img onclick="nextPokemon(${i}, event)" class="arrow-btns" src="../assets/img/arrow_circle_right.png">
                </div>
                
                <div class="align-buttons">    
                    <button id="main_button${i}" class="red-underline" onclick="showMain(${i})">main</button>
                    <button id="stats_button${i}" onclick="showStats(${i})">stats</button>
                    <button id="evo_button${i}" onclick="showEvolutionChain(${i})">evo-chain</button>
                </div>
                <table id="main_table${i}">
                    <tr>
                        <td>Height:</td>
                        <td>${pokemonsData[i].height} m</td>
                    </tr>
                    <tr>
                        <td>Weight:</td>
                        <td>${pokemonsData[i].weight} kg</td>
                    </tr>
                    <tr>
                        <td>Base Experience:</td>
                        <td>${pokemonsData[i].base_experience}</td>
                    </tr>
                    <tr>
                        <td>Abilities:</td>
                        <td>${pokemonsData[i].abilities.map(actions => actions.ability.name).join(`, `)}</td>
                    </tr>
                </table>

                <table id="stats_table${i}" class="d_none">
                    <tr>
                        <td>Hp:</td>
                        <td>${pokemonsData[i].stats[0].base_stat}</td>
                    </tr>
                    <tr>
                        <td>Attack:</td>
                        <td>${pokemonsData[i].stats[1].base_stat}</td>
                    </tr>
                    <tr>
                        <td>Defence:</td>
                        <td>${pokemonsData[i].stats[2].base_stat}</td>
                    </tr>
                    <tr>
                        <td>Special Attack:</td>
                        <td>${pokemonsData[i].stats[3].base_stat}</td>
                    </tr>
                    <tr>
                        <td>Special Defence:</td>
                        <td>${pokemonsData[i].stats[4].base_stat}</td>
                    </tr>
                    <tr>
                        <td>Speed:</td>
                        <td>${pokemonsData[i].stats[5].base_stat}</td>
                    </tr>
                </table>
                <div class="d_none evolution-chain" id="evolution${i}">
                    ${getEvolutionChain(i)}
                </div>
            </div>`
}


function getTypes(i) {
    let types = ``;

    for (let j = 0; j < pokemonsData[i].types.length; j++) {
        types += `<img src="./assets/types_icons/${pokemonsData[i].types[j].type.name}.svg" class="icon ${pokemonsData[i].types[j].type.name}">`
    }
    return types;
}


function getEvolutionChain(i) {
    let firstEvolution = pokemonsFetchedEvoChain[i].chain.species.url;
    let slicedFirstEvolution = firstEvolution.slice(25);
    let regexFirstEvolutionArray = slicedFirstEvolution.match(/\d+/g);
    let regexFirstEvolution = regexFirstEvolutionArray.toString();
    if (pokemonsFetchedEvoChain[i].chain.evolves_to.length == 0) {
        return `<div class="align-chain-name">
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${regexFirstEvolution}.png">
                    <div>${pokemonsFetchedEvoChain[i].chain.species.name}</div>
                </div>`
    }
    let secondEvolution = pokemonsFetchedEvoChain[i].chain.evolves_to[0].species.url;
    let slicedSecondEvolution = secondEvolution.slice(25);
    let regexSecondEvolutionArray = slicedSecondEvolution.match(/\d+/g);
    let regexSecondEvolution = regexSecondEvolutionArray.toString();
    if (pokemonsFetchedEvoChain[i].chain.evolves_to[0].evolves_to.length == 0) {
        return `<div class="align-chain-name">
                    <img class="evo-img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${regexFirstEvolution}.png">
                    <div>${pokemonsFetchedEvoChain[i].chain.species.name}</div>
                </div>
                <span class="evo-arrow">⟫</span>
                <div class="align-chain-name">
                    <img class="evo-img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${regexSecondEvolution}.png">
                    <div>${pokemonsFetchedEvoChain[i].chain.evolves_to[0].species.name}</div>
                </div>`
    }
    let thirdEvolution = pokemonsFetchedEvoChain[i].chain.evolves_to[0].evolves_to[0].species.url;
    let slicedThirdEvolution = thirdEvolution.slice(25);
    let regexThirdEvolutionArray = slicedThirdEvolution.match(/\d+/g);
    let regexThirdEvolution = regexThirdEvolutionArray.toString();
    return `<div class="align-chain-name">
                <img class="evo-img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${regexFirstEvolution}.png">
                <div>${pokemonsFetchedEvoChain[i].chain.species.name}</div>
            </div>
            <span class="evo-arrow">⟫</span>
            <div class="align-chain-name">
                <img class="evo-img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${regexSecondEvolution}.png">
                <div>${pokemonsFetchedEvoChain[i].chain.evolves_to[0].species.name}</div>
            </div>
            <span class="evo-arrow">⟫</span>
            <div class="align-chain-name">
                <img class="evo-img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${regexThirdEvolution}.png">
                <div>${pokemonsFetchedEvoChain[i].chain.evolves_to[0].evolves_to[0].species.name}</div>
            </div>`
}


function getLoadingSpinnerTemplate() {
    return `<div class="spinner-wrapper">
                <img class="loading-spinner" src="./assets/gifs/loadingspinner.gif" alt="">
            </div>`
}