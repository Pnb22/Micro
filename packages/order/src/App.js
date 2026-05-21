import React, { useEffect, useState } from 'react';

const App = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const handleAddItem = (event) => {
      const newItem = event.detail;
      setItems((current) => [...current, newItem]);
    };

    window.addEventListener('micro-menu:add-item', handleAddItem);
    return () => {
      window.removeEventListener('micro-menu:add-item', handleAddItem);
    };
  }, []);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h1>Micro Pedido</h1>
      <p>Itens adicionados ao pedido:</p>
      {items.length === 0 ? (
        <p>Nenhum item ainda.</p>
      ) : (
        <ul style={{ paddingLeft: '20px' }}>
          {items.map((item, index) => (
            <li key={`${item.id}-${index}`} style={{ marginBottom: '12px' }}>
              <strong>{item.name}</strong> - {item.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
