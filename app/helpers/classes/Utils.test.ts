import { describe, it, expect, beforeEach, vi } from "vitest";
import Utils from "@/app/helpers/classes/Utils";

describe("Utils", () => {
  let utils: Utils;

  beforeEach(() => {
    vi.restoreAllMocks();
    utils = new Utils();
  });

  describe("isLanguagePortuguese", () => {
    it("returns true when navigator.language starts with pt-", () => {
      vi.spyOn(navigator, "language", "get").mockReturnValue("pt-BR");
      expect(utils.isLanguagePortuguese()).toBe(true);
    });

    it("returns true when navigator.language is pt-PT", () => {
      vi.spyOn(navigator, "language", "get").mockReturnValue("pt-PT");
      expect(utils.isLanguagePortuguese()).toBe(true);
    });

    it("returns false when navigator.language is English", () => {
      vi.spyOn(navigator, "language", "get").mockReturnValue("en-US");
      expect(utils.isLanguagePortuguese()).toBe(false);
    });

    it("returns false when navigator.language does not include pt-", () => {
      vi.spyOn(navigator, "language", "get").mockReturnValue("fr-FR");
      expect(utils.isLanguagePortuguese()).toBe(false);
    });
  });

  describe("setLocalStorage", () => {
    it("sets a string value in localStorage as JSON", () => {
      utils.setLocalStorage("testKey", "hello");
      expect(localStorage.getItem("testKey")).toBe(JSON.stringify("hello"));
    });

    it("sets a boolean value in localStorage as JSON", () => {
      utils.setLocalStorage("boolKey", true);
      expect(localStorage.getItem("boolKey")).toBe("true");
    });

    it("sets an object value in localStorage as JSON", () => {
      const obj = { a: 1, b: "two" };
      utils.setLocalStorage("objKey", obj);
      expect(localStorage.getItem("objKey")).toBe(JSON.stringify(obj));
    });

    it("sets a null value in localStorage as JSON", () => {
      utils.setLocalStorage("nullKey", null);
      expect(localStorage.getItem("nullKey")).toBe("null");
    });
  });

  describe("getLocalStorage", () => {
    it("returns the parsed value when the key exists", () => {
      localStorage.setItem("existingKey", JSON.stringify({ x: 42 }));
      expect(utils.getLocalStorage("existingKey")).toEqual({ x: 42 });
    });

    it("returns null when the key does not exist", () => {
      expect(utils.getLocalStorage("nonExistentKey")).toBeNull();
    });

    it("returns a boolean value correctly", () => {
      localStorage.setItem("boolKey", JSON.stringify(false));
      expect(utils.getLocalStorage("boolKey")).toBe(false);
    });

    it("returns a string value correctly", () => {
      localStorage.setItem("strKey", JSON.stringify("hello"));
      expect(utils.getLocalStorage("strKey")).toBe("hello");
    });
  });

  describe("formatProjectTitle", () => {
    it("converts hyphens to spaces and capitalizes each word", () => {
      expect(utils.formatProjectTitle("my-project-name")).toBe("My Project Name");
    });

    it("lowercases letters after the first in each word", () => {
      expect(utils.formatProjectTitle("MY-PROJECT")).toBe("My Project");
    });

    it("handles a single word with no hyphens", () => {
      expect(utils.formatProjectTitle("project")).toBe("Project");
    });

    it("handles an already capitalized single word", () => {
      expect(utils.formatProjectTitle("Project")).toBe("Project");
    });

    it("handles an empty string", () => {
      expect(utils.formatProjectTitle("")).toBe("");
    });

    it("handles multiple consecutive hyphens", () => {
      expect(utils.formatProjectTitle("a--b")).toBe("A  B");
    });
  });
});
