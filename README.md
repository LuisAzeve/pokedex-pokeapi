# 🔴 Pokédex - PokeAPI

Uma aplicação web simples e interativa que consome a [PokeAPI](https://pokeapi.co/) para listar, filtrar e favoritar Pokémons em tempo real.

Projeto desenvolvido para fins educacionais (FECAF).

🔗 **Deploy no Netlify:** [https://pokedex-pokeapi-fecaf.netlify.app](https://pokedex-pokeapi-fecaf.netlify.app/#container-cards-pokemons)

---

## ✨ Funcionalidades

- **Listagem de Pokémons:** Carregamento dinâmico via PokeAPI com paginação através do botão *"Carregar mais"*.
- **Busca por Nome:** Pesquise seu Pokémon favorito em tempo real pelo campo de busca.
- **Filtro por Tipo:** Filtre os Pokémons por elementos (*Fire, Water, Grass, Electric*, etc.).
- **Sistema de Favoritos:** Marque e desmarque Pokémons favoritos com persistência no `localStorage`.
- **Cards Detalhados:** Exibição da imagem oficial (*artwork*), ID (#), nome, tipos customizados com cores específicas, peso e altura formatados.
- **Design Responsivo:** Interface adaptada para diferentes tamanhos de tela.

---

## 🛠️ Tecnologias Utilizadas

- **HTML5:** Estruturação semântica da página.
- **CSS3:** Estilização moderna, esquema de cores por tipo de Pokémon e layout responsivo.
- **JavaScript (Vanilla JS):** Manipulação da DOM, consumo de API assíncrona (`fetch` e `Promise.all`) e persistência local (`localStorage`).
- **[PokeAPI](https://pokeapi.co/):** API REST utilizada para obtenção dos dados dos Pokémons.
- **[Netlify](https://www.netlify.com/):** Hospedagem e deploy contínuo da aplicação.

---

## 🚀 Como Executar Localmente

Como o projeto foi desenvolvido com tecnologias web nativas (sem necessidade de bundlers ou dependências externas), basta clonar e abrir no navegador:

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/SEU-USUARIO/pokedex-pokeapi.git
   ```

2. **Acesse a pasta do projeto:**
   ```bash
   cd pokedex-pokeapi
   ```

3. **Abra o arquivo `index.html`:**
   - Dê um duplo clique no arquivo [index.html](file:///c:/Users/adm.luis.azevedo/OneDrive%20-%20spdmafiliadas/Documentos/Estudo/pokedex-pokeapi/index.html) ou utilize a extensão **Live Server** no VS Code.

---

## 👨‍💻 Autor

Desenvolvido por **Luis Felippe**.
