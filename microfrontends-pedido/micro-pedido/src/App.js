import React from 'react';
import Pedido from './components/Pedido';
import './App.css';

/**
 * App - Componente raiz do Micro Pedido
 * Renderiza o componente principal de pedido/carrinho
 */
const App = () => {
  return (
    <div className="pedido-app">
      <header className="pedido-header">
        <h1>🛒 Seu Pedido</h1>
        <p>Revise e finalize sua compra</p>
      </header>
      <main className="pedido-content">
        <Pedido />
      </main>
    </div>
  );
};

export default App;
