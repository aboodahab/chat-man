import { creativeTime } from "../createiveTime.js";
import { messagesHome } from "./chat/java.js";
const arr = [];
function getMessagesOnload() {
  console.log("realod");
  let r = localStorage.getItem("r");
  if (r) {
    fetch("http://localhost:2000/data", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        string: localStorage.getItem("r"),
      }),
    })
      .then((y) => y.json())
      .then((r) => {
        console.log("in");

        for (let i = 0; i < r.messages.length; i++) {
          arr.push(r.messages[i]);
          const messageDiv = document.createElement("div");
          const paragraph = document.createElement("p");
          const timeParagraph = document.createElement("p");
          const msgTime = new Date(r.messages[i].time);
          let hours = 0;
          creativeTime(msgTime, timeParagraph, hours);
          timeParagraph.className = "time";
          timeParagraph.style.cssText =
            "align-items:center;display:inline-flex;";
          messageDiv.style.cssText =
            "display:flex;justify-content:center;margin:10px; padding:4px; ";
          paragraph.textContent = r.messages[i].msgValue;

          paragraph.style.cssText =
            "margin:20px;font-size: 32px; width:auto; padding-left:12px;padding-bottom:6px; padding-top:6px; padding-right:12px;font-size:26px; background-color:red;color:white;";
          if (r.messages[i].string === localStorage.getItem("r")) {
            paragraph.style.cssText =
              "margin:20px;font-size: 32px; width:auto; padding-left:12px;padding-bottom:6px; padding-top:6px; padding-right:12px;font-size:26px; background-color:blueviolet;color:white;";
          }
          messageDiv.appendChild(paragraph);
          messageDiv.appendChild(timeParagraph);
          messagesHome.appendChild(messageDiv);
        }
      });
    return;
  } else {
    window.location = "/accounts/login.index.html";
  }
}
export { getMessagesOnload };
