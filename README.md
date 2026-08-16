# Catalogo Interativo Mobile

Projeto desenvolvido em React Native com Expo para listar produtos de uma loja online por categoria, consumindo a API REST DummyJSON com Axios.

## Funcionalidades

- Tela de login com validacao de nome e e-mail.
- Armazenamento temporario do usuario com Redux Toolkit.
- Listagem de produtos por abas masculino/feminino.
- Filtros por categorias exigidas no enunciado.
- Tela de detalhes com nome, imagem, descricao, preco, desconto, avaliacao e estoque.
- Logout funcional, limpando os dados do usuario.
- Estados de carregamento e erro durante as chamadas da API.

## Tecnologias

- React Native
- Expo
- Axios
- Redux Toolkit
- React Redux
- DummyJSON API

## Como rodar

```bash
npm install
npx expo start
```

Depois, abra no celular com o aplicativo Expo Go ou execute em um emulador Android/iOS.

## Estrutura

```text
src/
  components/
  data/
  screens/
  services/
  store/
```

## API utilizada

- Listagem por categoria: `https://dummyjson.com/products/category/{categoria}`
- Detalhe do produto: `https://dummyjson.com/products/{id}`

Categorias masculinas: `mens-shirts`, `mens-shoes`, `mens-watches`.

Categorias femininas: `womens-bags`, `womens-dresses`, `womens-jewellery`, `womens-shoes`, `womens-watches`.

## Prints

Adicione aqui os prints da tela de login, listagem e detalhes antes de enviar o repositorio.
