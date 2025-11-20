export class GerenciadorSaidas {
  constructor() {
    this.saidas = JSON.parse(localStorage.getItem("saidas")) || [];
  }

  salvarSaidas() {
    localStorage.setItem("saidas", JSON.stringify(this.saidas));
  }

  adicionarSaida(saida) {
    this.saidas.push(saida);
    this.salvarSaidas();
  }
}
