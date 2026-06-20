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
  });

  describe("constructor defaults to English when no language is passed", () => {
    const info = new Information();

    it("sets English translate button label", () => {
      expect(info._translateButtonLabel).toBe("Traduzir para o português");
    });

    it("sets English greeting message", () => {
      expect(info._greetingMessage).toEqual([
        "Hello!",
        "My name is",
        " Bianca",
        "and this is my portfolio!",
      ]);
    });
  });

  describe("in English (language = 'en')", () => {
    const info = new Information("en");

    it("sets English profile picture alt text", () => {
      expect(info._profilePictureAltText).toBe(
        "I am a woman with dark brown eyes and hair and I am wearing a black and gray T-shirt.",
      );
    });

    it("sets English greeting message array", () => {
      expect(info._greetingMessage).toEqual([
        "Hello!",
        "My name is",
        " Bianca",
        "and this is my portfolio!",
      ]);
    });

    it("sets English about me text with 2 paragraphs", () => {
      expect(info._aboutMeText).toHaveLength(2);
      expect(info._aboutMeText[0]).toContain("veterinary medicine");
    });

    it("sets English translate button label", () => {
      expect(info._translateButtonLabel).toBe("Traduzir para o português");
    });

    it("sets English in-progress label", () => {
      expect(info._inProgress).toBe("In progress...");
    });

    it("sets English email tooltip", () => {
      expect(info._emailTooltip).toBe("Email me!");
    });

    it("sets English projects label", () => {
      expect(info._projects).toBe("Projects");
    });

    it("sets English return tooltip", () => {
      expect(info._returnToPreviousPageTooltip).toBe("Back");
    });

    it("sets English resume tooltip", () => {
      expect(info._resumeTooltip).toBe("Download my resume");
    });

    it("sets English cat gif alt text", () => {
      expect(info._catGifAltText).toBe("Gif of a cat typing on a laptop");
    });

    it("sets English check my projects label", () => {
      expect(info._checkMyProjects).toBe("Check my projects");
    });

    it("sets English download CV label", () => {
      expect(info._downloadMyCV).toBe("Download my CV");
    });

    it("sets English scroll to top label", () => {
      expect(info._scrollToTopButtonLabel).toBe("Scroll to top");
    });
  });

  describe("in Portuguese (language = 'pt')", () => {
    const info = new Information("pt");

    it("sets Portuguese profile picture alt text", () => {
      expect(info._profilePictureAltText).toBe(
        "Sou uma mulher de cabelos e olhos escuros e estou usando uma camiseta cinza e preta.",
      );
    });

    it("sets Portuguese greeting message array", () => {
      expect(info._greetingMessage).toEqual([
        "Olá!",
        "Meu nome é",
        " Bianca",
        "e esse é meu portfolio!",
      ]);
    });

    it("sets Portuguese about me text with 2 paragraphs", () => {
      expect(info._aboutMeText).toHaveLength(2);
      expect(info._aboutMeText[0]).toContain("medicina veterinária");
    });

    it("sets Portuguese translate button label", () => {
      expect(info._translateButtonLabel).toBe("Translate to English");
    });

    it("sets Portuguese in-progress label", () => {
      expect(info._inProgress).toBe("Em construção");
    });

    it("sets Portuguese email tooltip", () => {
      expect(info._emailTooltip).toBe("Me envie um email!");
    });

    it("sets Portuguese projects label", () => {
      expect(info._projects).toBe("Projetos");
    });

    it("sets Portuguese scroll to top label", () => {
      expect(info._scrollToTopButtonLabel).toBe("Voltar ao topo");
    });
  });
});
