import React, { useState } from 'react';
import MenuCard from './MenuCard';
import './styles.css';

const DISHES = [
  { id: 1, name: 'Prato A', description: 'Delicioso prato com ingredientes frescos.' },
  { id: 2, name: 'Prato B', description: 'Especial do chef com toque regional.' },
  { id: 3, name: 'Prato C', description: 'Opção leve e saborosa para qualquer momento.' }
];

export default function CardapioApp() {
  const [dishes] = useState(DISHES);

  function addToOrder(item) {
    const event = new CustomEvent('ADD_TO_ORDER', { detail: item });
    window.dispatchEvent(event);
  }

  return (
    <section className="cardapio-root">
      <h2>Cardápio</h2>
      <div className="menu-grid">
        {dishes.map(dish => (
          <MenuCard key={dish.id} item={dish} onAdd={() => addToOrder(dish)} />
        ))}
      </div>
    </section>
  );
}
