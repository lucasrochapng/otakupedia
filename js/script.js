//! HEADER
const hamburgerMenu = document.querySelector('.hamburger-menu');
const menuItems = document.querySelector('.menu-items');

hamburgerMenu.addEventListener('click', () => {
  menuItems.classList.toggle('active');
});


//! arrow
document.addEventListener('DOMContentLoaded', function() {
  const arrowIcons = document.querySelectorAll('.arrow');

  arrowIcons.forEach(function(arrowIcon) {
    arrowIcon.addEventListener('click', function() {
      const iconElement = arrowIcon.querySelector('i');

      if (iconElement.classList.contains('bxs-chevron-down')) {
        iconElement.classList.remove('bxs-chevron-down');
        iconElement.classList.add('bxs-chevron-up');
      } else {
        iconElement.classList.remove('bxs-chevron-up');
        iconElement.classList.add('bxs-chevron-down');
      }
    });
  });
});

//! quantia de animes/mangás
document.addEventListener('DOMContentLoaded', function() {
  const cards = document.querySelectorAll('.card');
  const quantiaElement = document.getElementById('quantia');

  // Atualiza o valor inicial
  quantiaElement.textContent = cards.length;

  // Esta parte do código é opcional e atualizará dinamicamente caso haja alterações futuras na página
  const observer = new MutationObserver(function() {
    quantiaElement.textContent = document.querySelectorAll('.card').length;
  });

  // Observa mudanças no DOM e atualiza o valor quando houver alterações nas classes "card"
  observer.observe(document.body, { subtree: true, childList: true });
});

//! ordena os cards por ano
// const cardsContainer = document.querySelector('.cards');
// const cards = Array.from(cardsContainer.children);

// cards.sort((a, b) => {
//   const yearA = parseInt(a.id);
//   const yearB = parseInt(b.id);
//     return yearA - yearB;
// });

// while (cardsContainer.firstChild) {
//     cardsContainer.removeChild(cardsContainer.firstChild);
// }

// cards.forEach(card => cardsContainer.appendChild(card));

//! filtro de pesquisa
var inputBuscar = document.getElementById('buscar');

inputBuscar.addEventListener('input', function() {
    var termoPesquisa = inputBuscar.value.toLowerCase();
    var cards = document.querySelectorAll('.cards .card');

    cards.forEach(function(card) {
        var h2Element = card.querySelector('h2');
        var nome = h2Element.textContent.toLowerCase();

        if (nome.includes(termoPesquisa)) {
            card.classList.remove('removed'); // Remove a classe de "removido"
        } else {
            card.classList.add('removed'); // Adiciona a classe de "removido"
        }
    });
});

//! atribuindo estrela as notas
function atualizarEstrelaParaTodos() {
  // Seleciona todos os elementos com a classe "ratings" dentro da div "cards"
  var cards = document.querySelectorAll('.cards .ratings');

  cards.forEach(function(card) {
      var numero = card.querySelector("#number");
      var valor = parseInt(numero.textContent);
      var estrela = card.querySelector("#star");

      if (valor === 0 || valor === 1) {
          estrela.innerHTML = "<i class='bx bx-star'></i>";
      } else if (valor === 2 || valor === 3) {
          estrela.innerHTML = "<i class='bx bxs-star-half'></i>";
      } else {
          estrela.innerHTML = "<i class='bx bxs-star'></i>";
      }
  });
}

// Observador de mutações para monitorar mudanças nos "cards"
var observer = new MutationObserver(function(mutationsList, observer) {
  mutationsList.forEach(function(mutation) {
      if (mutation.type === 'childList' && mutation.target.classList.contains('cards')) {
          atualizarEstrelaParaTodos();
      }
  });
});

// Elemento alvo (div 'cards') a ser observado
var targetNode = document.querySelector('.cards');

// Configuração do observador para observar mudanças nos filhos do elemento alvo
var config = { childList: true };

// Inicia a observação no elemento alvo com a configuração especificada
observer.observe(targetNode, config);

