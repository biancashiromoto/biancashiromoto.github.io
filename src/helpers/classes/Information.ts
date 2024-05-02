export default class Information {
  public _profilePictureURL: string = "https://avatars.githubusercontent.com/u/108292121?v=4";
  public _linkedinLink: string = "https://www.linkedin.com/in/bshiromoto/";
  public _githubLink: string = "https://github.com/biancashiromoto";
  public _profilePictureAltText: string;
  public _greetingMessage: string[];
  public _aboutMeText: string[];

  constructor(language: string) {
    this._profilePictureAltText = language === "en" ? "I am a woman with dark brown eyes and hair and I am wearing a black and gray T-shirt." : "Sou uma mulher de cabelos e olhos cabelos escuros e estou usando uma camiseta cinza e preta.";
    this._greetingMessage = language === "en" ? [
      "Hello",
      "My name is ",
      "Bianca",
      " and this is my portfolio!"
    ] : [
      "Olá",
      "Meu nome é ",
      "Bianca",
      " e esse é meu portfolio!"
    ];
    this._aboutMeText = language === "en" ? [
      "I am originally from São Paulo, Brazil and at the age of 17 I moved to Botucatu, SP in pursuit of my dream of becoming a Veterinarian, where I also specialized in anesthesiology at Unesp.",
      "After returning to São Paulo, I completed a post-graduate program in intensive care and, after seven years of professional experience, I made the decision to transition my career.",
      "Today, I am a full-stack developer seeking to combine my passion for problem-solving with creating something that positively impacts people's lives in an universal and accessible way."
    ] : [
      "Paulistana, aos 17 anos me mudei para Botucatu/SP atrás do sonho de ser Médica Veterinária e lá me formei e fiz residência em anestesiologia pela Unesp.",
      "De volta a São Paulo, concluí pós-graduação em terapia intensiva e, após sete anos de atuação na área, tomei a decisão de realizar uma transição de carreira.",
      "Hoje sou desenvolvedora full-stack e procuro combinar minha paixão por soluções de problemas com a criação de algo que impacte positivamente na vida das pessoas de uma forma universal e acessível."
    ];
  }
}