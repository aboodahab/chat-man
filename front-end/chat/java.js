const input = document.querySelector(".i");
const button = document.querySelector(".btn");
const messagesHome = document.querySelector(".messages-home");
export { messagesHome };
let time = new Date();
import { saveMessages } from "../saveMessages.js";

import { createMessages } from "../createMessages.js";

import { getMessagesOnload } from "../getMessagesOnload.js";

function showButton() {
  check(input.value);
}
const onClicking = () => {
  console.log(input.value.length);

  const paragraph = createMessages(input.value);
  saveMessages(input.value, paragraph, time);
};
button.addEventListener("click", onClicking);
function check(data) {
  if (data !== "") {
    button.style.display = "flex";

    return;
  }
  button.style.display = "none";
}

window.onload = getMessagesOnload();

input.addEventListener("keyup", showButton);
function checkNewMessages() {
  fetch("http://localhost:2000/chocks", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ time: time }),
  })
    .then((y) => y.json())
    .then((r) => {
      console.log("choeeeck", r);
      if (r.new.length === 0) {
        return;
      }
      time = r.new[r.new.length - 1].time;
      console.log(time, "tome");
      let msgValue = r.new[r.new.length - 1].msgValue;
      console.log("nock");
      console.log(msgValue.length, "lengtho");
      createMessages(msgValue);
    });
}
setInterval(() => {
  console.log("chock");
  checkNewMessages();
  return;
}, 5000);
