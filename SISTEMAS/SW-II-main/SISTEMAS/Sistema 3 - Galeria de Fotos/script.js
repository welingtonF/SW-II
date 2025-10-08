document.addEventListener("DOMContentLoaded", () => {
    const cartoes = document.querySelectorAll(".cartao-foto");
  
    cartoes.forEach((cartao) => {
      const botaoCurtir = cartao.querySelector(".botao-curtir");
      const contadorCurtidas = cartao.querySelector(".contador-curtidas");
      const botaoComentarios = cartao.querySelector(".botao-comentario");
      const contadorComentarios = cartao.querySelector(".contador-comentarios");
      const secaoComentarios = cartao.querySelector(".secao-comentarios");
      const entradaComentario = cartao.querySelector(".entrada-comentario");
      const botaoAdicionarComentario = cartao.querySelector(".botao-adicionar-comentario");
      const listaComentarios = cartao.querySelector(".lista-comentarios");
  
      let totalCurtidas = 0;
      let totalComentarios = 0;
  
      botaoCurtir.addEventListener("click", () => {
        totalCurtidas++;
        contadorCurtidas.textContent = totalCurtidas;
        botaoCurtir.classList.add("curtido");
        setTimeout(() => botaoCurtir.classList.remove("curtido"), 300);
      });
  
      botaoComentarios.addEventListener("click", () => {
        secaoComentarios.classList.toggle("ativa");
      });
  
      botaoAdicionarComentario.addEventListener("click", () => {
        const texto = entradaComentario.value.trim();
        if (texto) {
          const li = document.createElement("li");
          li.textContent = texto;
          listaComentarios.appendChild(li);
          entradaComentario.value = "";
          totalComentarios++;
          contadorComentarios.textContent = totalComentarios;
        }
      });
    });
  });
  