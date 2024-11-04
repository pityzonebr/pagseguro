export const PAGSEGURO_CONFIG = {
  SANDBOX: true, // Mude para false em produção
  API_URL: {
    sandbox: 'https://sandbox.api.pagseguro.com',
    production: 'https://api.pagseguro.com'
  },
  NOTIFICATION_URL: 'https://sua-url.com/webhook/pagseguro', // URL para receber notificações
  REDIRECT_URL: 'https://sua-url.com/pagamento/sucesso', // URL de retorno após pagamento
}