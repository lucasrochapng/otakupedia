//! HEADER
const hamburgerMenu = document.querySelector('.hamburger-menu');
const menuItems = document.querySelector('.menu-items');

hamburgerMenu.addEventListener('click', () => {
  menuItems.classList.toggle('active');

});


//! arrow -----------------------------------------------------------------------------------------------------------
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

// //! quantia de animes/mangás ----------------------------------------------------------------
// document.addEventListener('DOMContentLoaded', function() {
//   const cards = document.querySelectorAll('.card');
//   const quantiaElement = document.getElementById('quantia');

//   // Atualiza o valor inicial
//   quantiaElement.textContent = cards.length;

//   // Esta parte do código é opcional e atualizará dinamicamente caso haja alterações futuras na página
//   const observer = new MutationObserver(function() {
//     quantiaElement.textContent = document.querySelectorAll('.card').length;
//   });

//   // Observa mudanças no DOM e atualiza o valor quando houver alterações nas classes "card"
//   observer.observe(document.body, { subtree: true, childList: true });
// });

//! filtro de pesquisa ----------------------------------------------------------------------------------------------
// var inputBuscar = document.getElementById('buscar');

// inputBuscar.addEventListener('input', function() {
//     var termoPesquisa = inputBuscar.value.toLowerCase();
//     var cards = document.querySelectorAll('.cards .card');

//     cards.forEach(function(card) {
//         var h2Element = card.querySelector('h2');
//         var nome = h2Element.textContent.toLowerCase();

//         if (nome.includes(termoPesquisa)) {
//             card.classList.remove('removed'); // Remove a classe de "removido"
//         } else {
//             card.classList.add('removed'); // Adiciona a classe de "removido"
//         }
//     });
// });
//!---


// var inputBuscar = document.getElementById('buscar');

// inputBuscar.addEventListener('input', function() {
//     var termoPesquisa = inputBuscar.value.toLowerCase().trim();
//     var cardsContainer = document.querySelector('.cards');
//     var cards = cardsContainer.querySelectorAll('.card');

//     cards.forEach(function(card) {
//         var h2Element = card.querySelector('h2');
//         var nome = h2Element.textContent.toLowerCase();

//         if (termoPesquisa === '') {
//           card.style.display = 'block';
//         }
//         else if (nome.includes(termoPesquisa) || termoPesquisa === '' && card.style.display === 'block') {
//             card.style.display = 'block'; // Mostra o card se corresponder ao termo de pesquisa
            
//         } 
//         else {
//             card.style.display = 'none'; // Oculta o card se não corresponder ao termo de pesquisa
//         }
//     });
// });







//! atribuindo estrela as notas ------------------------------------------------------------------------------------
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

