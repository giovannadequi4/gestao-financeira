import { GerenciadorEntradas } from "./entrada.js";
import { Transacao } from "./Transacao.js";

const entradas = new GerenciadorEntradas();
const form = document.getElementById('form-entrada');

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const valor = document.getElementById('valor').value;
    const descricao = document.getElementById('descricao').value;
    const data = document.getElementById('data').value;

    const novaEntrada = new Transacao(valor, descricao, data)

    entradas.adicionarEntrada(novaEntrada);
    form.reset();
    alert("Entrada registrada!");
});