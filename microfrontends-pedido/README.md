# microfrontends-pedido

Projeto de microfrontends para um sistema de pedidos utilizando React e Webpack Module Federation.

## Estrutura

- `container/` - aplicação host que integra os micros
- `micro-cardapio/` - microfrontend que expõe o cardápio
- `micro-pedido/` - microfrontend que exibe os itens do pedido

## Tecnologias

- React
- Webpack 5
- Webpack Module Federation
- JavaScript

## Como executar

1. Abra um terminal e rode:

   ```bash
   cd microfrontends-pedido/container
   npm install
   npm start
   ```

2. Abra outro terminal e rode:

   ```bash
   cd microfrontends-pedido/micro-cardapio
   npm install
   npm start
   ```

3. Abra um terceiro terminal e rode:

   ```bash
   cd microfrontends-pedido/micro-pedido
   npm install
   npm start
   ```

4. Acesse a aplicação container em:

   ```
   http://localhost:3000
   ```

## Comunicação entre micros

- `micro-cardapio` despacha um evento global `adicionar-pedido` com detalhes do prato.
- `micro-pedido` escuta esse evento e atualiza a lista de itens do pedido.
- A aplicação `container` importa os micros via Module Federation.

## Ports

- `container`: 3000
- `micro-cardapio`: 3001
- `micro-pedido`: 3002

## Observações

Cada micro está configurado como aplicação independente, com seu próprio `package.json`, `webpack.config.js`, `public/index.html` e `src`.
