import React from 'react';

const dishes = [
  {
    id: 'p1',
    name: 'Pizza Margherita',
    description: 'Molho de tomate, mussarela e manjericão fresco.',
    price: 'R$ 28,90'
  },
  {
    id: 'p2',
    name: 'Hambúrguer Clássico',
    description: 'Pão, carne bovina, queijo, alface e molho especial.',
    price: 'R$ 32,50'
  },
  {
    id: 'p3',
    name: 'Salada Caesar',
    description: 'Alface, croutons, parmesão e molho Caesar leve.',
    price: 'R$ 24,00'
  }
];

const MenuList = () => {
  const handleAdd = (dish) => {
    const event = new CustomEvent('micro-menu:add-item', {
      detail: dish
    });
    window.dispatchEvent(event);
  };

  return (
    <div>
      {dishes.map((dish) => (
        <div key={dish.id} style={{ marginBottom: '16px', padding: '16px', border: '1px solid #ddd', borderRadius: '8px' }}>
          <h3>{dish.name}</h3>
          <p>{dish.description}</p>
          <p style={{ fontWeight: 'bold' }}>{dish.price}</p>
          <button
            type="button"
            onClick={() => handleAdd(dish)}
            style={{ padding: '10px 16px', cursor: 'pointer', borderRadius: '4px', border: 'none', backgroundColor: '#3b82f6', color: '#fff' }}
          >
            Adicionar ao pedido
          </button>
        </div>
      ))}
    </div>
  );
};

export default MenuList;
