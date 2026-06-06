# 🍔 Food Delivery MFE - Micro Frontends com Module Federation

> Arquitetura escalável de Micro Frontends utilizando React, Webpack 5 e Module Federation

## 📋 Descrição do Projeto

**Food Delivery MFE** é uma aplicação demonstrativa de uma arquitetura de Micro Frontends moderna, simulando um sistema de delivery com cardápio e gerenciamento de pedidos. O projeto utiliza **Webpack Module Federation** para integrar múltiplos aplicativos independentes sem duplicação de dependências.

### O que são Micro Frontends?

Micro Frontends é uma arquitetura onde uma aplicação web frontend é decomposição em semi-independentes sub-aplicações (\"micros\") que trabalham juntas. Esta abordagem oferece:

- **Escalabilidade**: Cada micro pode ser desenvolvido, testado e deployado independentemente
- **Reusabilidade**: Componentes podem ser compartilhados entre múltiplos projetos
- **Autonomia de Equipe**: Diferentes equipes podem trabalhar em diferentes micros simultaneamente
- **Isolamento de Código**: Falhas em um micro não afetam os outros

## 🏗️ Arquitetura do Projeto

```
microfrontends-pedido/
│
├── container/                      # 🎯 Aplicação Container (Host)
│   ├── public/
│   │   ├── index.html
│   │   └── style.css              # Estilos globais
│   ├── src/
│   │   ├── App.js                 # Componente principal
│   │   ├── App.css                # Estilos do layout
│   │   ├── index.js               # Entry point
│   │   └── index.css              # Reset e estilos base
│   ├── webpack.config.js          # Configuração Webpack com Module Federation (consumidor)
│   └── package.json
│
├── micro-cardapio/                 # 🍽️ Micro - Cardápio
│   ├── public/
│   │   ├── index.html
│   │   └── style.css
│   ├── src/
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   ├── index.css
│   │   ├── components/
│   │   │   └── Cardapio.js        # Componente principal do cardápio
│   │   └── styles/
│   │       └── Cardapio.css       # Estilos específicos do cardápio
│   ├── webpack.config.js          # Configuração Webpack com Module Federation (expõe ./Cardapio)
│   └── package.json
│
└── micro-pedido/                   # 🛒 Micro - Pedido/Carrinho
    ├── public/
    │   ├── index.html
    │   └── style.css
    ├── src/
    │   ├── App.js
    │   ├── App.css
    │   ├── index.js
    │   ├── index.css
    │   ├── components/
    │   │   └── Pedido.js          # Componente principal do pedido
    │   └── styles/
    │       └── Pedido.css         # Estilos específicos do pedido
    ├── webpack.config.js          # Configuração Webpack com Module Federation (expõe ./Pedido)
    └── package.json
```

## 🚀 Como Executar o Projeto

### Pré-requisitos

- **Node.js** v14 ou superior
- **npm** v6 ou superior

### Instalação e Execução

O projeto requer 3 terminais simultâneos, um para cada aplicação:

#### Terminal 1 - Executar Container App (Porta 3000)

```bash
cd container
npm install
npm start
```

A aplicação estará disponível em: **http://localhost:3000**

#### Terminal 2 - Executar Micro Cardápio (Porta 3001)

```bash
cd micro-cardapio
npm install
npm start
```

Acesse diretamente em: **http://localhost:3001** (para testes isolados)

#### Terminal 3 - Executar Micro Pedido (Porta 3002)

```bash
cd micro-pedido
npm install
npm start
```

Acesse diretamente em: **http://localhost:3002** (para testes isolados)

### Testando a Aplicação

1. Abra http://localhost:3000 no navegador
2. A página exibirá o cardápio com 8 pratos diferentes
3. Clique em \"Adicionar +\" para adicionar um prato ao pedido
4. O carrinho à direita será atualizado em tempo real
5. Use os botões \"-\" e \"+\" para ajustar quantidades
6. Clique em \"Finalizar Pedido\" para confirmar a compra

## 📡 Comunicação Entre Micros

### Arquitetura de Eventos Globais

Os micros se comunicam através de **eventos globais do navegador** (CustomEvent), permitindo integração frouxa:

#### 1. Micro Cardápio - Disparando Evento

Quando um usuário clica em \"Adicionar +\", o Cardápio dispara um evento global:

```javascript
window.dispatchEvent(
  new CustomEvent('add-item', {
    detail: {
      id: prato.id,
      nome: prato.nome,
      preco: prato.preco,
      quantidade: 1
    }
  })
);
```

#### 2. Micro Pedido - Escutando Evento

O componente Pedido registra um listener para este evento:

```javascript
useEffect(() => {
  const handleAddItem = (event) => {
    const novoItem = event.detail;
    // Lógica para adicionar/incrementar item no carrinho
    setItens(prevItens => {
      const itemExistente = prevItens.find(item => item.id === novoItem.id);
      if (itemExistente) {
        // Incrementa quantidade se já existe
        return prevItens.map(item =>
          item.id === novoItem.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      } else {
        // Adiciona novo item
        return [...prevItens, novoItem];
      }
    });
  };

  window.addEventListener('add-item', handleAddItem);
  
  return () => {
    window.removeEventListener('add-item', handleAddItem);
  };
}, []);
```

### Fluxo de Dados

```
Usuário clica \"Adicionar +\" no Cardápio
         ↓
   Cardápio dispara CustomEvent 'add-item'
         ↓
   Micro Pedido escuta o evento
         ↓
   Pedido verifica se item já existe
         ↓
   Se existe: incrementa quantidade
   Se não existe: adiciona novo item
         ↓
   Componente Pedido re-renderiza com novo estado
```

## ⚙️ Webpack Module Federation

### Como Funciona

**Module Federation** é um recurso do Webpack 5 que permite:
- Compartilhamento de dependências (React, React-DOM)
- Exposição de componentes remotamente
- Consumo dinâmico de módulos em tempo de execução

### Configuração Container

O Container consome os micros através do Module Federation:

```javascript
// webpack.config.js - container
new ModuleFederationPlugin({
  name: 'container',
  remotes: {
    cardapio: 'cardapio@http://localhost:3001/remoteEntry.js',
    pedido: 'pedido@http://localhost:3002/remoteEntry.js'
  },
  shared: {
    react: { singleton: true, requiredVersion: '^18.3.1' },
    'react-dom': { singleton: true, requiredVersion: '^18.3.1' }
  }
})
```

### Configuração Micro Cardápio

O Cardápio expõe seu componente:

```javascript
// webpack.config.js - micro-cardapio
new ModuleFederationPlugin({
  name: 'cardapio',
  filename: 'remoteEntry.js',
  exposes: {
    './Cardapio': './src/components/Cardapio'
  },
  shared: {
    react: { singleton: true, requiredVersion: '^18.3.1' },
    'react-dom': { singleton: true, requiredVersion: '^18.3.1' }
  }
})
```

### Importação Dinâmica no Container

```javascript
// Container/src/App.js
const Cardapio = lazy(() => import('cardapio/Cardapio'));
const Pedido = lazy(() => import('pedido/Pedido'));

<Suspense fallback={<div>Carregando...</div>}>
  <Cardapio />
</Suspense>
```

## 🎨 Design e UI

### Características de Design

- ✨ **Layout Moderno**: Grid responsivo com cards elegantes
- 🎨 **Paleta de Cores**: Laranja vibrante, azul profundo e acentos dourados
- 📱 **Responsivo**: Mobile-first, adaptável a qualquer tamanho de tela
- 🌮 **Emojis Ilustrativos**: Representações visuais dos pratos
- 💫 **Animações Suaves**: Transições e hover states

### Cores Principais

```css
--primary-color: #ff6b35      /* Laranja vibrante */
--secondary-color: #004e89    /* Azul profundo */
--accent-color: #f7b801       /* Dourado */
--background-color: #f5f5f5   /* Fundo cinza claro */
--surface-color: #ffffff      /* Branco superfície */
```

## 📦 Tecnologias Utilizadas

### Core
- **React** v18.3.1 - Biblioteca de UI
- **Webpack** v5.88.2 - Module bundler
- **Webpack Dev Server** v4.15.0 - Servidor de desenvolvimento

### Build & Transpilation
- **Babel** v7.24.0 - Transpilador JavaScript
- **babel-loader** v9.1.4 - Loader para Webpack

### Styling
- **CSS3** - Estilos nativos com CSS Variables
- **CSS Modules** - Isolamento de estilos (suporte pronto)
- **Normalize.css** - Reset de estilos padrão

### Dev Tools
- **Webpack CLI** v5.1.4 - Interface CLI do Webpack

## 💡 Boas Práticas Implementadas

### React
- ✅ Hooks (useState, useEffect) para gerenciamento de estado
- ✅ Lazy loading de componentes com React.lazy e Suspense
- ✅ Componentes funcionais (não há componentes de classe)
- ✅ Props bem documentadas
- ✅ Keys únicos em listas

### Código
- ✅ Nomes de variáveis e funções claros e descritivos
- ✅ Comentários JSDoc para funções principais
- ✅ Organização por responsabilidade
- ✅ Separação de estilos por componente
- ✅ Sem TypeScript (JavaScript puro como requisitado)

### Performance
- ✅ Singleton React compartilhado entre micros
- ✅ Lazy loading de componentes remotos
- ✅ Sem duplicação de dependências
- ✅ Event listeners com cleanup

## 🐛 Troubleshooting

### \"Cannot find module\" no Container

**Problema**: Erro de módulo não encontrado ao importar cardapio ou pedido

**Solução**: 
- Verifique se os micros estão rodando nas portas 3001 e 3002
- Abra DevTools → Network e veja se remoteEntry.js está sendo carregado
- Limpe o cache do navegador (Ctrl+Shift+Delete)

### \"Shared dependency not found\"

**Problema**: React não está sendo compartilhado corretamente

**Solução**:
- Verifique se todos os `package.json` têm React v18.3.1
- Reinicie os servidores Webpack
- Limpe node_modules e execute npm install novamente

### Estilos não aparecem em desenvolvimento

**Problema**: CSS não está sendo aplicado

**Solução**:
- Verifique se os arquivos .css são importados em App.js ou index.js
- Veja console para erros de parse de CSS
- Reinicie o servidor Webpack

## 📚 Recursos Adicionais

### Documentação
- [Webpack Module Federation Docs](https://webpack.js.org/concepts/module-federation/)
- [React Documentation](https://react.dev)
- [Webpack 5 Release Notes](https://webpack.js.org/blog/2020-10-10-webpack-5-release/)

### Artigos Recomendados
- Micro Frontends: \"Building Scalable Systems with Webpack Module Federation\"
- \"Building Micro Frontends with React, Angular, and Vue\"

## 👨‍💻 Estrutura de Desenvolvimento

Cada micro é uma aplicação React independente que pode ser:
- Desenvolvida isoladamente
- Testada sem dependência de outros micros
- Deployada em horários diferentes
- Escrita por diferentes equipes

O Container orquestra tudo, mas sem criar acoplamento forte entre os micros.

## 📝 Licença

Este projeto foi desenvolvido para fins educacionais.

---

**Desenvolvido com ❤️ usando Micro Frontends, React e Webpack Module Federation**
