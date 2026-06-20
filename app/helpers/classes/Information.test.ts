import { describe, it, expect } from "vitest";
import Information from "./Information";

describe("Information", () => {
  describe("static fields (language-independent)", () => {
    const info = new Information();

    it("has the correct GitHub username", () => {
      expect(info._githubUsername).toBe("biancashiromoto");
    });

    it("builds the GitHub API link from the username", () => {
      expect(info._githubApiLink).toBe("https://api.github.com/users/biancashiromoto/repos");
    });

    it("has the correct portfolio link", () => {
      expect(info._portfolioLink).toBe("http://biancashiromoto.github.io/");
    });

    it("has the correct name", () => {
      expect(info._name).toBe("Bianca");
    });

    it("has the correct LinkedIn link", () => {
      expect(info._linkedinLink).toBe("https://www.linkedin.com/in/bshiromoto/");
    });

    it("has the correct GitHub link", () => {
      expect(info._githubLink).toBe("https://github.com/biancashiromoto");
    });

    it("has the correct email", () => {
      expect(info._email).toBe("b.shiromoto.bs@gmail.com");
    });

    it("has the correct profile picture URL", () => {
      expect(info._profilePictureURL).toBe("https://avatars.githubusercontent.com/u/108292121?v=4");
    });

    it("has the correct resume link", () => {
      expect(info._resumeLink).toBe(
        "https://drive.google.com/drive/folders/19pl7eV91_RF0g679ZTmB1W28aEshIJCO?usp=sharing",
      );
    });

    it("has the correct GitHub tooltip", () => {
      expect(info._gitHubTooltip).toBe("GitHub");
    });

    it("has the correct LinkedIn tooltip", () => {
      expect(info._linkedinTooltip).toBe("LinkedIn");
    });
  });

  it("defaults to English when no language is passed", () => {
    const info = new Information();
    expect(info._greetingMessage).toEqual(new Information("en")._greetingMessage);
    expect(info._translateButtonLabel).toBe("Traduzir para o português");
  });

  describe("in English (language = 'en')", () => {
    const info = new Information("en");

    it("sets greeting message array", () => {
      expect(info._greetingMessage).toEqual([
        "Hello!",
        "My name is",
        " Bianca",
        "and this is my portfolio!",
      ]);
    });

    it("sets about me text with 2 paragraphs", () => {
      expect(info._aboutMeText).toHaveLength(2);
      expect(info._aboutMeText[0]).toContain("Veterinary Medicine");
      expect(info._aboutMeText[1]).toContain("accessible interfaces");
    });

    it("sets translate button label", () => {
      expect(info._translateButtonLabel).toBe("Traduzir para o português");
    });

    it("sets in-progress label", () => {
      expect(info._inProgress).toBe("In progress...");
    });

    it("sets email tooltip", () => {
      expect(info._emailTooltip).toBe("Email me!");
    });

    it("sets projects label", () => {
      expect(info._projects).toBe("Projects");
    });

    it("sets return tooltip", () => {
      expect(info._returnToPreviousPageTooltip).toBe("Back");
    });

    it("sets resume tooltip", () => {
      expect(info._resumeTooltip).toBe("Download my resume");
    });

    it("sets cat gif alt text", () => {
      expect(info._catGifAltText).toBe("Gif of a cat typing on a laptop");
    });

    it("sets check my projects label", () => {
      expect(info._checkMyProjects).toBe("Check my projects");
    });

    it("sets download CV label", () => {
      expect(info._downloadMyCV).toBe("Download my CV");
    });

    it("sets scroll to top label", () => {
      expect(info._scrollToTopButtonLabel).toBe("Scroll to top");
    });
  });

  describe("in Portuguese (language = 'pt')", () => {
    const info = new Information("pt");

    it("sets greeting message array", () => {
      expect(info._greetingMessage).toEqual([
        "Olá!",
        "Meu nome é",
        " Bianca",
        "e esse é meu portfolio!",
      ]);
    });

    it("sets about me text with 2 paragraphs", () => {
      expect(info._aboutMeText).toHaveLength(2);
      expect(info._aboutMeText[0]).toContain("Medicina Veterinária");
      expect(info._aboutMeText[1]).toContain("interfaces acessíveis");
    });

    it("sets translate button label", () => {
      expect(info._translateButtonLabel).toBe("Translate to English");
    });

    it("sets in-progress label", () => {
      expect(info._inProgress).toBe("Em construção");
    });

    it("sets email tooltip", () => {
      expect(info._emailTooltip).toBe("Me envie um email!");
    });

    it("sets projects label", () => {
      expect(info._projects).toBe("Projetos");
    });

    it("sets return tooltip", () => {
      expect(info._returnToPreviousPageTooltip).toBe("Voltar");
    });

    it("sets resume tooltip", () => {
      expect(info._resumeTooltip).toBe("Baixe meu currículo");
    });

    it("sets cat gif alt text", () => {
      expect(info._catGifAltText).toBe("Gif de um gato digitando em um laptop");
    });

    it("sets check my projects label", () => {
      expect(info._checkMyProjects).toBe("Veja meus projetos");
    });

    it("sets download CV label", () => {
      expect(info._downloadMyCV).toBe("Baixe meu currículo");
    });

    it("sets scroll to top label", () => {
      expect(info._scrollToTopButtonLabel).toBe("Voltar ao topo");
    });
  });
});
