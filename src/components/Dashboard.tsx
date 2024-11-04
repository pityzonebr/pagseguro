import React, { useState } from 'react';
import { useStore } from '../store';
import { Settings, Trash2, Plus, Copy, Check, ExternalLink, LogOut } from 'lucide-react';

export default function Dashboard() {
  const { configs, addConfig, deleteConfig, token, setToken, user, logout } = useStore();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [newConfig, setNewConfig] = useState({
    title: '',
    description: '',
    amount: 0,
    backgroundColor: '#ffffff',
    imageUrl: '',
    token: token,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addConfig(newConfig);
    setNewConfig({
      title: '',
      description: '',
      amount: 0,
      backgroundColor: '#ffffff',
      imageUrl: '',
      token: token,
    });
  };

  const copyToClipboard = async (id: string) => {
    const url = `${window.location.origin}/checkout/${id}`;
    await navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const openCheckout = (id: string) => {
    window.open(`/checkout/${id}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Settings className="w-6 h-6 text-blue-600" />
              <span className="ml-2 font-semibold text-gray-900">
                Painel Administrativo
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                Olá, {user?.name}
              </span>
              <button
                onClick={logout}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Settings className="w-6 h-6" />
            Configuração PagSeguro
          </h2>
          <input
            type="text"
            placeholder="Token do PagSeguro"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="w-full p-2 border rounded mb-4"
          />
        </div>

        {/* Rest of the Dashboard component remains the same */}
        {/* ... */}
      </div>
    </div>
  );
}