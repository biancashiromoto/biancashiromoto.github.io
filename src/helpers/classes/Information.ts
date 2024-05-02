export default class Information {
  public _profilePictureURL: string = "https://avatars.githubusercontent.com/u/108292121?v=4";
  public _profilePictureAltText: string;
  public _greetingMessage: string[];

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
  }
}