// Chamada inicial para atualizar as estrelas baseadas nos valores iniciais
atualizarEstrelaParaTodos();

//! ordena por ano ou por nota
// document.addEventListener('DOMContentLoaded', function() {
//   const cardsContainer = document.querySelector('.cards');
//   const cards = Array.from(cardsContainer.children);
//   let currentSorting = 'ano'; // Variável para controlar o tipo atual de ordenação

//   function ordenarPorAno() {
//       cards.sort((a, b) => {
//           const yearA = parseInt(a.id);
//           const yearB = parseInt(b.id);
//           return yearA - yearB;
//       });

//       atualizarCards();
//   }

//   function ordenarPorRating() {
//       cards.sort((a, b) => {
//           const ratingA = parseFloat(a.querySelector('#number').textContent);
//           const ratingB = parseFloat(b.querySelector('#number').textContent);
//           return ratingB - ratingA;
//       });

//       atualizarCards();
//   }

//   function atualizarCards() {
//       while (cardsContainer.firstChild) {
//           cardsContainer.removeChild(cardsContainer.firstChild);
//       }

//       cards.forEach(card => cardsContainer.appendChild(card));
//   }

//   function mostrarCardsOrdenados() {
//       if (currentSorting === 'ano') {
//           ordenarPorAno();
//       } else if (currentSorting === 'rating') {
//           ordenarPorRating();
//       }
//   }

//   // Evento de clique no ícone de filtro
//   const filtroIcon = document.querySelector('.escolher-filtro i');
//   filtroIcon.addEventListener('click', () => {
//       const opcoesFiltro = document.createElement('div');
//       opcoesFiltro.classList.add('opcoes-filtro');

//       const filtroPorAno = document.createElement('div');
//       filtroPorAno.textContent = 'Filtrar por Ano';
//       filtroPorAno.addEventListener('click', () => {
//           currentSorting = 'ano';
//           mostrarCardsOrdenados();
//           opcoesFiltro.remove();
//       });

//       const filtroPorRating = document.createElement('div');
//       filtroPorRating.textContent = 'Filtrar por Rating';
//       filtroPorRating.addEventListener('click', () => {
//           currentSorting = 'rating';
//           mostrarCardsOrdenados();
//           opcoesFiltro.remove();
//       });

//       opcoesFiltro.appendChild(filtroPorAno);
//       opcoesFiltro.appendChild(filtroPorRating);

//       const filtroAberto = document.querySelector('.opcoes-filtro');
//       if (filtroAberto) {
//           filtroAberto.remove();
//       } else {
//           filtroIcon.parentElement.appendChild(opcoesFiltro);
//       }
//   });

//   // Inicialmente, ordenar os cards por ano
//   mostrarCardsOrdenados();
// });





