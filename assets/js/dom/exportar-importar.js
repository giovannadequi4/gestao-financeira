import { GerenciadorTransacoes } from "../model/GerenciadorTransacoes.js";

const gerenciadorTransacoes = new GerenciadorTransacoes();
const formImportar = document.getElementById("form-importar");
const ancoraExportar = document.getElementById("ancora-exportar");

formImportar.addEventListener("submit", function (e) {
  e.preventDefault();

  const campoImportar = document.getElementById("input-importar");
  const arquivo = campoImportar.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    const conteudo = e.target.result;
    gerenciadorTransacoes.transacoes = JSON.parse(conteudo);
    gerenciadorTransacoes.salvar();
  };

  reader.readAsText(arquivo);
  formImportar.reset();
  alert("Importado com sucesso!");
});

const blob = new Blob([JSON.stringify(gerenciadorTransacoes.transacoes)], {
  type: "text/plain",
});
const url = URL.createObjectURL(blob);
ancoraExportar.href = url;
ancoraExportar.download = "Dados exportados";
