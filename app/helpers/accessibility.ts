export const getAriaLabel = (isLanguagePortuguese: boolean) => ({
  button: {
    scrollDown: isLanguagePortuguese ? "Botão para rolar para baixo" : "Scroll down button",
    scrollUp: isLanguagePortuguese ? "Botão para rolar para cima" : "Scroll up button",
    nextSlide: isLanguagePortuguese ? "Próximo slide" : "Next slide",
    previousSlide: isLanguagePortuguese ? "Slide anterior" : "Previous slide",
  },
  links: {
    opensInANewTab: isLanguagePortuguese ? "Abre em uma nova guia" : "Opens in a new tab",
    linkedin: isLanguagePortuguese ? "Visite meu perfil no LinkedIn" : "Visit my LinkedIn profile",
    github: isLanguagePortuguese ? "Visite meu perfil no GitHub" : "Visit my GitHub profile",
    email: isLanguagePortuguese ? "Enviar email para" : "Send email to",
    pageDown: isLanguagePortuguese ? "Ir para a próxima página" : "Go to next page",
    pageUp: isLanguagePortuguese ? "Voltar à página anterior" : "Go back to the previous page",
    resume: isLanguagePortuguese ? "Baixar meu currículo" : "Download my resume",
    project: {
      repositoryLink: (projectTitle: string) =>
        isLanguagePortuguese
          ? `Link do repositório do projeto ${projectTitle}`
          : `Project ${projectTitle}'s repository link`,
      deployLink: (projectTitle: string) =>
        isLanguagePortuguese
          ? `Link do deploy do projeto ${projectTitle}`
          : `Project ${projectTitle}'s deploy link`,
    },
  },
  pages: {
    projects: isLanguagePortuguese ? "Ir para a página de Projetos" : "Go to Projects page",
    return: isLanguagePortuguese ? "Voltar à página anterior" : "Return to the previous page",
  },
  timeline: {
    description: isLanguagePortuguese
      ? "Linha do tempo de experiência profissional e educação"
      : "Timeline of experience and education",
  },
});

export const altText = (isLanguagePortuguese: boolean) => ({
  home: {
    profilePicture: isLanguagePortuguese
      ? "Foto de perfil de Bianca Shiromoto"
      : "Bianca Shiromoto's profile picture",
  },
  projects: {
    projectImage: (projectTitle: string) =>
      isLanguagePortuguese
        ? `Screenshot do projeto ${projectTitle}`
        : `Project ${projectTitle}'s screenshot`,
  },
});
