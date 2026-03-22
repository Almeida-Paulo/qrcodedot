# 📱 QRCodeDot

> Um gerador de QR Codes moderno, extremamente rápido e 100% acessível, construído com as melhores tecnologias do ecossistema front-end.

![Status](https://img.shields.io/badge/Status-Ativo-success)
![React](https://img.shields.io/badge/React-18+-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC)

## ✨ Funcionalidades

- 🔗 **Geração Instantânea:** Crie QR Codes em tempo real de forma fluida.
- ♿ **Foco em Acessibilidade (A11y):** Formulários e inputs perfeitamente associados (`id` e `htmlFor`), alto contraste, navegação por teclado e suporte total a leitores de tela.
- 📱 **Design Responsivo:** Interface *Mobile-First* que se adapta perfeitamente a smartphones, tablets e desktops.
- 🚀 **Alta Performance:** Construído com Vite para um *Hot Module Replacement* (HMR) instantâneo e builds otimizados.
- 🔍 **SEO Otimizado:** Metadados dinâmicos, `robots.txt` e `sitemap.xml` configurados para indexação perfeita.

## 🛠️ Tecnologias Utilizadas

A stack foi cuidadosamente escolhida para garantir escalabilidade e manutenção limpa:

- **[React](https://react.dev/)** - Biblioteca para construção da interface de usuário.
- **[Vite](https://vitejs.dev/)** - Bundler de altíssima performance.
- **[TypeScript](https://www.typescriptlang.org/)** - Superset JavaScript com tipagem estática rigorosa.
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework CSS utilitário para estilização rápida e padronizada.
- **[Lucide React](https://lucide.dev/)** - Biblioteca de ícones leves, consistentes e customizáveis.

## 🚀 Como rodar o projeto localmente

### Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas na sua máquina:
- **Node.js** (v20.x LTS ou superior)
- **npm** (v10.x ou superior) ou **yarn** / **pnpm**

### Passo a passo

1. Clone este repositório:
```bash
git clone https://github.com/almeida-paulo/qrcodedot.git
```

2. Acesse a pasta do projeto:
```bash
cd qrcodedot
```

3. Instale as dependências:
```bash
npm install
```

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

5. Abra o seu navegador e acesse: `http://localhost:5173`

## 📦 Build e Deploy (Produção)

Este projeto foi arquitetado para ser servido de forma estática, sendo ideal para ambientes **Linux (Ubuntu)** utilizando **Nginx**.

Para gerar os arquivos otimizados para produção, execute:

```bash
npm run build
```

Isso criará uma pasta `/dist` contendo apenas arquivos estáticos (HTML, CSS, JS minificados e com *hash* para cache). 

**Nota para configuração do Nginx:**
Como este é um *Single Page Application* (SPA), certifique-se de configurar o Nginx para redirecionar rotas não encontradas para o `index.html`:

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

## 🤝 Contribuindo

Contribuições são sempre bem-vindas! Se você tem alguma ideia para melhorar o projeto:

1. Faça um *Fork* do projeto
2. Crie uma *Branch* para sua *Feature* (`git checkout -b feature/MinhaFeatureIncrivel`)
3. Faça o *Commit* de suas mudanças (`git commit -m 'feat: Adicionando uma feature incrível'`)
4. Faça o *Push* para a *Branch* (`git push origin feature/MinhaFeatureIncrivel`)
5. Abra um *Pull Request*

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---
