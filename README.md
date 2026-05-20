# Micro Frontends com Webpack Module Federation (React)

## Objetivo

Este monorepo contém três aplicações React que representam uma solução de micro frontends com Module Federation:

- `container`: aplicação host que carrega os micros remotos.
- `micro-cardapio`: exibe o cardápio e emite eventos para adicionar pratos ao pedido.
- `micro-pedido`: escuta eventos globais e atualiza a lista de itens do pedido.

A comunicação entre micros é feita via eventos globais usando `window.dispatchEvent` e `window.addEventListener`.

## Tecnologias

- React 18
- Webpack 5
- Module Federation
- JavaScript (sem TypeScript)
- CSS simples

## Estrutura do projeto

- `container/`: host React que importa os remotes `Cardapio` e `Pedido`.
- `micro-cardapio/`: micro frontend que expõe `CardapioApp`.
- `micro-pedido/`: micro frontend que expõe `PedidoApp`.

## Como rodar

1. No diretório raiz do repositório:

```bash
npm install
```

2. Em terminais separados, inicie cada aplicação:

```bash
cd container
npm start
```

```bash
cd micro-cardapio
npm start
```

```bash
cd micro-pedido
npm start
```

3. Acesse no navegador:

- Container: `http://localhost:3000`
- Micro Cardápio: `http://localhost:3001`
- Micro Pedido: `http://localhost:3002`

O `container` carrega os componentes remotos do `micro-cardapio` e `micro-pedido` via Module Federation.

## Comunicação entre micros

- `micro-cardapio` emite evento global `ADD_TO_ORDER` com detalhes do item:

```js
window.dispatchEvent(new CustomEvent('ADD_TO_ORDER', { detail: item }))
```

- `micro-pedido` escuta esse evento e adiciona o item ao estado local:

```js
window.addEventListener('ADD_TO_ORDER', onAdd)
```

- O `container` apenas orquestra a renderização dos remotes, sem manter estado compartilhado.

## Componentes principais

- `micro-cardapio/src/CardapioApp.jsx`
- `micro-cardapio/src/MenuCard.jsx`
- `micro-pedido/src/PedidoApp.jsx`
- `container/src/App.jsx`

## Próximos passos

- Evoluir comunicação para um bus de eventos compartilhado.
- Adicionar autenticação e rotas.
- Compartilhar utilitários ou estilos via Module Federation.
- Implementar fallback visual e carregamento dinâmico.
