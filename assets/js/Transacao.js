export class Transacao {
  constructor(valor = 0, descricao = "", data = Date.now(), tipo = "entrada") {
    (this.id = Date.now()),
      (this.valor = Number(valor)),
      (this.descricao = descricao),
      (this.data = data),
      (this.tipo = tipo);
  }
}
