import React, { useEffect, useState } from 'react';

export default function Pedido() {
  const [itens, setItens] = useState([]);

  useEffect(() => {
    const handleAdicionarPedido = (event) => {
      setItens((prevItens) => [...prevItens, event.detail]);
    };

    window.addEventListener('adicionar-pedido', handleAdicionarPedido);
    return () => {
      window.removeEventListener('adicionar-pedido', handleAdicionarPedido);
    };
  }, []);

  return (
    <div className="pedido-list">
      {itens.length === 0 ? (
        <p>Nenhum item adicionado ainda.</p>
      ) : (
        itens.map((item, index) => (
          <article key={`${item.id}-${index}`} className="pedido-item">
            <span>{item.nome}</span>
          </article>
        ))
      )}
    </div>
  );
}
