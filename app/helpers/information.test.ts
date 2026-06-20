import { describe, it, expect } from "vitest";
import { information } from "./information";

describe("information", () => {
  describe("in English (isLanguagePortuguese = false)", () => {
    const data = information(false);

    it("returns an array of timeline entries", () => {
      expect(Array.isArray(data.home.timeline)).toBe(true);
    });

    it("returns 12 timeline entries", () => {
      expect(data.home.timeline).toHaveLength(12);
    });

    it("each entry has position, location, date and type fields", () => {
      data.home.timeline.forEach((entry) => {
        expect(entry).toHaveProperty("position");
        expect(entry).toHaveProperty("location");
        expect(entry).toHaveProperty("date");
        expect(entry).toHaveProperty("type");
      });
    });

    it("type is either 'education' or 'work' for every entry", () => {
      data.home.timeline.forEach((entry) => {
        expect(["education", "work"]).toContain(entry.type);
      });
    });

    it("returns English position for the first entry", () => {
      expect(data.home.timeline[0].position).toBe("Veterinary Medicine Degree");
    });

    it("returns English position for the last entry", () => {
      expect(data.home.timeline[11].position).toBe("Masters in Software Engineering");
    });
  });

  describe("in Portuguese (isLanguagePortuguese = true)", () => {
    const data = information(true);

    it("returns 12 timeline entries", () => {
      expect(data.home.timeline).toHaveLength(12);
    });

    it("returns Portuguese position for the first entry", () => {
      expect(data.home.timeline[0].position).toBe("Graduação em Medicina Veterinária");
    });

    it("returns Portuguese position for the last entry", () => {
      expect(data.home.timeline[11].position).toBe("MBA em Engenharia de Software");
    });
  });
});
