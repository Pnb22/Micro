import React from 'react';
import MenuList from './MenuList';

const App = () => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h1>Micro Cardápio</h1>
      <p>Selecione pratos para adicionar ao pedido.</p>
      <MenuList />
    </div>
  );
};

export default App;
