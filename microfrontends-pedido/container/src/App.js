import React, { Suspense } from 'react';
import './index.css';

const Cardapio = React.lazy(() => import('cardapio/Cardapio'));
const Pedido = React.lazy(() => import('pedido/Pedido'));

export default function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Sistema de Pedidos</h1>
        <p>Microfrontends com Module Federation</p>
      </header>

      <main className="app-grid">
        <section className="app-panel">
          <h2>Cardápio</h2>
          <Suspense fallback={<p>Carregando cardápio...</p>}>
            <Cardapio />
          </Suspense>
        </section>

        <section className="app-panel">
          <h2>Pedido</h2>
          <Suspense fallback={<p>Carregando pedido...</p>}>
            <Pedido />
          </Suspense>
        </section>
      </main>
    </div>
  );
}
