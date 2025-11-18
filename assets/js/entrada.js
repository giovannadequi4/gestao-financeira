let entradas = JSON.parse(localStorage.getItem('entradas')) || [];

function salvarEntradas() {
    localStorage.setItem('entradas', JSON.stringify(entradas));
}

function adicionarEntrada(entrada) {
    entradas.push(entrada);
    salvarEntradas();
}

const form = document.getElementById('form-entrada');

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const valor = document.getElementById('valor').value;
    const descricao = document.getElementById('descricao').value;
    const data = document.getElementById('data').value;

    const novaEntrada = {
        id: Date.now(),
        valor: Number(valor),
        descricao,
        data
    };

    adicionarEntrada(novaEntrada);
    form.reset();

    alert("Entrada registrada!");
});
