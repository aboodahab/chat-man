
import { createMessages,} from "./createMessages.js";

import { GET_MESSAGES} from "./variables.js";
const arr = [];
function getMessages() {
  console.log("realod");
  let r = localStorage.getItem("r");
  if (r) {
    fetch(GET_MESSAGES, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        string: localStorage.getItem("r"),
      }),
    })
      .then((y) => y.json())
      .then((r) => {
        for (let i = 0; i < r.messages.length; i++) {
      
          const messagesHome = document.querySelector(".messages-home");

          messagesHome.appendChild(
            createMessages(
              r.messages[i].msgValue,
              new Date(r.messages[i].time),
              r.messages[i].string
            )
          );
        }
        
      });
    return;
  } else {
    window.location = "/accounts/login.index.html";
  }
}
export { getMessages };
