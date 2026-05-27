import React, { useEffect, useState } from "react";

export default function Pedido() {
  const [itens, setItens] = useState([]);

  useEffect(() => {
    const evento = (e) => {
      setItens((prev) => [...prev, e.detail]);
    };

    window.addEventListener("adicionar-pedido", evento);

    return () => {
      window.removeEventListener("adicionar-pedido", evento);
    };
  }, []);

  const limparPedido = () => {
    setItens([]);
  };

  return (
    <div className="card">
      <h2 className="section-title">🛒 Pedido</h2>

      <button className="clear-button" onClick={limparPedido}>
        Limpar pedido
      </button>

      {itens.length === 0 ? (
        <p className="empty">Nenhum item no pedido</p>
      ) : (
        itens.map((item, index) => (
          <div className="pedido-item" key={index}>
            <strong>{item.nome}</strong>
          </div>
        ))
      )}
    </div>
  );
}