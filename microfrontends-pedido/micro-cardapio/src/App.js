import React from 'react';
import Cardapio from './components/Cardapio';
import './index.css';

export default function App() {
  return (
    <div className="cardapio-root">
      <h1>Micro Cardápio</h1>
      <Cardapio />
    </div>
  );
}
