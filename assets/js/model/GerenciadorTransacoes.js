export class GerenciadorTransacoes {
  constructor() {
    this.transacoes = JSON.parse(localStorage.getItem("transacoes")) || [];
  }

  salvar() {
    localStorage.setItem("transacoes", JSON.stringify(this.transacoes));
  }

  adicionar(transacao) {
    this.transacoes.push(transacao);
    this.salvar();
  }

  limpar() {
    this.transacoes = [];
    this.salvar();
  }
}
