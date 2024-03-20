const input = document.querySelector(".i");
const button = document.querySelector(".btn");
const messagesHome = document.querySelector(".messages-home");
function createAndShowMessage() {
  const messageDiv = document.createElement("div");
  const paragraph = document.createElement("p");
  messageDiv.style.cssText =
    "width:auto;display:flex;justify-content:end; padding:4px; background-color:orange;color:black;";
  paragraph.textContent = input.value;
  messageDiv.appendChild(paragraph);
  messagesHome.prepend(messageDiv);
}
button.addEventListener("click", createAndShowMessage);
// p
//{}
