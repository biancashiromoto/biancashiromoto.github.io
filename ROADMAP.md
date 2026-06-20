# Plano de melhorias do portfólio

## Visão geral

Este documento organiza as melhorias planejadas para o portfólio, agrupadas por tema. A ordem entre os temas é intencional: cada etapa cria a base para a próxima.

---

## Temas

1. [Testes](#1-testes)
2. [CI/CD](#2-cicd)
3. [Acessibilidade](#3-acessibilidade)
4. [Performance](#4-performance)
5. [UX/UI](#5-uxui)
6. [i18n](#6-i18n)

---

## 1. Testes

### Estado atual

A infraestrutura já está configurada (Vitest, Testing Library, jsdom, `setupTests.ts`), mas não existe nenhum arquivo de teste escrito.

### O que implementar

**Testes unitários de funções puras**

- `Utils.formatProjectTitle` — formatação de títulos de repositório
- `Utils.isLanguagePortuguese` — detecção de idioma do navegador
- `Utils.setLocalStorage` / `Utils.getLocalStorage` — persistência de preferências
- `filterRepos` (em `fetchRepos.ts`) — lógica de filtragem de repositórios do GitHub

**Testes de hooks**

- `useReadMore` — lógica de expandir/recolher descrição de projetos
- `useTypeWriter` — animação de digitação com controle de tempo
- `useButtonScrollToTop` — visibilidade do botão com base no progresso de scroll

**Testes de componentes**

- `ProjectDescription` — renderização e interação com o botão "Read more / Read less"
- `LanguageSwitch` — alternância de idioma e atualização do label
- `TopicsList` — renderização da lista de tópicos de um projeto
- `ProjectCard` — renderização completa de um card de projeto

**Testes assíncronos**

- `fetchRepos` — chamada à API do GitHub com mock de `fetch`, incluindo casos de erro e resposta vazia

### Configuração adicional necessária

- Criar `vitest.config.ts` na raiz com alias de paths (`@/`) e configuração de cobertura
- Configurar relatório de cobertura em HTML para visualização local

---

## 2. CI/CD

### Estado atual

Existe um workflow em `.github/workflows/jekyll-gh-pages.yml` que faz build e deploy no GitHub Pages a cada push na `main`. O nome é um resquício da época em que o projeto usava Jekyll.

### O que implementar

**Separar responsabilidades em dois workflows**

`ci.yml` — roda em todo pull request e push:

- Instalar dependências
- Rodar lint (`npm run lint`)
- Rodar testes (`npm run test`)
- Gerar e publicar relatório de cobertura como comentário no PR

`deploy.yml` — roda apenas na `main`, somente se o CI passar:

- Build da aplicação
- Deploy no GitHub Pages

**Adicionar verificações de qualidade**

- Lighthouse CI para auditar performance e acessibilidade automaticamente em cada PR
- Bloquear merge se a cobertura de testes cair abaixo de um threshold definido

**Manutenção**

- Renomear o workflow atual para algo descritivo
- Atualizar a versão do Node de 18 para 20

---

## 3. Acessibilidade

### Estado atual

A base é boa: uso de HTML semântico, `aria-label`, `role="switch"` no toggle de idioma, e um arquivo dedicado `acessibility.ts` com labels bilíngues. Mas há lacunas importantes.

### O que implementar

**Correções imediatas**

- Corrigir o typo no nome do arquivo `acessibility.ts` → `accessibility.ts`
- Adicionar `aria-label` nos cards de projeto (hoje sem descrição para leitores de tela)
- Adicionar anúncio para leitores de tela quando o idioma é alterado (via `aria-live`)
- Verificar e corrigir a ordem de foco por teclado em toda a aplicação

**Carrossel de projetos**

- Adicionar `aria-label` nas setas de navegação
- Anunciar qual projeto está visível ao navegar ("Projeto 2 de 5")
- Garantir que a navegação por teclado funcione corretamente

**Animações**

- Respeitar `prefers-reduced-motion` — hoje as animações (typewriter, parallax, proximidade de texto) não têm essa verificação

**Testes de acessibilidade**

- Integrar `axe-core` via `@axe-core/react` ou `vitest-axe` para rodar audits automatizados nos testes de componente
- Incluir verificação de acessibilidade no CI com Lighthouse

---

## 4. Performance

### Estado atual

O projeto usa `output: "export"` no Next.js (geração estática), o que é adequado para o GitHub Pages. Porém, `unoptimized: true` nas imagens desativa a otimização automática do Next.js.

### O que implementar

**Imagens**

- Implementar lazy loading manual nas screenshots de projetos (hoje todas têm `priority={true}`, o que carrega todas ao mesmo tempo)
- Avaliar o uso de `placeholder="blur"` nas imagens com fallback local

**Bundle**

- Adicionar `@next/bundle-analyzer` para visualizar o peso de cada dependência
- Avaliar se `react-vertical-timeline-component` justifica seu peso ou pode ser substituído por uma implementação própria

**Web Vitals**

- Adicionar monitoramento de LCP, CLS e FID
- Incluir auditoria de Web Vitals no Lighthouse CI

**GitHub API**

- Revisar a estratégia de cache do React Query (`staleTime`, `gcTime`)
- Adicionar fallback visual melhor para quando a API falha ou está lenta (hoje o loader aparece indefinidamente)

---

## 5. UX/UI

### Estado atual

O portfólio tem uma identidade visual definida e funciona bem em mobile e desktop. As oportunidades aqui são de refinamento e novas funcionalidades.

### O que implementar

**Modal de download do currículo**

- Ao clicar no ícone de PDF no `LinksContainer`, abrir um modal em vez de redirecionar diretamente
- O modal deve oferecer duas opções: currículo em português e currículo em inglês, cada um com seu link de download
- Fechar o modal ao clicar fora dele ou pressionar `Escape`
- Garantir acessibilidade: foco deve ir para o modal ao abrir (`focus trap`), retornar ao botão de origem ao fechar, e o modal deve ter `role="dialog"` com `aria-modal="true"` e `aria-labelledby`

**Dark mode**

- Adicionar alternância de tema claro/escuro
- Persistir a preferência no `localStorage`
- Respeitar `prefers-color-scheme` como valor inicial

**Loading states**

- Substituir o loader de três pontos por skeleton screens nos cards de projeto
- Adicionar estado de erro explícito quando a API do GitHub falha

**Melhorias de conteúdo**

- Atualizar o conteúdo da seção "About me"
- Adicionar seção de habilidades/tecnologias
- Adicionar seção de contato (formulário ou link de email direto)

**SEO e compartilhamento**

- Adicionar meta tags Open Graph (imagem de preview quando o link é compartilhado)
- Criar `sitemap.xml`
- Adicionar `robots.txt`

**Detalhes visuais**

- Revisar espaçamentos e tipografia em telas intermediárias (entre 768px e 1024px)
- Melhorar a navegação do carrossel em mobile (suporte a swipe)

---

---

## 6. i18n

### Estado atual

A troca de idioma é implementada de forma manual: a classe `Information.ts` recebe um parâmetro `language` e retorna strings diferentes, e o `LanguageProvider` expõe um boolean `isLanguagePortuguese`. Funciona para dois idiomas, mas escala mal — adicionar um terceiro idioma exigiria alterar cada condicional em toda a base de código.

### O que implementar

**Migrar para uma biblioteca de i18n padrão**

- Adotar `next-intl` (integração nativa com Next.js App Router) ou `react-i18next`
- Mover todo o conteúdo bilíngue de `Information.ts` e `accessibility.ts` para arquivos de mensagens (`messages/pt.json`, `messages/en.json`)
- Substituir o boolean `isLanguagePortuguese` por um hook padrão (`useTranslations`, `useLocale`)

**Roteamento por locale**

- Configurar rotas como `/en` e `/pt` em vez de controlar o idioma via estado
- Permitir que o Next.js gere páginas estáticas para cada locale no build

**Qualidade e tipagem**

- Garantir que todas as chaves de tradução sejam type-safe (o `next-intl` suporta isso nativamente)
- Adicionar testes para verificar que nenhuma chave de tradução está faltando em algum idioma

### Por que fazer isso

A implementação atual já resolve o problema imediato, mas a migração para `next-intl` é o padrão da indústria para projetos Next.js e seria um conhecimento relevante para demonstrar no portfólio — especialmente porque internacionalização é uma necessidade frequente em empresas com produtos globais.

---

## Ordem de execução

```
Testes → CI/CD → Acessibilidade → Performance → UX/UI → i18n
```

A lógica desta ordem:

- **Testes primeiro** dão segurança para modificar o código nas etapas seguintes
- **CI/CD** automatiza os testes e cria uma rede de proteção permanente
- **Acessibilidade** pode ser validada automaticamente no CI com os testes já no lugar
- **Performance** se beneficia da base estável criada nas etapas anteriores
- **UX/UI** é a etapa mais criativa e pode ser feita de forma incremental
- **i18n** vem por último porque refatora a arquitetura de conteúdo — convém ter tudo mais estável antes de fazer essa mudança
