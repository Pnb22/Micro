import React, { useState } from 'react';
import '../styles/Cardapio.css';

/**
 * Lista de pratos disponíveis no cardápio
 * Cada prato contém: id, nome, descrição, preço e imagem ilustrativa
 */
const pratos = [
  {
    id: 1,
    nome: 'Hambúrguer Artesanal',
    descricao: 'Pão brioche tostado, carne de 150g, cheddar derretido, bacon crocante, alface e tomate',
    preco: 35.90,
    emoji: '🍔'
  },
  {
    id: 2,
    nome: 'Pizza Calabresa',
    descricao: 'Molho de tomate caseiro, queijo mussarela, calabresa fatiada, cebola roxa e orégano',
    preco: 42.00,
    emoji: '🍕'
  },
  {
    id: 3,
    nome: 'Lasanha à Bolonhesa',
    descricao: 'Camadas de massa fresca, molho bolonhese artesanal, béchamel e queijo parmesão gratinado',
    preco: 38.50,
    emoji: '🍝'
  },
  {
    id: 4,
    nome: 'Frango Grelhado',
    descricao: 'Peito de frango marinado, arroz integral, brócolis grelhado e batata doce assada',
    preco: 32.90,
    emoji: '🍗'
  },
  {
    id: 5,
    nome: 'Salmão ao Molho de Abacaxi',
    descricao: 'Filé de salmão fresco, molho com calda de abacaxi, arroz jasmin e legumes salteados',
    preco: 55.00,
    emoji: '🐟'
  },
  {
    id: 6,
    nome: 'Salada César Premium',
    descricao: 'Alface romana fresca, croutons caseiros, parmesan ralado, frango grelhado e molho César artesanal',
    preco: 28.90,
    emoji: '🥗'
  },
  {
    id: 7,
    nome: 'Tacos de Carne',
    descricao: 'Tortillas quentinhas, carne temperada, guacamole, salsa fresca, alface e queijo cheddar',
    preco: 26.50,
    emoji: '🌮'
  },
  {
    id: 8,
    nome: 'Cheesecake de Morango',
    descricao: 'Base crocante, cream cheese suave, cobertura de morango fresco e calda de chocolate',
    preco: 18.90,
    emoji: '🍰'
  }
];

/**
 * Componente Cardapio - Exibe lista de pratos com opção de adicionar ao pedido
 * Comunica-se com o Micro Pedido via eventos globais (CustomEvent)
 */
const Cardapio = () => {
  const [filtro, setFiltro] = useState('');

  /**
   * Dispara evento global quando usuário clica em "Adicionar ao Pedido"
   * @param {Object} prato - Objeto contendo dados do prato
   */
  const handleAdicionarAoPedido = (prato) => {
    // Dispatch de evento global para comunicação inter-micro
    window.dispatchEvent(
      new CustomEvent('add-item', {
        detail: {
          id: prato.id,
          nome: prato.nome,
          preco: prato.preco,
          quantidade: 1
        }
      })
    );
  };

  // Filtra pratos baseado no termo de busca
  const pratosFiltrados = pratos.filter(prato =>
    prato.nome.toLowerCase().includes(filtro.toLowerCase()) ||
    prato.descricao.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="cardapio-container">
      {/* Barra de busca */}
      <div className="cardapio-search">
        <input
          type="text"
          placeholder="🔍 Buscar prato..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Grid de pratos */}
      <div className="pratos-grid">
        {pratosFiltrados.length > 0 ? (
          pratosFiltrados.map((prato) => (
            <div key={prato.id} className="prato-card">
              {/* Emoji como imagem ilustrativa */}
              <div className="prato-emoji">{prato.emoji}</div>

              {/* Informações do prato */}
              <div className="prato-info">
                <h3 className="prato-nome">{prato.nome}</h3>
                <p className="prato-descricao">{prato.descricao}</p>

                {/* Preço e botão */}
                <div className="prato-footer">
                  <span className="prato-preco">R$ {prato.preco.toFixed(2)}</span>
                  <button
                    className="btn-adicionar"
                    onClick={() => handleAdicionarAoPedido(prato)}
                    title={`Adicionar ${prato.nome} ao pedido`}
                  >
                    Adicionar +
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <p>Nenhum prato encontrado com o termo "{filtro}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cardapio;