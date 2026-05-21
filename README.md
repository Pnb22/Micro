# Micro Frontends Demo

Três aplicações React integradas com Webpack Module Federation.

## Estrutura

- `packages/container`: Aplicação container que consome os micros remotos.
- `packages/menu`: Micro Cardápio que exibe pratos e emite eventos ao adicionar itens.
- `packages/order`: Micro Pedido que escuta eventos globais e mostra os itens selecionados.

## Como rodar

1. No diretório raiz do projeto:

```bash
npm install
```

2. Em seguida, iniciar todos os micros ao mesmo tempo:

```bash
npm run dev
```

3. Alternativamente, cada micro pode ser iniciado separadamente:

```bash
npm run start:menu
npm run start:order
npm run start:container
```

## URLs

- Container: http://localhost:3000
- Micro Cardápio: http://localhost:3001
- Micro Pedido: http://localhost:3002

## Comunicação entre micros

A comunicação é feita com eventos globais do browser. Quando o usuário clica em **Adicionar ao pedido** no micro Cardápio, o micro emite um evento `CustomEvent` no `window`:

- Evento: `micro-menu:add-item`
- Payload: o objeto do prato selecionado

O micro Pedido escuta esse evento e atualiza sua lista local de itens adicionados.

## Integração com Module Federation

A aplicação container consome os micros remotos por meio do Webpack Module Federation.

- `menu` expõe o componente `MenuApp`
- `order` expõe o componente `OrderApp`

A container importa esses remote components com `React.lazy()` e `Suspense`, permitindo renderizar os micros como parte da aplicação principal.
