/********************************************************************************************************************
 * Objetivo: Criar uma Pokedex utilizando a API do PokeAPI, permitindo que os usuários possam buscar e visualizar informações sobre diferentes Pokémon.
 * API: https://pokeapi.co/docs/v2
 * Autor: Luis Felippe
 * Data: 03/11/2026
 * Versão: 1.0
 ********************************************************************************************************************/

const URL_API = "https://pokeapi.co/api/v2"


// Limite de pokemons por requisição
const limite = 20
let offset = 0

// Lista de pokemons carregados
let todosPokemons = []

//Tipos de pokemons
const tipos = [
    "normal", "fire", "water", "grass", "electric", "ice",
    "fighting", "poison", "ground", "flying", "psychic", "bug",
    "rock", "ghost", "dragon", "dark", "steel", "fairy"
]

let favoritos = JSON.parse(localStorage.getItem("favoritos")) || []

let mostrandoFavoritos = false;

//ELEMENTOS DO HTML
const container = document.getElementById("container-cards-pokemons");
const campoBusca = document.getElementById("busca");
const botaoBuscar = document.getElementById("btn-buscar");
const filtroTipo = document.getElementById("filtro-tipo");
const status = document.getElementById("status");
const botaoMais = document.getElementById("btn-mais");
const linkFavoritos = document.getElementById("link-favoritos");

// Tipos de pokemon 
function preencherTipos() {
    tipos.forEach(function (tipo) {
        const opcao = document.createElement("option");
        opcao.value = tipo;
        opcao.textContent = tipo;
        filtroTipo.appendChild(opcao);
    });
}

//Busca de pokemons 
const carregarPokemons = function () {
    status.textContent = "Carregando..."
    botaoMais.disabled = true

    fetch(URL_API + "/pokemon?limit=" + limite + "&offset=" + offset)
        .then(function (response) {
            return response.json()
        })
        .then(function (dados) {
            const promessas = dados.results.map(function (item) {
                return fetch(item.url).then(function (response) {
                    return response.json()
                })
            })

            return Promise.all(promessas)
        })
        .then(function (listaDetalhes) {
            todosPokemons = todosPokemons.concat(listaDetalhes)
            offset = offset + limite

            status.textContent = ""
            botaoMais.disabled = false
            mostrarCards()
        })
        .catch(function (erro) {
            console.log("Erro", erro)
            status.textContent = "Erro ao carregar os pokemons. Tente novamente"
            botaoMais.disabled = false
        })
}

//CRIAR UM CARD 
const criarCard = function (pokemon) {
    // tipo principal do pokémon 
    const tipoPrincipal = pokemon.types[0].type.name;

    // div principal do card
    const card = document.createElement("div");
    card.classList.add("card", "tipo-" + tipoPrincipal);

    // coração de favorito
    const coracao = document.createElement("span");
    coracao.classList.add("btn-favorito");
    if (favoritos.includes(pokemon.id)) {
        coracao.textContent = "♥";
        coracao.classList.add("favoritado");
    } else {
        coracao.textContent = "♡";
    }
    coracao.addEventListener("click", function () {
        alternarFavorito(pokemon.id, coracao);
    });


    const nome = document.createElement("h2");
    nome.classList.add("card-nome");
    nome.textContent = pokemon.name;

    // imagem
    const imagem = document.createElement("img");
    imagem.classList.add("card-imagem");
    imagem.src = pokemon.sprites.other["official-artwork"].front_default || pokemon.sprites.front_default;
    imagem.alt = pokemon.name;

    // número na pokédex
    const id = document.createElement("p");
    id.classList.add("card-id");
    id.textContent = "#" + pokemon.id;

    // etiquetas dos tipos (um pokémon pode ter 1 ou 2 tipos)
    const divTipos = document.createElement("div");
    divTipos.classList.add("card-tipos");
    pokemon.types.forEach(function (item) {
        const etiqueta = document.createElement("span");
        etiqueta.classList.add("tipo", "tipo-" + item.type.name);
        etiqueta.textContent = item.type.name;
        divTipos.appendChild(etiqueta);
    });

    // altura e peso (a API manda altura em decímetros e peso em hectogramas, por isso dividimos por 10)
    const info = document.createElement("p");
    info.classList.add("card-info");
    info.textContent = "Altura: " + (pokemon.height / 10) + " m | Peso: " + (pokemon.weight / 10) + " kg";


    card.appendChild(coracao);
    card.appendChild(nome);
    card.appendChild(imagem);
    card.appendChild(id);
    card.appendChild(divTipos);
    card.appendChild(info);

    return card;
}

const mostrarCards = function () {
    const texto = campoBusca.value.toLowerCase().trim()
    const tipoSelecionado = filtroTipo.value

    // Limpar o container
    container.innerHTML = ""

    const filtrados = todosPokemons.filter(function (pokemon) {
        const nomeOk = pokemon.name.includes(texto)
        const tipoOk = tipoSelecionado === "" || pokemon.types.some(function (item) {
            return item.type.name === tipoSelecionado
        })
        const favoritoOk = !mostrandoFavoritos || favoritos.includes(pokemon.id)

        return nomeOk && tipoOk && favoritoOk
    })

    if (filtrados.length === 0) {
        status.textContent = "Nenhum Pokémon encontrado."
    } else {
        status.textContent = ""
    }

    filtrados.forEach(function (pokemon) {
        const card = criarCard(pokemon)
        container.appendChild(card)
    })
}

//Favoritos
const alternarFavorito = function (idPokemon, coracao) {
    if (favoritos.includes(idPokemon)) {
        favoritos = favoritos.filter(function (id) {
            return id !== idPokemon
        })
        coracao.textContent = "♡"
        coracao.classList.remove("favoritado")
    } else {
        favoritos.push(idPokemon)
        coracao.textContent = "♥"
        coracao.classList.add("favoritado")
    }

    //salvar no localStorage
    localStorage.setItem("favoritos", JSON.stringify(favoritos))

    if (mostrandoFavoritos) {
        mostrarCards()
    }
}

//Eventos
campoBusca.addEventListener("input", mostrarCards);

botaoBuscar.addEventListener("click", mostrarCards);

filtroTipo.addEventListener("change", mostrarCards);

botaoMais.addEventListener("click", carregarPokemons);

linkFavoritos.addEventListener("click", function (evento) {
    evento.preventDefault();
    mostrandoFavoritos = !mostrandoFavoritos;

    if (mostrandoFavoritos) {
        linkFavoritos.textContent = "Ver todos";
    } else {
        linkFavoritos.textContent = "Favoritos";
    }

    mostrarCards();
});

preencherTipos();
carregarPokemons();