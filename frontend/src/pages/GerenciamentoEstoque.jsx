// src/pages/Estoque/GerenciamentoEstoque.jsx

import React, { useState, useEffect } from 'react';
import { Table, Button, Input, Badge } from '../../components/UI'; // Componentes genéricos
import ModalProduto from './ModalProduto'; // Modal para criar/editar

const GerenciamentoEstoque = () => {
  const [produtos, setProdutos] = useState([]);
  const [termoBusca, setTermoBusca] = useState('');
  const [modalAberto, setModalAberto] = useState(false);

  // 1. Lógica para buscar dados (Simulada)
  useEffect(() => {
    carregarProdutos();
  }, []);

  const carregarProdutos = async () => {
    // Chamada ao seu backend
    const dados = await api.get('/produtos');
    setProdutos(dados);
  };

  // 2. Filtragem em tempo real
  const produtosFiltrados = produtos.filter(p => 
    p.nome.toLowerCase().includes(termoBusca.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Cabeçalho */}
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Gerenciamento de Estoque</h1>
        <button 
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => setModalAberto(true)}
        >
          + Novo Produto
        </button>
      </header>

      {/* Barra de Filtros */}
      <div className="bg-white p-4 rounded shadow mb-4 flex gap-4">
        <input 
          type="text" 
          placeholder="Buscar por nome ou SKU..." 
          className="border p-2 rounded w-full max-w-md"
          value={termoBusca}
          onChange={(e) => setTermoBusca(e.target.value)}
        />
        {/* Poderia adicionar filtro por categoria aqui */}
      </div>

      {/* Tabela de Produtos */}
      <div className="bg-white rounded shadow overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border-b">Produto</th>
              <th className="p-3 border-b">Categoria</th>
              <th className="p-3 border-b">Preço Venda</th>
              <th className="p-3 border-b text-center">Qtd.</th>
              <th className="p-3 border-b text-center">Status</th>
              <th className="p-3 border-b text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {produtosFiltrados.map((produto) => (
              <tr key={produto.id} className="hover:bg-gray-50">
                <td className="p-3 border-b font-medium">{produto.nome}</td>
                <td className="p-3 border-b text-gray-500">{produto.categoria}</td>
                <td className="p-3 border-b">R$ {produto.preco_venda.toFixed(2)}</td>
                
                {/* Lógica Visual: Quantidade */}
                <td className="p-3 border-b text-center font-bold">
                  {produto.quantidade_atual}
                </td>

                {/* Lógica Visual: Alerta de Estoque Baixo */}
                <td className="p-3 border-b text-center">
                  {produto.quantidade_atual <= produto.estoque_minimo ? (
                    <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                      Repor
                    </span>
                  ) : (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      OK
                    </span>
                  )}
                </td>

                <td className="p-3 border-b text-right space-x-2">
                  <button className="text-blue-600 hover:underline">Editar</button>
                  <button className="text-red-600 hover:underline">Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de Cadastro (Componente separado) */}
      {modalAberto && (
        <ModalProduto onClose={() => setModalAberto(false)} aoSalvar={carregarProdutos} />
      )}
    </div>
  );
};

export default GerenciamentoEstoque;