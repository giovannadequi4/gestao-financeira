export class Transacao {
  constructor(valor = 0, descricao = "", data = Date.now()) {
    (this.id = Date.now()),
      (this.valor = Number(valor)),
      (this.descricao = descricao),
      (this.data = data);
  }
}
