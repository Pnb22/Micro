import React, { useState, Suspense, lazy } from 'react';
import './App.css';

// Lazy load dos componentes remotos via Module Federation
const Cardapio = lazy(() => import('cardapio/Cardapio'));
const Pedido = lazy(() => import('pedido/Pedido'));

/**
 * Container App - Aplicação principal
 * Responsável por integrar os micro frontends
 */
const App = () => {
  const [, setItemAdded] = useState(false);

  // Listener para atualização de itens adicionados
  React.useEffect(() => {
    const handleItemAdded = () => {
      setItemAdded(prev => !prev); // Apenas para forçar re-render se necessário
    };

    window.addEventListener('add-item', handleItemAdded);
    return () => window.removeEventListener('add-item', handleItemAdded);
  }, []);

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <h1 className="header-title">🍔 Food Delivery MFE</h1>
          <p className="header-subtitle">Micro Frontends com Module Federation</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="app-main">
        {/* Cardápio Section */}
        <section className="cardapio-section">
          <Suspense fallback={<div className="loading">Carregando cardápio...</div>}>
            <Cardapio />
          </Suspense>
        </section>

        {/* Pedido Section */}
        <section className="pedido-section">
          <Suspense fallback={<div className="loading">Carregando pedido...</div>}>
            <Pedido />
          </Suspense>
        </section>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>&copy; 2024 Food Delivery MFE - Arquitetura de Micro Frontends</p>
      </footer>
    </div>
  );
};

export default App;