//! ordenação dos cards --------------------------------------------------------------------------------------------

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

  function ordenarPorNome() {
    cards.sort((a, b) => {
      const titleA = a.querySelector('h2').textContent.toLowerCase();
      const titleB = b.querySelector('h2').textContent.toLowerCase();
      return titleA.localeCompare(titleB);
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
    } else if (currentSorting === 'nome') {
      ordenarPorNome();
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
  iconRating.classList.add('bx', 'bxs-trophy');

  const iconNome = document.createElement('i');
  iconNome.classList.add('bx', 'bx-sort-a-z');

  // const iconInteresse = document.createElement('i');
  // iconInteresse.classList.add('bx', 'bxs-heart');

  // const iconAcompanhando = document.createElement('i');
  // iconAcompanhando.classList.add('bx', 'bx-list-check');

  // Criando a janela modal
  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.style.display = 'none'; // Inicialmente, a janela modal estará oculta

  const opcaoAno = document.createElement('div');
  opcaoAno.classList.add('opcao-filtro');
  opcaoAno.appendChild(iconAno); // Adiciona o ícone ao lado da frase
  opcaoAno.innerHTML += 'mais antigo';
  //opcaoAno.classList.add('filtro-selecionado'); //! se der erro no filtro, remover essa linha
  opcaoAno.addEventListener('click', () => {
    currentSorting = 'ano';
    mostrarCardsOrdenados();
    modal.style.display = 'none'; // Esconde a janela modal após selecionar uma opção
    limparSelecaoFiltros();
    opcaoAno.classList.add('filtro-selecionado');

    // Restaura a classe do ícone do filtro ao selecionar uma opção na modal
    filtroIcon.classList.remove('bxs-up-arrow');
    filtroIcon.classList.add('bxs-filter');
    escolherFiltro.style.backgroundColor = '';
  });

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

    // Restaura a classe do ícone do filtro ao selecionar uma opção na modal
    filtroIcon.classList.remove('bxs-up-arrow');
    filtroIcon.classList.add('bxs-filter');
    escolherFiltro.style.backgroundColor = '';
  });

  const opcaoNome = document.createElement('div');
  opcaoNome.classList.add('opcao-filtro');
  opcaoNome.appendChild(iconNome); // Adiciona o ícone ao lado da frase
  opcaoNome.innerHTML += 'ordem alfabética';
  opcaoNome.addEventListener('click', () => {
    currentSorting = 'nome';
    mostrarCardsOrdenados();
    modal.style.display = 'none'; // Esconde a janela modal após selecionar uma opção
    limparSelecaoFiltros();
    opcaoNome.classList.add('filtro-selecionado');

    // Restaura a classe do ícone do filtro ao selecionar uma opção na modal
    filtroIcon.classList.remove('bxs-up-arrow');
    filtroIcon.classList.add('bxs-filter');
    escolherFiltro.style.backgroundColor = '';
  });

  // const opcaoInteresse = document.createElement('div');
  // opcaoInteresse.classList.add('opcao-filtro');
  // opcaoInteresse.appendChild(iconInteresse);
  // opcaoInteresse.innerHTML += 'interesses';
  // opcaoInteresse.addEventListener('click', () => {
  //   const interesseCards = cards.filter(card => {
  //     const statusText = card.querySelector('#status-text').textContent;
  //     return statusText === 'Interesse';
  //   });

  //   modal.style.display = 'none';
  //   limparSelecaoFiltros();
  //   opcaoInteresse.classList.add('filtro-selecionado');
  //   atualizarCardsFiltrados(interesseCards);

  //   // Restaura a classe do ícone do filtro ao selecionar uma opção na modal
  //   filtroIcon.classList.remove('bxs-up-arrow');
  //   filtroIcon.classList.add('bxs-filter');
  //   escolherFiltro.style.backgroundColor = '';
  // });

  // const opcaoAcompanhando = document.createElement('div');
  // opcaoAcompanhando.classList.add('opcao-filtro');
  // opcaoAcompanhando.appendChild(iconAcompanhando);
  // opcaoAcompanhando.innerHTML += 'acompanhando';
  // opcaoAcompanhando.addEventListener('click', () => {
  //     const acompanhandoCards = cards.filter(card => {
  //         const statusText = card.querySelector('#status-text').textContent;
  //         return statusText === 'Acompanhando';
  //     });
  
  //     modal.style.display = 'none';
  //     limparSelecaoFiltros();
  //     opcaoAcompanhando.classList.add('filtro-selecionado');
  //     atualizarCardsFiltrados(acompanhandoCards);

  //     // Restaura a classe do ícone do filtro ao selecionar uma opção na modal
  //     filtroIcon.classList.remove('bxs-up-arrow');
  //     filtroIcon.classList.add('bxs-filter');
  //     escolherFiltro.style.backgroundColor = '';
  // });

  opcaoAno.classList.add('filtro-selecionado'); //! se der b.o, remover essa linha

  modal.appendChild(opcaoAno);
  modal.appendChild(opcaoRating);
  modal.appendChild(opcaoNome);
  // modal.appendChild(opcaoInteresse);
  // modal.appendChild(opcaoAcompanhando);

  // Função para atualizar os cards exibidos com base no filtro aplicado
  // function atualizarCardsFiltrados(filteredCards) {
  //   while (cardsContainer.firstChild) {
  //       cardsContainer.removeChild(cardsContainer.firstChild);
  //   }
  
  //   filteredCards.forEach(card => cardsContainer.appendChild(card));
  // }

  // Adicionando a janela modal ao final do body
  document.body.appendChild(modal);

  // Selecionando a div escolher-filtro
  const escolherFiltro = document.querySelector('.escolher-filtro');

  // Evento de clique no ícone de filtro
  const filtroIcon = document.getElementById('setaFiltro');
  let modalVisivel = false; // Variável para controlar o estado da janela modal

  filtroIcon.addEventListener('click', () => {
    modalVisivel = !modalVisivel; // Alterna o estado da janela modal
    modal.style.display = modalVisivel ? 'block' : 'none'; // Exibe ou oculta a janela modal
    
    // Alterna a classe do ícone do filtro
    filtroIcon.classList.toggle('bxs-filter');
    filtroIcon.classList.toggle('bxs-up-arrow');

    if (!modalVisivel) {
      // Fecha a modal e restaura a classe do ícone quando se clica fora do filtro
      modal.style.display = 'none';
      filtroIcon.classList.remove('bxs-up-arrow');
      filtroIcon.classList.add('bxs-filter');
      escolherFiltro.style.backgroundColor = 'transparent'; // Remove o background de sombra
    } else {
      // Adiciona o background de sombra ao abrir a modal
      escolherFiltro.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
    }
  });

  // Evento para fechar a modal se clicar fora dela
  document.addEventListener('click', function(event) {
    if (event.target !== modal && !modal.contains(event.target) && event.target !== filtroIcon) {
      modal.style.display = 'none'; // Fecha a modal se o clique for fora dela
      modalVisivel = false; // Atualiza o estado da modal
      
      // Restaura a classe do ícone quando se clica fora da modal
      filtroIcon.classList.remove('bxs-up-arrow');
      filtroIcon.classList.add('bxs-filter');
      escolherFiltro.style.backgroundColor = 'transparent'; // Remove o background de sombra
    }
  });

  // Inicialmente, ordenar os cards por ano
  mostrarCardsOrdenados();
});




