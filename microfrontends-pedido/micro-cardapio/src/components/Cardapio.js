import React from 'react';

const pratos = [
  { id: 1, nome: 'Hambúrguer', descricao: 'Hambúrguer artesanal com queijo e bacon' },
  { id: 2, nome: 'Pizza', descricao: 'Pizza de calabresa com borda crocante' },
  { id: 3, nome: 'Salada', descricao: 'Salada fresca com molho de mostarda e mel' }
];

export default function Cardapio() {
  const adicionarPedido = (prato) => {
    window.dispatchEvent(new CustomEvent('adicionar-pedido', { detail: prato }));
  };

  return (
    <div className="cardapio-list">
      {pratos.map((prato) => (
        <article key={prato.id} className="cardapio-item">
          <div>
            <h2>{prato.nome}</h2>
            <p>{prato.descricao}</p>
          </div>
          <button type="button" onClick={() => adicionarPedido(prato)}>
            Adicionar ao pedido
          </button>
        </article>
      ))}
    </div>
  );
}
