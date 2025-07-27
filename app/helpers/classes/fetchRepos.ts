import Information from "./Information";

const information = new Information();

export interface Repository {
	id: number;
	name: string;
	description: string;
	html_url: string;
	homepage: string;
	language: string;
	topics: string[];
}

const filterRepos = (repos: Repository[]): Repository[] => {
	return repos.filter(repo => !!repo.homepage && repo.homepage !== "http://biancashiromoto.github.io/" && repo.topics.includes("display"));
};

export const fetchRepos = async (): Promise<Repository[]> => {
	const response = await fetch(information._githubApiLink);
	if (!response.ok) {
		throw new Error("Failed to fetch repositories");
	}

	const data = await response.json();

	return filterRepos(data);
};
