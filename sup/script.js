function sendMessage() {
    var message = document.getElementById("message-input").value;
    var chatBox = document.getElementById("chat-box");
  
    if (message !== "") {
      var newMessage = document.createElement("p");
      var messageContent = document.createElement("span");
      var timeContent = document.createElement("span");
  
      var currentTime = getCurrentTime();
      timeContent.innerText = currentTime;
      timeContent.classList.add("message-time");
  
      messageContent.innerText = message;
      newMessage.appendChild(messageContent);
      newMessage.appendChild(timeContent);
  
      newMessage.classList.add("sent-message"); // Adicionando a classe para mensagem enviada
      chatBox.appendChild(newMessage);
      document.getElementById("message-input").value = "";
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  }
  
  function getCurrentTime() {
    var now = new Date();
    var hours = now.getHours().toString().padStart(2, '0');
    var minutes = now.getMinutes().toString().padStart(2, '0');
    return hours + ':' + minutes;
  }
  
  // Adicionando um evento de teclado ao campo de entrada
document.getElementById("message-input").addEventListener("keyup", function(event) {
  // Verifica se a tecla pressionada é "Enter" (código 13)
  if (event.keyCode === 13) {
    // Chama a função sendMessage para enviar a mensagem
    sendMessage();
  }
});
  