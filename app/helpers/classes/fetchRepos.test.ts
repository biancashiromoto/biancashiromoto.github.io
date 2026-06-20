import { describe, it, expect, beforeEach, vi } from "vitest";
import { fetchRepos, Repository } from "./fetchRepos";

const defaultRepo: Repository = {
  id: 1,
  name: "my-project",
  description: "A cool project",
  html_url: "https://github.com/biancashiromoto/my-project",
  homepage: "https://my-project.vercel.app",
  language: "TypeScript",
  topics: ["display", "react"],
};

const repoWithoutHomepage: Repository = { ...defaultRepo, id: 2, name: "no-homepage", homepage: "" };
const repoWithoutDisplayTopic: Repository = { ...defaultRepo, id: 3, name: "no-topic", topics: ["react"]};
const portfolioRepo: Repository = { ...defaultRepo, id: 4, name: "portfolio", homepage: "http://biancashiromoto.github.io/" };

describe("fetchRepos", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("returns repos that have a homepage and the 'display' topic", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [defaultRepo],
    }));

    const repos = await fetchRepos();

    expect(repos).toHaveLength(1);
    expect(repos[0].name).toBe("my-project");
  });

  it("filters out repos without a homepage", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [repoWithoutHomepage],
    }));

    const repos = await fetchRepos();

    expect(repos).toHaveLength(0);
  });

  it("filters out repos without the 'display' topic", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [repoWithoutDisplayTopic],
    }));

    const repos = await fetchRepos();

    expect(repos).toHaveLength(0);
  });

  it("filters out the portfolio repo itself", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [portfolioRepo],
    }));

    const repos = await fetchRepos();

    expect(repos).toHaveLength(0);
  });

  it("returns multiple repos when all pass the filter", async () => {
    const secondRepo: Repository = { ...defaultRepo, id: 5, name: "another-project" };

    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [defaultRepo, secondRepo],
    }));

    const repos = await fetchRepos();

    expect(repos).toHaveLength(2);
  });

  it("returns an empty array when no repo passes the filter", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [repoWithoutHomepage, repoWithoutDisplayTopic],
    }));

    const repos = await fetchRepos();

    expect(repos).toHaveLength(0);
  });

  it("throws an error when the response is not ok", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: false,
      json: async () => [],
    }));

    await expect(fetchRepos()).rejects.toThrow("Failed to fetch repositories");
  });
});
