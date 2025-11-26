import { GerenciadorTransacoes } from "../model/GerenciadorTransacoes.js";
import { exportTableToXLS } from './exportacao-xls.js';

const gerenciador = new GerenciadorTransacoes();
const transacoes = gerenciador.transacoes;

const selects = document.querySelectorAll(".select");
const selectSeparador = document.getElementById("selectSeparador");
const selectAgrupar = document.getElementById("selectAgrupar");
const selectOrdenar = document.getElementById("selectOrdenar");
const selectOrdem = document.getElementById("selectOrdem");

selects.forEach(sel => sel.addEventListener("change", criarTabelas));

const extrair = {
  dia:   (t) => t.data,
  mes:   (t) => t.data.substring(0, 7),
  ano:   (t) => t.data.substring(0, 4)
};

function retornarValorCorrigido(t) {
  return t.tipo === "entrada" ? t.valor : -t.valor;
}

function separar(transacoes) {  
  const criterio = selectSeparador.value;

  const resultado = new Map();
  transacoes.forEach((transacao) => {
    const chave =
      criterio === "semSeparacao" ? "" : extrair[criterio](transacao);

    if (!resultado.has(chave)) {
      resultado.set(chave, [])
    };

    resultado.get(chave).push(transacao);
  });

  return resultado;
}

function agrupar(mapSeparado) {
  const tipo = selectAgrupar.value;
  if (tipo === "semAgrupar") return mapSeparado;

  const resultado = new Map();

  mapSeparado.forEach((lista, chaveOriginal) => {
    const agrupado = new Map();

    lista.forEach((transacao) => {
      const chave = extrair[tipo](transacao);

      if (!agrupado.has(chave)) {
        const soma = lista
          .filter(x => extrair[tipo](x) === chave)
          .reduce((acc, x) => acc + retornarValorCorrigido(x), 0);

        const novaTransacao = {
          ...transacao,
          data: chave,
          descricao: `Saldo do ${tipo} ${chave}`,
          valor: Math.abs(soma),
          tipo: soma >= 0 ? "entrada" : "saida"
        };

        agrupado.set(chave, novaTransacao);
      }
    });

    resultado.set(chaveOriginal, [...agrupado.values()]);
  });

  return resultado;
}

function ordenar(mapAgrupado) {
  const tipo = selectOrdenar.value;
  const ordem = selectOrdem.value;

  const transacoes = [...mapAgrupado.entries()];

  transacoes.sort(([a], [b]) => a.localeCompare(b));
  transacoes.forEach(([_, lista]) => {
    lista.sort((a, b) => {
      if (tipo === "data") return a.data.localeCompare(b.data);
      if (tipo === "preco") return retornarValorCorrigido(a) - retornarValorCorrigido(b);
      if (tipo === "descricao") return a.descricao.localeCompare(b.descricao);
      return 0;
    });
    if (ordem === "decrescente") lista.reverse();
  });

  return new Map(transacoes);
}

function criarTabela(lista) {
  const tabela = document.createElement("table");
  tabela.classList = "table table-striped mt-3";
  tabela.setAttribute("id", "transacoes-table");
  tabela.innerHTML = `
    <thead>
      <tr>
        <th>Data</th>
        <th>Descrição</th>
        <th>Valor</th>
      </tr>
    </thead>
  `;

  const corpo = document.createElement("tbody");
  lista.forEach((transacao) => {
    const linha = document.createElement("tr");
    linha.innerHTML = `
      <td>${transacao.data}</td>
      <td>${transacao.descricao}</td>
      <td>${retornarValorCorrigido(transacao).toFixed(2)}</td>
    `;
    corpo.appendChild(linha);
  });

  const total = lista.reduce((acc, transacao) => acc + retornarValorCorrigido(transacao), 0);

  const rodape = document.createElement("tfoot");
  rodape.innerHTML = `
    <tr>
      <th colspan="2" class="text-end">Saldo Total</th>
      <td>${total.toFixed(2)}</td>
    </tr>
  `;

  tabela.appendChild(corpo);
  tabela.appendChild(rodape);

  return tabela;
}

function criarTabelas() {
  const container = document.getElementById("informacoes");
  container.innerHTML = "";

  if (transacoes.length === 0) {
    return container.innerHTML = `
      <h2 class="col text-center pt-5">
        Faça uma transação para a tabela aparecer
      </h2>`;
  }

  const separadas = separar(transacoes);
  const agrupadas = agrupar(separadas);
  const ordenadas = ordenar(agrupadas);

  ordenadas.forEach((lista, chave) => {
    const bloco = document.createElement("div");

    // container horizontal 
    const topo = document.createElement("div");
    topo.className = "d-flex justify-content-between align-items-center pt-3";

    const titulo = document.createElement("h2");
    titulo.innerText = chave || "Todas as transações";

    const areaBotoes = document.createElement("div");
    areaBotoes.className = "d-flex"; 

    // botão imprimir
    const botaoImprimir = document.createElement("button");
    botaoImprimir.className = "btn btn-primary mb-3";
    botaoImprimir.innerText = "Imprimir";
    botaoImprimir.onclick = () => window.print();

    // botão XLS
    const botaoXLS = document.createElement("button");
    botaoXLS.className = "btn btn-primary mb-3 ms-2";
    botaoXLS.innerText = "Exportar XLS";
    botaoXLS.onclick = () => exportTableToXLS("transacoes.xls");

    // botão limpar
    const botaoLimpar = document.createElement("button");
    botaoLimpar.className = "btn btn-primary mb-3 ms-2";
    botaoLimpar.innerText = "Limpar registros";
    botaoLimpar.onclick = () => {
      localStorage.clear();
      window.location.reload();
    };

    areaBotoes.appendChild(botaoImprimir);
    areaBotoes.appendChild(botaoXLS);
    areaBotoes.appendChild(botaoLimpar);

    topo.appendChild(titulo);
    topo.appendChild(areaBotoes);

    const tabela = criarTabela(lista);

    bloco.appendChild(topo);
    bloco.appendChild(tabela);
    container.appendChild(bloco);
  });

}

criarTabelas();
