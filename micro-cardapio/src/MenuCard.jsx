import React from 'react';

export default function MenuCard({ item, onAdd }) {
  return (
    <article className="menu-card">
      <h3>{item.name}</h3>
      <p>{item.description}</p>
      <button type="button" onClick={onAdd}>
        Adicionar ao pedido
      </button>
    </article>
  );
}
