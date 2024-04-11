const galeria = document.querySelector(".gallery")
const form = document.querySelector('form')
let inputs = document.querySelectorAll(".form-control")

window.addEventListener("load", carregarProdutos)

async function carregarProdutos() {
    const response = await fetch("http://localhost:3000/produtos/")
    const produtos = await response.json()

    mostrarProdutos(produtos)
}

function mostrarProdutos(produtos) {
    produtos.forEach(produto => {
        galeria.innerHTML += `
        <div class="card">
            <img src="${produto.img}" height="200" style="object-fit: cover;" class="card-img-top" alt="${produto.nome}">
            <div class="card-body">
                <h5 class="card-title">${produto.nome}</h5>
                <p class="card-text">${formatarMoeda(produto.preco)}</p>
                <button type="button" class="btn btn-outline-danger w-100" onclick="deletarProduto('${produto.id}')">Excluir</button>
            </div>
        </div>`
    })
}

function formatarMoeda(valor) {
    return valor.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
}


form.addEventListener("submit", function(event){
    event.preventDefault()
    criaProduto()
});


function criaProduto() {
    fetch("http://localhost:3000/produtos/", {
        method: 'POST',
        headers: {
           'Content-Type': 'application/json',
        },
        body: JSON.stringify({
           'nome': inputs[0].value,
           'preco': parseFloat(inputs[1].value),
           'img': inputs[2].value
        })
    })
}


document.getElementById("clear").addEventListener("click", () => inputs.forEach(input => input.value = ""))

async function deletarProduto(id) {
    await fetch("http://localhost:3000/produtos/" + id, {
        method: 'DELETE'
    })
}

let preco = document.getElementById('preco')

function addProduct() {
    inputs[0].value = ['Lorem', 'Ipsum'][Math.floor(Math.random() * 2)]
    inputs[1].value = Math.floor(Math.random() * 1000)
    inputs[2].value = ['https://images.unsplash.com/photo-1621342261924-3e2f6c9603f5?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'https://images.unsplash.com/photo-1598214886806-c87b84b7078b?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'][Math.floor(Math.random() * 2)]

    criaProduto()
}