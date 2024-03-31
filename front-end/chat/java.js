const input = document.querySelector(".i");
const button = document.querySelector(".btn");
const messagesHome = document.querySelector(".messages-home");
let time = new Date();
import { saveMessage } from "../saveMessages.js";
import { SETINTERVAL_TIME, CHECK_NEW_MESSAGES } from "../variables.js";
import { createMessages } from "../createMessages.js";

import { getMessages } from "../getMessagesOnload.js";

function showButton() {
  check(input.value);
}
const onClicking = () => {
  console.log(input.value.length);

  const paragraph = createMessages(input.value, new Date(time)).querySelector(
    "p"
  );

  messagesHome.appendChild(
    createMessages(input.value, new Date(time), localStorage.getItem("r"))
  );
  saveMessage(input.value, paragraph).then((y) => (time = new Date(y)));
};
button.addEventListener("click", onClicking);
function check(data) {
  if (data !== "") {
    button.style.display = "flex";

    return;
  }
  button.style.display = "none";
}

window.onload = getMessages();

input.addEventListener("keyup", showButton);
function checkNewMessages() {
  console.log("ino");
  fetch(CHECK_NEW_MESSAGES, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ time: time }),
  })
    .then((y) => y.json())
    .then((r) => {
      if (r.new.length === 0) {
        console.log("on", "incorrect");
        return;
      }
      console.log("out", "correct");
      time = r.new[r.new.length - 1].time;

      let msgValue = r.new[r.new.length - 1].msgValue;

      messagesHome.appendChild(
        createMessages(msgValue, new Date(time), localStorage.getItem("r"))
      );
    });
}
setInterval(() => {
  console.log("you");
  checkNewMessages();
}, SETINTERVAL_TIME);
