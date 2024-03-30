import { messagesHome } from "./chat/java.js";
import { addZero, creativeTime } from "./createiveTime.js";
function createMessages(value) {
  if (value === "") {
    return;
  }

  let date = new Date();
  if (value.length > 120) {
    return;
  }

  let hours = 0;
  const paragraph = document.createElement("p");
  const messageDiv = document.createElement("div");
  const timeParagraph = document.createElement("p");
  if (date.getHours() > 12) {
    hours = `${date.getHours() - 12}:${addZero(date.getMinutes())}pm`;
  }

  if (date.getHours() < 12) {
    hours = `${date.getHours()}:${addZero(date.getMinutes())}am`;
  }
  if (date.getHours() === 0) {
    hours = `12:${addZero(date.getMinutes())}am`;
  }
  timeParagraph.textContent = `today ${date.getFullYear()}/${
    date.getMonth() + 1
  }/${date.getDate()} ${hours}`;

  timeParagraph.className = "time";

  timeParagraph.style.cssText = "align-items:center;display:inline-flex;";
  messageDiv.style.cssText =
    "display:flex;justify-content:center;margin:10px; padding:4px; ";
  paragraph.textContent = value;
  paragraph.style.cssText =
    "margin:20px; width:auto; padding-left:12px;padding-bottom:6px; padding-top:6px; padding-right:12px;font-size:30px; background-color:red;color:white;";
  messageDiv.appendChild(paragraph);
  messageDiv.appendChild(timeParagraph);
  messagesHome.appendChild(messageDiv);

  return paragraph;
}
export { createMessages };
