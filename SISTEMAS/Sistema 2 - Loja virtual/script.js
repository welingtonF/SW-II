const btnContadorCarrinho = document.getElementById('btn-carrinho');
const carrinho = document.getElementById('carrinho-lateral');
const itensCarrinho = document.getElementById('itens-carrinho');
const totalCarrinho = document.getElementById('total-carrinho');
const contadorQuantidade = document.getElementById('contador-quantidade');
const btnFinalizar = document.getElementById('btn-finalizar');

const carrossel = document.querySelector('#carrossel');
const slides = carrossel.querySelector('.slides');
const slideItems = carrossel.querySelectorAll('.slide');
const prevButton = carrossel.querySelector('.prev');
const nextButton = carrossel.querySelector('.next');

    
let carrinhoProdutos = {};

    
contadorQuantidade.style.display = 'none';

    
    function formatarPreco(valor) {
        return valor.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
}

    
    function configurarBotoesAdicionarCarrinho() {
    document.querySelectorAll('.botao-carrinho').forEach((botao, index) => {
            botao.addEventListener('click', () => {
                const produto = botao.closest('.produto');

                
                const descricao = produto.querySelector('.descricao').textContent.trim();
                const preco = parseFloat(
                    produto.querySelector('.preco').textContent
                        .trim()
                        .replace('R$', '')
                        .replace('.', '')
                        .replace(',', '.')
                );
                const img = produto.querySelector('img');
                const imgSrc = img ? img.src : '';

                
                if (carrinhoProdutos[index]) {
                    carrinhoProdutos[index].quantidade++;
                } else {
                    carrinhoProdutos[index] = {
                        descricao,
                        preco,
                        img: imgSrc,
                        quantidade: 1
                    };
                }

                
                atualizarCarrinho();
                carrinho.classList.add('aberto');
            });
        });
    }

    
function atualizarCarrinho() {
    itensCarrinho.innerHTML = '';
    let total = 0;
    let quantidadeTotal = 0;

        
    for (const id in carrinhoProdutos) {
        const item = carrinhoProdutos[id];
        const subtotal = item.preco * item.quantidade;
        total += subtotal;
        quantidadeTotal += item.quantidade;

            
        const divItem = document.createElement('div');
        divItem.classList.add('item-carrinho');
        divItem.innerHTML = `
            <img src="${item.img}" alt="${item.descricao}" />
            <div class="item-carrinho-info">
                <p class="descricao">${item.descricao}</p>
                <p class="preco">${formatarPreco(item.preco)} 
                    <span class="quantidade">${item.quantidade}</span> 
                    = ${formatarPreco(subtotal)}</p>
                <div class="quantidade-container">
                    <button class="btn-quantidade" data-id="${id}" data-acao="diminuir">-</button>
                    <span>${item.quantidade}</span>
                    <button class="btn-quantidade" data-id="${id}" data-acao="aumentar">+</button>
                </div>
             </div>
        `;
        itensCarrinho.appendChild(divItem);
    }

        
    totalCarrinho.textContent = `Total: ${formatarPreco(total)}`;
    contadorQuantidade.textContent = quantidadeTotal;
    contadorQuantidade.style.display = quantidadeTotal > 0 ? 'inline-block' : 'none';

       
    configurarBotoesQuantidade();
}

    
function configurarBotoesQuantidade() {
    document.querySelectorAll('.btn-quantidade').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            const acao = btn.getAttribute('data-acao');

            if (acao === 'aumentar') {
                carrinhoProdutos[id].quantidade++;
            } else {
                carrinhoProdutos[id].quantidade--;
                if (carrinhoProdutos[id].quantidade < 1) {
                    delete carrinhoProdutos[id];
                }
            }

                
            atualizarCarrinho();
        });
    });
}

   
function configurarBotaoAbrirFecharCarrinho() {
        btnContadorCarrinho.addEventListener('click', () => {
            carrinho.classList.toggle('aberto');
        });
}

   
function configurarBotaoFinalizarCompra() {
        btnFinalizar.addEventListener('click', () => {
            window.location.href = 'finalizar.html';
        });
}


function inicializarCarrinho() {
        configurarBotoesAdicionarCarrinho();
        configurarBotaoAbrirFecharCarrinho();
        configurarBotaoFinalizarCompra();
}


inicializarCarrinho();


let currentIndex = 0;

function updateCarrossel() {
    const offset = -currentIndex * 100;
    slides.style.transform = `translateX(${offset}%)`;
}

prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : slideItems.length - 1;
    updateCarrossel();
});

nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex < slideItems.length - 1) ? currentIndex + 1 : 0;
    updateCarrossel();
});;
