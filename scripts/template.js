function getCardsTemplate(i) {
    return `<div class="card" onclick="showDialog(${i})">
                <h3>#<span>${pokemonsData[i].id}</span> <span>${pokemonsData[i].name}</span></h3>
                <div class="card-img-background ${pokemonsData[i].types[0].type.name}">
                    <img src="${pokemonsData[i].img}" alt="${pokemonsData[i].name}">
                </div>
                <div class="align-elements">
                    <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#5f6368"><path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#5f6368"><path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
                </div>
            </div>`
}


function getDialogTemplate(i) {
    return `<div class="card">
                <h3>#<span>${pokemonsData[i].id}</span> <span>${pokemonsData[i].name}</span></h3>
                <div class="card-img-background ${pokemonsData[i].types[0].type.name}">
                    <img src="${pokemonsData[i].img}" alt="${pokemonsData[i].name}">
                </div>
                <div class="align-elements">
                    <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#5f6368"><path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#5f6368"><path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
                </div>
                <div class="align-buttons">    
                    <button id="main_button${i}" class="red-underline" onclick="showMain(${i})">main</button>
                    <button id="stats_button${i}" onclick="showStats(${i})">stats</button>
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
            </div>`
}