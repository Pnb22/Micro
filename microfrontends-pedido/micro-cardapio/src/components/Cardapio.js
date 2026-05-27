import React from "react";

const pratos = [
  {
    id: 1,
    nome: "Hambúrguer Artesanal",
    descricao: "Pão brioche, cheddar e bacon",
  },
  {
    id: 2,
    nome: "Pizza Calabresa",
    descricao: "Molho especial e queijo mussarela",
  },
  {
    id: 3,
    nome: "Lasanha",
    descricao: "Lasanha bolonhesa gratinada",
  },
];

export default function Cardapio() {
  const adicionarPedido = (prato) => {
    window.dispatchEvent(
      new CustomEvent("adicionar-pedido", {
        detail: prato,
      })
    );
  };

  return (
    <div className="card">
      <h2 className="section-title">🍽️ Cardápio</h2>

      {pratos.map((prato) => (
        <div className="item" key={prato.id}>
          <h3>{prato.nome}</h3>

          <p>{prato.descricao}</p>

          <button onClick={() => adicionarPedido(prato)}>
            Adicionar ao pedido
          </button>
        </div>
      ))}
    </div>
  );
}