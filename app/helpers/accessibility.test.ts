import { describe, it, expect } from "vitest";
import { getAriaLabel, altText } from "./accessibility";

describe("getAriaLabel", () => {
  describe("in English (isLanguagePortuguese = false)", () => {
    const labels = getAriaLabel(false);

    describe("button", () => {
      it("returns English scroll down label", () => {
        expect(labels.button.scrollDown).toBe("Scroll down button");
      });

      it("returns English scroll up label", () => {
        expect(labels.button.scrollUp).toBe("Scroll up button");
      });

      it("returns English next slide label", () => {
        expect(labels.button.nextSlide).toBe("Next slide");
      });

      it("returns English previous slide label", () => {
        expect(labels.button.previousSlide).toBe("Previous slide");
      });
    });

    describe("links", () => {
      it("returns English opens in a new tab label", () => {
        expect(labels.links.opensInANewTab).toBe("Opens in a new tab");
      });

      it("returns English linkedin label", () => {
        expect(labels.links.linkedin).toBe("Visit my LinkedIn profile");
      });

      it("returns English github label", () => {
        expect(labels.links.github).toBe("Visit my GitHub profile");
      });

      it("returns English email label", () => {
        expect(labels.links.email).toBe("Send email to");
      });

      it("returns English resume label", () => {
        expect(labels.links.resume).toBe("Download my resume");
      });

      it("returns English project repository link with title", () => {
        expect(labels.links.project.repositoryLink("My App")).toBe(
          "Project My App's repository link",
        );
      });

      it("returns English project deploy link with title", () => {
        expect(labels.links.project.deployLink("My App")).toBe("Project My App's deploy link");
      });
    });

    describe("pages", () => {
      it("returns English projects page label", () => {
        expect(labels.pages.projects).toBe("Go to Projects page");
      });

      it("returns English return label", () => {
        expect(labels.pages.return).toBe("Return to the previous page");
      });
    });

    describe("timeline", () => {
      it("returns English timeline description", () => {
        expect(labels.timeline.description).toBe("Timeline of experience and education");
      });
    });
  });

  describe("in Portuguese (isLanguagePortuguese = true)", () => {
    const labels = getAriaLabel(true);

    it("returns Portuguese scroll down label", () => {
      expect(labels.button.scrollDown).toBe("Botão para rolar para baixo");
    });

    it("returns Portuguese linkedin label", () => {
      expect(labels.links.linkedin).toBe("Visite meu perfil no LinkedIn");
    });

    it("returns Portuguese project repository link with title", () => {
      expect(labels.links.project.repositoryLink("Meu App")).toBe(
        "Link do repositório do projeto Meu App",
      );
    });

    it("returns Portuguese project deploy link with title", () => {
      expect(labels.links.project.deployLink("Meu App")).toBe("Link do deploy do projeto Meu App");
    });

    it("returns Portuguese timeline description", () => {
      expect(labels.timeline.description).toBe(
        "Linha do tempo de experiência profissional e educação",
      );
    });
  });
});

describe("altText", () => {
  describe("in English (isLanguagePortuguese = false)", () => {
    const alt = altText(false);

    it("returns English profile picture alt text", () => {
      expect(alt.home.profilePicture).toBe("Bianca Shiromoto's profile picture");
    });

    it("returns English project image alt text with title", () => {
      expect(alt.projects.projectImage("My App")).toBe("Project My App's screenshot");
    });
  });

  describe("in Portuguese (isLanguagePortuguese = true)", () => {
    const alt = altText(true);

    it("returns Portuguese profile picture alt text", () => {
      expect(alt.home.profilePicture).toBe("Foto de perfil de Bianca Shiromoto");
    });

    it("returns Portuguese project image alt text with title", () => {
      expect(alt.projects.projectImage("Meu App")).toBe("Screenshot do projeto Meu App");
    });
  });
});
