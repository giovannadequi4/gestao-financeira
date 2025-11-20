import { GerenciadorEntradas } from "./entrada.js"
import { GerenciadorSaidas } from "./saida.js"

const entradas = new GerenciadorEntradas();
const saidas = new GerenciadorSaidas();

console.log(entradas.entradas);
console.log(saidas.saidas)