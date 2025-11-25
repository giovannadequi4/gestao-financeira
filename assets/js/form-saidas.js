import { GerenciadorTransacoes } from "./gerenciador-transacoes.js";
import { Transacao } from "./Transacao.js";

const gerenciadorTransacoes = new GerenciadorTransacoes();
const form = document.getElementById("form-saida");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const valor = document.getElementById("valor").value;
  const descricao = document.getElementById("descricao").value;
  const data = document.getElementById("data").value;

  const novaSaida = new Transacao(valor, descricao, data, "saida");

  gerenciadorTransacoes.adicionar(novaSaida);
  form.reset();
  alert("Saida registrada!");
});
