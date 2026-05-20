import React, { Suspense } from 'react';

const CardapioApp = React.lazy(() => import('Cardapio/CardapioApp'));
const PedidoApp = React.lazy(() => import('Pedido/PedidoApp'));

export default function App() {
  return (
    <div className="container-root">
      <header>
        <h1>Micro Frontends - Container</h1>
        <p>O host carrega o Cardápio e o Pedido via Module Federation.</p>
      </header>
      <main>
        <div className="remote-panel">
          <Suspense fallback={<div className="loading">Carregando Cardápio...</div>}>
            <CardapioApp />
          </Suspense>
        </div>
        <div className="remote-panel">
          <Suspense fallback={<div className="loading">Carregando Pedido...</div>}>
            <PedidoApp />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
