# VORTEX DYNAMICS - Plataforma de Veículos & Máquinas

Plataforma moderna, premium e interativa para exploração do mercado de **carros esportivos, motocicletas de pista, caminhões pesados, embarcações e tanques militares**.

---

## 🚀 Publicação no GitHub e Hospedagem no Netlify

O projeto já está 100% configurado para build e deploy contínuo no Netlify via GitHub.

### Passo 1: Inicializar o Repositório Git e Subir para o GitHub

No terminal do seu computador (na pasta do projeto):

```bash
# 1. Inicializar o Git (se ainda não tiver sido inicializado)
git init

# 2. Adicionar todos os arquivos
git add .

# 3. Criar o primeiro commit
git commit -m "feat: landing page vortex dynamics com catalogo e radar de preco"

# 4. Criar o repositório no seu GitHub (via site ou gh cli) e renomear a branch para main:
git branch -M main

# 5. Conectar com o seu repositório remoto (substitua com o link do seu repo):
git remote add origin https://github.com/SEU_USUARIO/vortex-dynamics.git

# 6. Enviar para o GitHub
git push -u origin main
```

---

### Passo 2: Hospedar no Netlify (Deploy Automático)

1. Acesse **[app.netlify.com](https://app.netlify.com)** e faça login com sua conta do **GitHub**.
2. Clique no botão **"Add new site"** > **"Import an existing project"**.
3. Selecione o provedor **GitHub** e escolha o repositório `vortex-dynamics`.
4. As configurações de build serão detectadas automaticamente graças ao arquivo `netlify.toml` já incluído:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Clique em **"Deploy site"**.
6. Em menos de 1 minuto, seu site estará no ar com link público HTTPS e certificado SSL gratuito!

> **Dica:** Sempre que você der `git push` na branch `main`, o Netlify fará o build e atualização da sua aplicação de forma 100% automática.

---

### 🛠️ Comandos Locais

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento local
npm run dev

# Rodar a suíte de testes automatizados (Vitest + Testing Library)
npm test

# Testar build de produção
npm run build

# Pré-visualizar o build localmente
npm run preview
```

---

## ✨ Recursos da Aplicação

- **Design Dark & Visual Vermelho Intenso (`#E50914`):** Acabamento automotivo premium inspirado em concessionárias de hipercarros.
- **5 Divisões Especializadas:** Carros, Motos, Caminhões, Barcos e Tanques Militares.
- **Radar de Preços & Notificações:** Sistema de inscrição para alertas de queda de preço com simulação de alertas Toast no navegador e confirmação de e-mail.
- **Ficha Técnica & Desempenho Homologado:** Modais detalhados com gráficos de performance e inteligência de mercado.
- **Comparador Técnico:** Comparação lado a lado de até 3 máquinas.
- **Simulador de Valorização Patrimonial:** Cálculo em tempo real de retenção e ganho de capital.
- **Conversor de Moedas:** Alternador dinâmico BRL / USD.
