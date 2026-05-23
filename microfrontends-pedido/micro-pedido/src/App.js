import React from 'react';
import Pedido from './components/Pedido';
import './index.css';

export default function App() {
  return (
    <div className="pedido-root">
      <h1>Micro Pedido</h1>
      <Pedido />
    </div>
  );
}
