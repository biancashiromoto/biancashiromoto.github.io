export default class Information {
	public _profilePictureURL: string =
		"https://avatars.githubusercontent.com/u/108292121?v=4";
	public _linkedinLink: string = "https://www.linkedin.com/in/bshiromoto/";
	public _githubLink: string = "https://github.com/biancashiromoto";
	public _githubUsername: string = "biancashiromoto";
	public _email: string = "b.shiromoto.bs@gmail.com";
	public _githubApiLink: string = `https://api.github.com/users/${this._githubUsername}/repos`;
	public _resumeLink: string =
		"https://drive.google.com/drive/folders/19pl7eV91_RF0g679ZTmB1W28aEshIJCO?usp=sharing";
	public _name: string = "Bianca";
	public _gitHubTooltip: string = "GitHub";
	public _linkedinTooltip: string = "LinkedIn";
	public _translateButtonLabel: string;
	public _profilePictureAltText: string;
	public _greetingMessage: string[];
	public _aboutMeText: string[];
	public _inProgress: string;
	public _emailTooltip: string;
	public _projects: string;
	public _returnToPreviousPageTooltip: string;
	public _resumeTooltip: string;
	public _catGifAltText: string;
	public _checkMyProjects: string;
	public _downloadMyCV: string;
	public _scrollToTopButtonLabel: string;

	constructor(language: string = "en") {
		this._profilePictureAltText =
			language === "en"
				? "I am a woman with dark brown eyes and hair and I am wearing a black and gray T-shirt."
				: "Sou uma mulher de cabelos e olhos escuros e estou usando uma camiseta cinza e preta.";
		this._greetingMessage =
			language === "en"
				? ["Hello!", "My name is", ` ${this._name}`, "and this is my portfolio!"]
				: ["Olá!", "Meu nome é", ` ${this._name}`, "e esse é meu portfolio!"];
		this._aboutMeText =
			language === "en"
				? [
					"Developer coming from a career transition in veterinary medicine, I worked for seven years as an anesthetist and intensivist before venturing into the world of technology.",
					"My goal is to combine  my passion for problem-solving with creating solutions that have a positive and universal impact on people's lives.",
				]
				: [
					"Desenvolvedora vinda de uma transição de carreira da medicina veterinária, atuei durante sete anos como anestesista e intensivista antes de me aventurar pelo mundo da tecnologia.",
					"Procuro combinar minha paixão por soluções de problemas com a criação de algo que impacte positivamente na vida das pessoas de uma forma universal e acessível.",
				];
		this._translateButtonLabel =
			language === "en" ? "Traduzir para o português" : "Translate to English";
		this._inProgress = language === "en" ? "In progress..." : "Em construção";
		this._emailTooltip = language === "en" ? "Email me!" : "Me envie um email!";
		this._projects = language === "en" ? "Projects" : "Projetos";
		this._returnToPreviousPageTooltip = language == "en" ? "Back" : "Voltar";
		this._catGifAltText =
			language === "en"
				? "Gif of a cat typing on a laptop"
				: "Gif de um gato digitando em um laptop";
		this._resumeTooltip =
			language === "en" ? "Download my resume" : "Baixe meu currículo";
		this._checkMyProjects =
			language === "en" ? "Check my projects" : "Veja meus projetos";
		this._downloadMyCV =
			language === "en" ? "Download my CV" : "Baixe meu currículo";
		this._scrollToTopButtonLabel = language === "en" ? "Scroll to top" : "Voltar ao topo";
	}
}
