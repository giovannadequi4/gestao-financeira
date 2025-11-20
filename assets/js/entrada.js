export class GerenciadorEntradas {
  constructor() {
    this.entradas = JSON.parse(localStorage.getItem("entradas")) || [];
  }

  salvarEntradas() {
    localStorage.setItem("entradas", JSON.stringify(this.entradas));
  }

  adicionarEntrada(entrada) {
    this.entradas.push(entrada);
    this.salvarEntradas();
  }
}
