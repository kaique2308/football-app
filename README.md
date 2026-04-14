# ⚽ FootballApp

Aplicação React que consome a API **football-data.org** para exibir times e partidas das principais ligas do futebol mundial.

> Trabalho individual — Desenvolvimento Web com React e APIs externas.

---

## 🖥️ Aplicação Online

🔗 **[Link do deploy aqui](https://seu-link-aqui.vercel.app)**

---

## 📸 Screenshots

> _Adicione prints da aplicação aqui após o deploy_

---

## 🚀 Como rodar localmente

### Pré-requisitos

- [Node.js](https://nodejs.org/) v18+
- npm v9+
- Conta gratuita em [football-data.org](https://www.football-data.org/) para obter uma API key

### Passo a passo

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/football-app.git
cd football-app

# 2. Instale as dependências
npm install

# 3. Configure a API Key
# Renomeie o arquivo .env.example para .env e adicione sua chave:
cp .env.example .env
# Edite o .env e coloque sua API key:
# REACT_APP_API_KEY=sua_chave_aqui

# 4. Inicie o servidor de desenvolvimento
npm start
```

A aplicação estará disponível em `http://localhost:3000`.

---

## 🔑 Obtendo a API Key (gratuita)

1. Acesse [football-data.org](https://www.football-data.org/)
2. Clique em **"Get your free API-Token"**
3. Crie uma conta gratuita
4. Copie sua API key e cole no arquivo `.env`

---

## 🏗️ Arquitetura da Aplicação

```
football-app/
├── public/
│   └── index.html              # HTML base
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Navegação principal
│   │   ├── LoadingSpinner.jsx  # Componente de loading
│   │   └── ErrorMessage.jsx    # Componente de erro
│   ├── hooks/
│   │   └── useFetch.js         # Hook genérico para chamadas de API
│   ├── pages/
│   │   ├── Home.jsx            # Página inicial
│   │   ├── Teams.jsx           # Listagem de times
│   │   ├── TeamDetail.jsx      # Detalhes de um time (rota dinâmica)
│   │   ├── Matches.jsx         # Próximas partidas
│   │   └── NotFound.jsx        # Página 404
│   ├── services/
│   │   └── api.js              # Funções de chamada à API
│   ├── App.jsx                 # Configuração de rotas
│   ├── index.js                # Entry point
│   └── index.css               # Estilos globais
├── .env                        # Variáveis de ambiente (NÃO versionar)
├── .env.example                # Exemplo de variáveis de ambiente
├── .gitignore
└── package.json
```

### Diagrama de Fluxo

```
Usuário
  │
  ▼
[Navbar] ──────────────────────────────────────────────────────┐
  │                                                             │
  ├──► [/]          → Home.jsx        (Página inicial)          │
  │                                                             │
  ├──► [/teams]     → Teams.jsx       (Lista de times)          │
  │         │                                                   │
  │         └──► [/teams/:id] → TeamDetail.jsx (Rota dinâmica) │
  │                                                             │
  └──► [/matches]   → Matches.jsx     (Próximas partidas)      │
                                                                │
Cada página usa:                                               │
  useFetch(hook) ──► api.js ──► football-data.org API ◄────────┘
```

---

## 🛣️ Rotas

| Rota | Página | Descrição |
|------|--------|-----------|
| `/` | Home | Página inicial com as competições |
| `/teams` | Teams | Lista de times filtrada por competição |
| `/teams/:id` | TeamDetail | **Rota dinâmica** — detalhes de um time específico |
| `/matches` | Matches | Próximas partidas por competição |

---

## 🔗 Endpoints da API utilizados

| Endpoint | Uso |
|----------|-----|
| `GET /competitions/{code}/teams` | Times de uma competição |
| `GET /teams/{id}` | Detalhes de um time |
| `GET /teams/{id}/matches` | Partidas de um time |
| `GET /competitions/{code}/matches` | Partidas de uma competição |

---

## 🛠️ Tecnologias

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| [React](https://react.dev/) | 18.2 | Framework principal |
| [React Router DOM](https://reactrouter.com/) | 6.22 | Rotas dinâmicas |
| [football-data.org API](https://www.football-data.org/) | v4 | Fonte de dados |
| [Create React App](https://create-react-app.dev/) | 5.0 | Boilerplate |

---

## ☁️ Deploy

### Vercel (recomendado)

```bash
# Instale a CLI da Vercel
npm install -g vercel

# Faça o deploy
vercel

# Configure a variável de ambiente no painel da Vercel:
# REACT_APP_API_KEY = sua_chave_aqui
```

### Netlify

```bash
# Build do projeto
npm run build

# Suba a pasta /build no painel do Netlify
# Configure as variáveis de ambiente em: Site settings > Environment variables
```

---

## 📄 Licença

MIT