//! definindo a cor do status do anime ----------------------------------------------------------------------------

function atualizarStatus() {
  const cards = document.querySelectorAll('.card'); // Selecionando todas as divs com a classe 'card'

  cards.forEach(card => {
    const statusText = card.querySelector('#status-text').textContent.trim().toLowerCase();
    const statusIcon = card.querySelector('#status-icon');

    switch (statusText) {
      case 'completo':
        statusIcon.style.color = 'rgb(17, 206, 17)';
        break;
      case 'incompleto':
        statusIcon.style.color = 'orange';
        break;
      case 'cancelado':
        statusIcon.style.color = 'red';
        break;
      case 'interesse':
        statusIcon.style.color = 'rgb(32, 136, 255)';
        break;
      case 'acompanhando':
        statusIcon.style.color = 'grey';
        break;
      default:
        statusIcon.style.color = 'black';
        break;
    }
  });
}


//Chamando a função ao iniciar a página para verificar o texto inicial
atualizarStatus();


//! mostrando card por status ---------------------------------------------------------------------------------------


// document.addEventListener('DOMContentLoaded', function() {
//   const cardsContainer = document.querySelector('.cards');
//   const cards = Array.from(cardsContainer.children);

//   function mostrarCardsFiltrados(status) {
//       cards.forEach(card => {
//           const statusText = card.querySelector('.descricao #status-text').textContent.trim().toLowerCase();
//           // const arrow = card.querySelector('.arrow'); // Seleciona a seta do card

//           if (status === 'todos' || statusText === status.toLowerCase()) {
//               // card.style.display = 'block';
//               card.classList.remove('.removed');
//               // arrow.style.display = 'block'; // Exibe a seta se o card estiver visível
//           } else {
//               // card.style.display = 'none';
//               card.classList.add('.removed');
//               // arrow.style.display = 'none'; // Oculta a seta se o card estiver oculto
//           }
//       });
//   }

//   const statusItems = document.querySelectorAll('.lista-status li');

//   statusItems.forEach(item => {
//       item.addEventListener('click', function() {
//           const status = this.textContent.toLowerCase();
//           mostrarCardsFiltrados(status);
//       });
//   });

//   mostrarCardsFiltrados('todos');
// });

