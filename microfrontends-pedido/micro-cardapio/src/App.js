import React from 'react';
import Cardapio from './components/Cardapio';
import './App.css';

/**
 * App - Componente raiz do Micro Cardápio
 * Renderiza o componente principal de cardápio
 */
const App = () => {
  return (
    <div className="cardapio-app">
      <header className="cardapio-header">
        <h1>🍽️ Cardápio</h1>
        <p>Escolha seus pratos favoritos</p>
      </header>
      <main className="cardapio-content">
        <Cardapio />
      </main>
    </div>
  );
};

export default App;