document.addEventListener('DOMContentLoaded', function() {
  const cardsContainer = document.querySelector('.cards');
  const cards = Array.from(cardsContainer.children);
  let currentSorting = 'ano'; // Variável para controlar o tipo atual de ordenação

  function ordenarPorAno() {
    cards.sort((a, b) => {
      const yearA = parseInt(a.id);
      const yearB = parseInt(b.id);
      return yearA - yearB;
    });
    
    atualizarCards();
  }

  function ordenarPorRating() {
    cards.sort((a, b) => {
      const ratingA = parseFloat(a.querySelector('#number').textContent);
      const ratingB = parseFloat(b.querySelector('#number').textContent);
      return ratingB - ratingA;
    });
      
    atualizarCards();
  }

  function atualizarCards() {
    while (cardsContainer.firstChild) {
      cardsContainer.removeChild(cardsContainer.firstChild);
    }
    
    cards.forEach(card => cardsContainer.appendChild(card));
  }

  function mostrarCardsOrdenados() {
    if (currentSorting === 'ano') {
      ordenarPorAno();
    } else if (currentSorting === 'rating') {
      ordenarPorRating();
    }
  }

  function limparSelecaoFiltros() {
    const filtros = document.querySelectorAll('.opcao-filtro');
    filtros.forEach(filtro => {
        filtro.classList.remove('filtro-selecionado');
    });
  }

  // Ícones
  const iconAno = document.createElement('i');
  iconAno.classList.add('bx', 'bxs-calendar');

  const iconRating = document.createElement('i');
  iconRating.classList.add('bx', 'bxs-star');


  // Criando a janela modal
  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.style.display = 'none'; // Inicialmente, a janela modal estará oculta

  

  //const opcaoAno = document.createElement('div');
  //opcaoAno.textContent = 'Filtrar por ano';
  //opcaoAno.addEventListener('click', () => {
  //    currentSorting = 'ano';
  //    mostrarCardsOrdenados();
  //    modal.style.display = 'none'; // Esconde a janela modal após selecionar uma opção
  //});
  const opcaoAno = document.createElement('div');
  opcaoAno.classList.add('opcao-filtro');
  opcaoAno.appendChild(iconAno); // Adiciona o ícone ao lado da frase
  opcaoAno.innerHTML += 'mais antigo';
  opcaoAno.classList.add('filtro-selecionado'); //! se der erro no filtro, remover essa linha
  opcaoAno.addEventListener('click', () => {
    currentSorting = 'ano';
    mostrarCardsOrdenados();
    modal.style.display = 'none'; // Esconde a janela modal após selecionar uma opção
    limparSelecaoFiltros();
    opcaoAno.classList.add('filtro-selecionado');
  });

  //const opcaoRating = document.createElement('div');
  //opcaoRating.textContent = 'Filtrar por nota';
  //opcaoRating.addEventListener('click', () => {
  //    currentSorting = 'rating';
  //    mostrarCardsOrdenados();
  //    modal.style.display = 'none'; // Esconde a janela modal após selecionar uma opção
  //});
  const opcaoRating = document.createElement('div');
  opcaoRating.classList.add('opcao-filtro');
  opcaoRating.appendChild(iconRating); // Adiciona o ícone ao lado da frase
  opcaoRating.innerHTML += 'melhor avaliação';
  opcaoRating.addEventListener('click', () => {
    currentSorting = 'rating';
    mostrarCardsOrdenados();
    modal.style.display = 'none'; // Esconde a janela modal após selecionar uma opção
    limparSelecaoFiltros();
    opcaoRating.classList.add('filtro-selecionado');
  });


//   // Adicionando os ícones aos elementos de filtro
// opcaoAno.insertAdjacentElement('afterbegin', iconAno); // Adiciona o ícone antes do texto
// opcaoRating.insertAdjacentElement('afterbegin', iconRating); 


  modal.appendChild(opcaoAno);
  modal.appendChild(opcaoRating);

  // Adicionando a janela modal ao final do body
  document.body.appendChild(modal);

  // Evento de clique no ícone de filtro
  const filtroIcon = document.querySelector('.escolher-filtro i');
  let modalVisivel = false; // Variável para controlar o estado da janela modal

  filtroIcon.addEventListener('click', () => {
      modalVisivel = !modalVisivel; // Alterna o estado da janela modal
      modal.style.display = modalVisivel ? 'block' : 'none'; // Exibe ou oculta a janela modal
  });

  // Inicialmente, ordenar os cards por ano
  mostrarCardsOrdenados();
});

//! status do anime

function atualizarStatus() {
  const statusText = document.getElementById('status-text').textContent.trim().toLowerCase();
  const statusIcon = document.getElementById('status-icon');

  if (statusText === 'completo') {
      statusIcon.style.color = 'rgb(17, 206, 17)';
  } else if (statusText === 'lançando') {
      statusIcon.style.color = 'orange';
  } else {
      statusIcon.style.color = 'red';
  }
}

// Chamando a função quando há uma mudança no texto
const inputStatusText = document.getElementById('status-text');
inputStatusText.addEventListener('input', atualizarStatus);

// Chamando a função ao iniciar a página para verificar o texto inicial
atualizarStatus();
