function getCardsTemplate(i) {
    return `<div class="card" onclick="showDialog(${i})">
                <h3>#<span>${pokemonsCopy[i].id}</span> <span>${pokemonsCopy[i].name}</span></h3>
                <div class="card-img-background ${pokemonsCopy[i].types[0].type.name}1">
                    <img src="${pokemonsCopy[i].sprites.front_default}" alt="${pokemonsCopy[i].name}">
                </div>
                <div class="align-elements">
                    ${getTypes(i)}
                </div>
            </div>`
}


function getDialogTemplate(i) {
    return `<div class="card">
                <div class="align-card-header-close-btn">    
                    <h3>#<span>${pokemonsCopy[i].id}</span> <span>${pokemonsCopy[i].name}</span></h3>
                    <svg onclick="closeDialog()" class="align-close-dialog-btn" xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#FFFF"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>    
                </div>
                <div class="card-img-background ${pokemonsCopy[i].types[0].type.name}1">
                    <img src="${pokemonsCopy[i].sprites.front_default}" alt="${pokemonsCopy[i].name}">
                </div>
                <div class="align-elements-outside">
                    <img onclick="previousPokemon(${i}, event)" class="arrow-btns" src="./assets/img/arrow_circle_left.png">
                    <div class="align-elements">
                        ${getTypes(i)}
                    </div>
                    <img onclick="nextPokemon(${i}, event)" class="arrow-btns" src="./assets/img/arrow_circle_right.png">
                </div>
                
                <div class="align-buttons">    
                    <button id="main_button${i}" class="red-underline" onclick="showPokemonCharacteristics('main_table${i}', 'main_button${i}', 'stats_table${i}', 'stats_button${i}', 'evolution${i}', 'evo_button${i}')">main</button>
                    <button id="stats_button${i}" onclick="showPokemonCharacteristics('stats_table${i}', 'stats_button${i}', 'main_table${i}', 'main_button${i}', 'evolution${i}', 'evo_button${i}')">stats</button>
                    <button id="evo_button${i}" onclick="showPokemonCharacteristics('evolution${i}', 'evo_button${i}', 'main_table${i}', 'main_button${i}', 'stats_table${i}', 'stats_button${i}')">evo-chain</button>
                </div>
                <table id="main_table${i}">
                    <tr>
                        <td>Height:</td>
                        <td>${pokemonsCopy[i].height} m</td>
                    </tr>
                    <tr>
                        <td>Weight:</td>
                        <td>${pokemonsCopy[i].weight} kg</td>
                    </tr>
                    <tr>
                        <td>Base Experience:</td>
                        <td>${pokemonsCopy[i].base_experience}</td>
                    </tr>
                    <tr>
                        <td>Abilities:</td>
                        <td>${pokemonsCopy[i].abilities.map(actions => actions.ability.name).join(`, `)}</td>
                    </tr>
                </table>

                <table id="stats_table${i}" class="d_none">
                    <tr>
                        <td>Hp:</td>
                        <td>
                            ${pokemonStats(i, 0, 255, getHpTemplate)}
                        </td>
                    </tr>
                    <tr>
                        <td>Attack:</td>
                        <td>${pokemonStats(i, 1, 190, getAttackTemplate)}</td>
                    </tr>
                    <tr>
                        <td>Defence:</td>
                        <td>${pokemonStats(i, 2, 250, getDefenceTemplate)}</td>
                    </tr>
                    <tr>
                        <td>Special Attack:</td>
                        <td>${pokemonStats(i, 3, 194, getSpecialAttackTemplate)}</td>
                    </tr>
                    <tr>
                        <td>Special Defence:</td>
                        <td>${pokemonStats(i, 4, 250, getSpecialDefenceTemplate)}</td>
                    </tr>
                    <tr>
                        <td>Speed:</td>
                        <td>${pokemonStats(i, 5, 200, getSpeedTemplate)}</td>
                    </tr>
                </table>
                <div class="d_none evolution-chain" id="evolution${i}">
                    ${getEvolutionChain(i)}
                </div>
            </div>`
}


function getTypes(i) {
    let types = ``;

    for (let j = 0; j < pokemonsCopy[i].types.length; j++) {
        types += `<img src="./assets/types_icons/${pokemonsCopy[i].types[j].type.name}.svg" class="icon ${pokemonsCopy[i].types[j].type.name}">`
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


function getEmptyNoteTemplate() {
    return `<div class="empty-alert">Kein Pokemon gefunden...</div>`
}


function getHpTemplate(roundendCalculation) {
    return `<div class="progress">
                <div class="progress-bar" style="width: ${roundendCalculation}%"></div>
            </div>`
}


function getAttackTemplate(roundendCalculation) {
    return `<div class="progress">
                <div class="progress-bar" style="width: ${roundendCalculation}%"></div>
            </div>`
}


function getDefenceTemplate(roundendCalculation) {
    return `<div class="progress">
                <div class="progress-bar" style="width: ${roundendCalculation}%"></div>
            </div>`
}


function getSpecialAttackTemplate(roundendCalculation) {
    return `<div class="progress">
                <div class="progress-bar" style="width: ${roundendCalculation}%"></div>
            </div>`
}


function getSpecialDefenceTemplate(roundendCalculation) {
    return `<div class="progress">
                <div class="progress-bar" style="width: ${roundendCalculation}%"></div>
            </div>`
}


function getSpeedTemplate(roundendCalculation) {
    return `<div class="progress">
                <div class="progress-bar" style="width: ${roundendCalculation}%"></div>
            </div>`
}