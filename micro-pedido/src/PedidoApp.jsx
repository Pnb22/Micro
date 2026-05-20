import React, { useEffect, useState } from 'react';
import './styles.css';

export default function PedidoApp() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    function onAdd(event) {
      const item = event.detail;
      setItems(prevItems => [...prevItems, item]);
    }

    window.addEventListener('ADD_TO_ORDER', onAdd);
    return () => window.removeEventListener('ADD_TO_ORDER', onAdd);
  }, []);

  return (
    <section className="pedido-root">
      <h2>Pedido</h2>
      {items.length === 0 ? (
        <p>Nenhum item no pedido.</p>
      ) : (
        <div className="pedido-list">
          {items.map((item, index) => (
            <div key={`${item.id}-${index}`} className="pedido-item">
              <strong>{item.name}</strong>
              <span>{item.description}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
