import { GerenciadorTransacoes } from "../model/GerenciadorTransacoes.js";
import { Transacao } from "../model/Transacao.js";

const gerenciadorTransacoes = new GerenciadorTransacoes();
const form = document.getElementById('form-entrada');

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const valor = document.getElementById('valor').value;
    const descricao = document.getElementById('descricao').value;
    const data = document.getElementById('data').value;

    const novaEntrada = new Transacao(valor, descricao, data, "entrada")

    gerenciadorTransacoes.adicionar(novaEntrada);
    form.reset();
    alert("Entrada registrada!");
});