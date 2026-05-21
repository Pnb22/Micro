import React, { Suspense } from 'react';

const MenuApp = React.lazy(() => import('menu/MenuApp'));
const OrderApp = React.lazy(() => import('order/OrderApp'));

const App = () => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '24px' }}>
      <h1>Container App</h1>
      <p>Integração de micros com Webpack Module Federation.</p>

      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
        <section style={{ flex: '1 1 420px', minWidth: '320px', padding: '16px', border: '1px solid #ddd', borderRadius: '8px' }}>
          <h2>Micro Cardápio</h2>
          <Suspense fallback={<div>Carregando Cardápio...</div>}>
            <MenuApp />
          </Suspense>
        </section>

        <section style={{ flex: '1 1 320px', minWidth: '320px', padding: '16px', border: '1px solid #ddd', borderRadius: '8px' }}>
          <h2>Micro Pedido</h2>
          <Suspense fallback={<div>Carregando Pedido...</div>}>
            <OrderApp />
          </Suspense>
        </section>
      </div>
    </div>
  );
};

export default App;
