import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { CreditCard, ShieldCheck, Loader2 } from 'lucide-react';
import { PagSeguroService } from '../services/pagSeguro';

export default function Checkout() {
  const { id } = useParams<{ id: string }>();
  const { configs } = useStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [customerData, setCustomerData] = useState({
    name: '',
    email: '',
    tax_id: '',
    phone: ''
  });
  
  const config = configs.find((c) => c.id === id);

  if (!config) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Checkout não encontrado</p>
      </div>
    );
  }

  const handlePayment = async () => {
    try {
      setLoading(true);
      setError(null);

      const pagSeguroService = new PagSeguroService(config.token);
      const result = await pagSeguroService.createOrder({
        token: config.token,
        amount: config.amount,
        description: config.description,
        customer: customerData
      });

      if (result.success && result.url) {
        window.location.href = result.url;
      } else {
        setError(result.error || 'Erro ao processar pagamento');
      }
    } catch (err) {
      setError('Ocorreu um erro inesperado. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: config.backgroundColor }}
    >
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <img
          src={config.imageUrl}
          alt={config.title}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
        <h1 className="text-3xl font-bold mb-4">{config.title}</h1>
        <p className="text-gray-600 mb-6">{config.description}</p>
        
        <div className="space-y-4 mb-6">
          <input
            type="text"
            placeholder="Nome completo"
            value={customerData.name}
            onChange={(e) => setCustomerData({ ...customerData, name: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="email"
            placeholder="E-mail"
            value={customerData.email}
            onChange={(e) => setCustomerData({ ...customerData, email: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="CPF/CNPJ"
            value={customerData.tax_id}
            onChange={(e) => setCustomerData({ ...customerData, tax_id: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="tel"
            placeholder="Telefone"
            value={customerData.phone}
            onChange={(e) => setCustomerData({ ...customerData, phone: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="flex items-center justify-between mb-8">
          <span className="text-2xl font-bold">
            R$ {config.amount.toFixed(2)}
          </span>
          <div className="flex items-center text-green-600">
            <ShieldCheck className="w-5 h-5 mr-1" />
            <span className="text-sm">Pagamento Seguro</span>
          </div>
        </div>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <button
          onClick={handlePayment}
          disabled={loading || !customerData.name || !customerData.email || !customerData.tax_id}
          className={`w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 ${
            loading || !customerData.name || !customerData.email || !customerData.tax_id
              ? 'opacity-75 cursor-not-allowed'
              : ''
          }`}
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <CreditCard className="w-5 h-5" />
          )}
          {loading ? 'Processando...' : 'Pagar Agora'}
        </button>

        <button
          onClick={() => navigate('/')}
          className="w-full mt-4 text-gray-600 hover:text-gray-800 text-sm"
        >
          Voltar para o Dashboard
        </button>
      </div>
    </div>
  );
}