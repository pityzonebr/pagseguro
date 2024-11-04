# pagseguro

Sistema de Pagamento com PagSeguro e Autenticação
Este projeto é um sistema de checkout para pagamentos com PagSeguro, com geração de links exclusivos para cada pagamento e uma tela de login segura. Ele foi desenvolvido em React e configurado para uso com a API do PagSeguro.

Requisitos
Node.js (v14 ou superior)
Visual Studio Code
Conta no PagSeguro
Instalação
Clone o repositório

bash
Copiar código
git clone https://github.com/seuusuario/seuprojeto.git
cd seuprojeto
Instale as dependências

bash
Copiar código
npm install
Inicie o servidor de desenvolvimento

bash
Copiar código
npm run dev
Abra o projeto no Visual Studio Code

No terminal, você pode abrir diretamente com o comando:

bash
Copiar código
code .
Configuração do PagSeguro

Criar uma conta no PagSeguro:

Acesse PagSeguro e crie uma conta de vendedor.
Obter as credenciais:

Acesse sua conta PagSeguro.
Vá para “Minha Conta” > “Vendedor” > “Preferências” > “Credenciais” para obter o token de acesso.
Configuração do ambiente:

No arquivo src/config/pagseguro.ts, insira as seguintes configurações:

typescript
Copiar código
export const config = {
  TOKEN: 'seu-token-aqui',
  SANDBOX: true, // Mude para false em produção
  NOTIFICATION_URL: 'https://seu-dominio.com/notificacao',
  REDIRECT_URL: 'https://seu-dominio.com/sucesso'
};
Configure a URL de notificação no painel do PagSeguro para receber atualizações sobre o status dos pagamentos.

Ambiente Sandbox:

Use o ambiente de sandbox do PagSeguro para testes. Utilize os cartões de teste fornecidos pela documentação do PagSeguro e o CPF de teste 12345678909.
Funcionalidades
Checkout com link exclusivo: Gera um link de pagamento único para cada transação.
Copiar link de pagamento: Permite copiar o link de checkout para compartilhar com o cliente.
Autenticação Segura: Sistema de login com autenticação e interface segura.
Configuração de Autenticação
Configuração de Autenticação Básica

Email: admin@example.com
Senha: admin123
Componentes e Funcionalidades

Tela de login moderna com fundo gradiente, ícones e feedback visual.
Gerenciamento de sessão com proteção de rotas.
Redirecionamento automático para a tela de login para usuários não autenticados.
Navbar com informações do usuário e botão de logout.
Estrutura do Projeto
src/config/pagseguro.ts – Configurações do PagSeguro.
src/services/pagSeguro.ts – Serviço de integração com a API do PagSeguro.
src/components/Checkout.tsx – Componente de checkout com botão de pagamento e link exclusivo.
src/components/Login.tsx – Tela de login segura.
src/components/PrivateRoute.tsx – Protege as rotas da aplicação.
Testes e Deploy
Testar o sistema em ambiente sandbox:

Utilize o ambiente de sandbox do PagSeguro para verificar se a integração está funcionando corretamente.
Configurar o deploy:

Certifique-se de configurar SANDBOX: false no arquivo de configuração src/config/pagseguro.ts para o ambiente de produção.
Configurar as URLs de produção:

Insira as URLs corretas de notificações e redirecionamentos para o seu domínio.
Deploy no servidor

Após todas as configurações, faça o deploy do projeto para o seu servidor.
