import React, { Suspense, useState } from "react";

const Cardapio = React.lazy(() => import("cardapio/Cardapio"));
const Pedido = React.lazy(() => import("pedido/Pedido"));

export default function App() {
  const [showCardapio, setShowCardapio] = useState(true);
  const [showPedido, setShowPedido] = useState(true);

  return (
    <div className="container">
      <h1 className="title">🍔 Sistema de Pedidos</h1>

      <div className="actions">
        <button onClick={() => setShowCardapio((value) => !value)}>
          {showCardapio ? "Ocultar Cardápio" : "Mostrar Cardápio"}
        </button>
        <button onClick={() => setShowPedido((value) => !value)}>
          {showPedido ? "Ocultar Pedido" : "Mostrar Pedido"}
        </button>
      </div>

      <div className="grid">
        <Suspense fallback={<p>Carregando...</p>}>
          {showCardapio && <Cardapio />}
          {showPedido && <Pedido />}
        </Suspense>
      </div>
    </div>
  );
}