document.addEventListener('DOMContentLoaded', function() {
  const cardsContainer = document.querySelector('.cards');
  const cards = Array.from(cardsContainer.children);
  const inputBuscar = document.getElementById('buscar');
  const statusItems = document.querySelectorAll('.lista-status li');

  function mostrarCardsFiltrados() {
    cards.forEach(card => {
      const statusText = card.querySelector('.descricao #status-text').textContent.trim().toLowerCase();
      const h2Element = card.querySelector('h2');
      const nome = h2Element.textContent.toLowerCase();
      const termoPesquisa = inputBuscar.value.toLowerCase().trim();
      const status = getStatusSelecionado();

      const statusMatch = status === 'todos' || statusText === status.toLowerCase();
      const termoMatch = termoPesquisa === '' || nome.includes(termoPesquisa);

      if (statusMatch && termoMatch) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  }

  statusItems.forEach(item => {
    item.addEventListener('click', function() {
      mostrarCardsFiltrados();
    });
  });

  inputBuscar.addEventListener('input', function() {
    mostrarCardsFiltrados();
  });

  function getStatusSelecionado() {
    let statusSelecionado = 'todos';
    statusItems.forEach(item => {
      if (item.classList.contains('selecionado')) {
        statusSelecionado = item.textContent.toLowerCase();
      }
    });
    return statusSelecionado;
  }

  mostrarCardsFiltrados(); // Mostrar todos os cards ao carregar a página
});



//! atualizando a quantia de animes sendo exibidas ---------------------------------------------------------------

document.addEventListener('DOMContentLoaded', function() {
  const cardsContainer = document.querySelector('.cards');
  const cards = Array.from(cardsContainer.children);
  const quantiaElement = document.getElementById('quantia');

  function countVisibleCards() {
    let count = 0;

    cards.forEach(card => {
      const style = getComputedStyle(card);
      if (style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0') {
        count++;
      }
    });

    return count;
  }

  function updateVisibleCardCount() {
    const visibleCount = countVisibleCards();
    quantiaElement.textContent = visibleCount;
  }

  // Atualiza a quantidade de cards visíveis inicialmente
  updateVisibleCardCount();

  const statusItems = document.querySelectorAll('.lista-status li');

  statusItems.forEach(item => {
    item.addEventListener('click', function() {
      const status = this.textContent.toLowerCase();

      cards.forEach(card => {
        const statusText = card.querySelector('.descricao #status-text').textContent.trim().toLowerCase();
        const arrow = card.querySelector('.arrow');

        if (status === 'todos' || statusText === status) {
          card.style.display = 'block';
          arrow.style.display = 'block';
        } else {
          card.style.display = 'none';
          arrow.style.display = 'none';
        }
      });

      updateVisibleCardCount(); // Atualiza a quantidade de cards visíveis após a filtragem
    });
  });

  // Ao iniciar, mostra todos os cards e atualiza a quantidade inicial
  cards.forEach(card => {
    card.style.display = 'block';
    const arrow = card.querySelector('.arrow');
    arrow.style.display = 'block';
  });
});


//! controla a linha de seleção dos cards -----------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', function() {
  const statusItems = document.querySelectorAll('.lista-status li');
  const linhaSelecionada = document.querySelector('.linha-selecionada');

  statusItems.forEach(item => {
    item.addEventListener('click', function() {
      statusItems.forEach(item => {
        item.classList.remove('selecionado');
      });

      this.classList.add('selecionado');
      const width = this.clientWidth;
      const left = this.offsetLeft;
      
      linhaSelecionada.style.width = `${width}px`;
      linhaSelecionada.style.left = `${left}px`;
    });
  });

  // Posiciona a linha na li 'todos' inicialmente
  const todos = document.getElementById('status-todos');
  const initialWidth = todos.clientWidth;
  const initialLeft = todos.offsetLeft;
  linhaSelecionada.style.width = `${initialWidth}px`;
  linhaSelecionada.style.left = `${initialLeft}px`;
});


//! notificação ------------------------------------------

document.addEventListener('DOMContentLoaded', function () {
  // Seleciona a notificação e o botão
  const notificacao = document.querySelector('.notificacao');
  const exibirNotificacaoBtn = document.getElementById('exibirNotificacaoBtn');

  // Adiciona um ouvinte de eventos para o clique no botão
  exibirNotificacaoBtn.addEventListener('click', function () {
      // Adiciona a classe notificacao-ativa à notificação
      notificacao.classList.add('notificacao-ativa');
  });

  // Adiciona um ouvinte de eventos para o botão "Não"
  const botaoNao = document.getElementById('button-nao');
  botaoNao.addEventListener('click', function (event) {
      // Impede a propagação do evento para a notificação e o documento
      event.stopPropagation();
      // Remove a classe notificacao-ativa da notificação
      notificacao.classList.remove('notificacao-ativa');
  });

  // Adiciona um ouvinte de eventos para o botão "Contate-nos"
  const botaoContate = document.getElementById('button-contate');
  botaoContate.addEventListener('click', function (event) {
      // Impede a propagação do evento para a notificação e o documento
      event.stopPropagation();
      // Redireciona para o arquivo HTML de contato
      window.location.href = 'caminho/para/arquivo-de-contato.html';
  });

  // Adiciona um ouvinte de eventos para fechar a notificação se clicar fora dela
  document.addEventListener('click', function (event) {
      if (!notificacao.contains(event.target) && event.target !== exibirNotificacaoBtn) {
          // Remove a classe notificacao-ativa da notificação
          notificacao.classList.remove('notificacao-ativa');
      }
  });
});
