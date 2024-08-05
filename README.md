# Sistema de Gerenciamento de Segurança - Indústrias Wayne

## Descrição
Este é um protótipo funcional de um sistema de gerenciamento de segurança para as Indústrias Wayne. O sistema é projetado para fornecer uma plataforma robusta para a autenticação e autorização de diferentes tipos de usuários, bem como para gerenciar de forma eficiente o inventário de recursos, incluindo equipamentos, veículos e dispositivos de segurança.

## Funcionalidades
- **Autenticação e Autorização**: Implementa um sistema de login que garante que apenas usuários autorizados possam acessar áreas restritas do sistema.
- **Gerenciamento de Inventário**: Permite a adição, remoção e atualização de recursos internos, oferecendo um controle detalhado sobre equipamentos e outros itens de segurança.
- **Painel de Controle**: Fornece uma interface visual intuitiva para exibir dados relevantes sobre segurança, recursos e atividades, facilitando a gestão e monitoramento.

## Tecnologias Utilizadas
- **Frontend**: 
  - HTML
  - CSS
  - JavaScript
  - Bootstrap
- **Backend**: 
  - Node.js
  - Express.js
- **Banco de Dados**: 
  - SQLite

## Configuração e Execução
1. Clone este repositório para sua máquina local.
2. Navegue até o diretório do projeto e execute `npm install` para instalar as dependências do Node.js.
3. Inicie o servidor com o comando `node server.js`.
4. Acesse o sistema através do navegador em `http://localhost:3000`.

## Estrutura do Projeto
- **backend/**: Contém o código do servidor, incluindo rotas, lógica de autenticação e manipulação de dados com o banco de dados.
- **frontend/**: Contém o código da interface do usuário, incluindo HTML, CSS e JavaScript para interação com o servidor e apresentação dos dados.
- **package.json**: Arquivo de configuração que lista as dependências do Node.js e scripts de execução.
- **server.js**: Script principal para inicializar e configurar o servidor Express.js.

## Futuras Melhorias
- Implementação de um sistema de permissões mais granular para controle mais fino sobre o acesso a diferentes áreas e funcionalidades do sistema.
- Integração com um banco de dados relacional mais robusto, como MySQL ou PostgreSQL, para maior escalabilidade e funcionalidades avançadas.
- Desenvolvimento de testes automatizados para garantir a qualidade e a estabilidade do código, assegurando que novas funcionalidades não introduzam falhas.

## Licença
Este projeto está licenciado sob os termos da licença FFTecnology.
