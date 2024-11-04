import { PAGSEGURO_CONFIG } from '../config/pagseguro';

interface PaymentData {
  token: string;
  amount: number;
  description: string;
  customer?: {
    name?: string;
    email?: string;
    tax_id?: string; // CPF/CNPJ
    phone?: string;
  };
}

interface PagSeguroError {
  error: boolean;
  message: string;
}

export class PagSeguroService {
  private baseUrl: string;
  private token: string;

  constructor(token: string) {
    this.token = token;
    this.baseUrl = PAGSEGURO_CONFIG.SANDBOX 
      ? PAGSEGURO_CONFIG.API_URL.sandbox 
      : PAGSEGURO_CONFIG.API_URL.production;
  }

  private async request(endpoint: string, options: RequestInit) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json',
        'x-api-version': '4.0',
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new PagSeguroError(data);
    }

    return data;
  }

  async createOrder(data: PaymentData) {
    try {
      const payload = {
        reference_id: `ORDER-${Date.now()}`,
        customer: data.customer || {},
        items: [
          {
            name: data.description,
            quantity: 1,
            unit_amount: Math.round(data.amount * 100) // Convertendo para centavos
          }
        ],
        qr_codes: [
          {
            amount: {
              value: Math.round(data.amount * 100)
            }
          }
        ],
        shipping: {
          address: {}
        },
        notification_urls: [PAGSEGURO_CONFIG.NOTIFICATION_URL],
        charges: [
          {
            amount: {
              value: Math.round(data.amount * 100),
              currency: "BRL"
            },
            payment_method: {
              type: "CREDIT_CARD",
              installments: 1,
              capture: true
            }
          }
        ]
      };

      const order = await this.request('/orders', {
        method: 'POST',
        body: JSON.stringify(payload)
      });

      return {
        success: true,
        url: order.links.find((link: any) => link.rel === 'PAY')?.href,
        orderId: order.id
      };
    } catch (error) {
      console.error('Erro ao criar ordem:', error);
      return {
        success: false,
        error: 'Não foi possível processar o pagamento. Verifique suas credenciais.'
      };
    }
  }

  async getOrderStatus(orderId: string) {
    try {
      const order = await this.request(`/orders/${orderId}`, {
        method: 'GET'
      });

      return {
        success: true,
        status: order.status
      };
    } catch (error) {
      console.error('Erro ao consultar status:', error);
      return {
        success: false,
        error: 'Não foi possível consultar o status do pedido.'
      };
    }
  }
}