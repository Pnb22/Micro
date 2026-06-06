import React, { useEffect, useState } from 'react';
import '../styles/Pedido.css';

/**
 * Componente Pedido - Exibe e gerencia o carrinho de compras
 * Ouve eventos globais "add-item" do Micro Cardápio
 * Gerencia quantidade, preço e exibe total do pedido
 */
const Pedido = () => {
  const [itens, setItens] = useState([]);
  const [numeroAtualizacoes, setNumeroAtualizacoes] = useState(0);

  /**
   * Efeito para ouvir eventos de adição de itens
   * Comunicação via eventos globais do navegador
   */
  useEffect(() => {
    const handleAddItem = (event) => {
      const novoItem = event.detail;

      // Verifica se item já existe no carrinho
      setItens((prevItens) => {
        const itemExistente = prevItens.find(item => item.id === novoItem.id);

        if (itemExistente) {
          // Se já existe, incrementa a quantidade
          return prevItens.map(item =>
            item.id === novoItem.id
              ? { ...item, quantidade: item.quantidade + 1 }
              : item
          );
        } else {
          // Se não existe, adiciona novo item
          return [...prevItens, novoItem];
        }
      });

      // Atualiza contador de mudanças para re-render
      setNumeroAtualizacoes(prev => prev + 1);
    };

    // Registra listener para evento global 'add-item'
    window.addEventListener('add-item', handleAddItem);

    // Cleanup: remove listener ao desmontar
    return () => {
      window.removeEventListener('add-item', handleAddItem);
    };
  }, []);

  /**
   * Incrementa quantidade de um item
   * @param {number} id - ID do item a incrementar
   */
  const incrementarQuantidade = (id) => {
    setItens(prevItens =>
      prevItens.map(item =>
        item.id === id
          ? { ...item, quantidade: item.quantidade + 1 }
          : item
      )
    );
  };

  /**
   * Decrementa quantidade de um item
   * Se quantidade chegar a 0, remove o item
   * @param {number} id - ID do item a decrementar
   */
  const decrementarQuantidade = (id) => {
    setItens(prevItens =>
      prevItens
        .map(item =>
          item.id === id
            ? { ...item, quantidade: Math.max(0, item.quantidade - 1) }
            : item
        )
        .filter(item => item.quantidade > 0)
    );
  };

  /**
   * Remove um item completamente do pedido
   * @param {number} id - ID do item a remover
   */
  const removerItem = (id) => {
    setItens(prevItens => prevItens.filter(item => item.id !== id));
  };

  /**
   * Limpa todo o pedido
   */
  const limparPedido = () => {
    if (itens.length > 0 && window.confirm('Tem certeza que deseja limpar todo o pedido?')) {
      setItens([]);
    }
  };

  /**
   * Calcula o subtotal de um item
   * @param {Object} item - Item do pedido
   * @returns {number} - Subtotal (quantidade * preço)
   */
  const calcularSubtotal = (item) => item.quantidade * item.preco;

  /**
   * Calcula o total do pedido
   * @returns {number} - Soma de todos os subtotais
   */
  const calcularTotal = () => {
    return itens.reduce((total, item) => total + calcularSubtotal(item), 0);
  };

  const total = calcularTotal();

  return (
    <div className="pedido-container">
      {/* Header do Carrinho */}
      <div className="pedido-header-card">
        <h2 className="pedido-title">🛒 Carrinho ({itens.length} item{itens.length !== 1 ? 's' : ''})</h2>
        {itens.length > 0 && (
          <button
            className="btn-limpar"
            onClick={limparPedido}
            title="Limpar todos os itens"
          >
            ♻️ Limpar
          </button>
        )}
      </div>

      {/* Lista de Itens */}
      <div className="pedido-items">
        {itens.length === 0 ? (
          <div className="pedido-vazio">
            <p className="emoji-vazio">🌭</p>
            <p className="mensagem-vazio">Seu pedido está vazio</p>
            <p className="submensagem">Adicione itens do cardápio para começar!</p>
          </div>
        ) : (
          <div className="itens-lista">
            {itens.map((item) => {
              const subtotal = calcularSubtotal(item);

              return (
                <div key={item.id} className="item-pedido">
                  {/* Informações do Item */}
                  <div className="item-info">
                    <h4 className="item-nome">{item.nome}</h4>
                    <p className="item-preco-unitario">R$ {item.preco.toFixed(2)}</p>
                  </div>

                  {/* Controles de Quantidade */}
                  <div className="item-quantidade-controle">
                    <button
                      className="btn-qty-decrement"
                      onClick={() => decrementarQuantidade(item.id)}
                      title="Diminuir quantidade"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      className="input-quantidade"
                      value={item.quantidade}
                      readOnly
                      min="1"
                    />
                    <button
                      className="btn-qty-increment"
                      onClick={() => incrementarQuantidade(item.id)}
                      title="Aumentar quantidade"
                    >
                      +
                    </button>
                  </div>

                  {/* Subtotal */}
                  <div className="item-subtotal">
                    <span className="label">Subtotal</span>
                    <span className="valor">R$ {subtotal.toFixed(2)}</span>
                  </div>

                  {/* Botão Remover */}
                  <button
                    className="btn-remover"
                    onClick={() => removerItem(item.id)}
                    title={`Remover ${item.nome}`}
                  >
                    ×
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Resumo do Pedido */}
      {itens.length > 0 && (
        <div className="pedido-resumo">
          <div className="resumo-linha">
            <span>Subtotal ({itens.length} item{itens.length !== 1 ? 's' : ''}):</span>
            <span>R$ {total.toFixed(2)}</span>
          </div>
          <div className="resumo-linha">
            <span>Taxa de entrega:</span>
            <span>R$ 5.00</span>
          </div>
          <div className="resumo-total">
            <span className="label-total">Total:</span>
            <span className="valor-total">R$ {(total + 5).toFixed(2)}</span>
          </div>
          <button className="btn-finalizar">🚀 Finalizar Pedido</button>
        </div>
      )}
    </div>
  );
};

export default Pedido;