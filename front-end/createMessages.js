import { addZero, creativeTime } from "./createiveTime.js";
import { MESSAGES_COLOR, OUR_MESSAGES_COLOR } from "./variables.js";
function checkData(data) {
  if (data === "") {
    return false;
  }

  if (data.length > 120) {
    return false;
  }
  return true;
}
const messageColor = (key, element) => {
  console.log(key, element, localStorage.getItem("r"));
  if (key === localStorage.getItem("r")) {
    element.style.cssText = `margin:20px; width:auto; padding-left:12px;padding-bottom:6px; padding-top:6px; padding-right:12px;font-size:30px; background-color:${OUR_MESSAGES_COLOR};color:white;`;
    return;
  }
  if (key !== localStorage.getItem("r")) {
    element.style.cssText = `margin:20px; width:auto; padding-left:12px;padding-bottom:6px; padding-top:6px; padding-right:12px;font-size:30px; background-color:${MESSAGES_COLOR};color:white;`;
  }
};

function createMessages(value, date, string) {
  if (!checkData(value)) {
    return;
  }

  const paragraph = document.createElement("p");
  const messageDiv = document.createElement("div");

  const timeParagraph = document.createElement("p");

  creativeTime(date, timeParagraph);
  timeParagraph.className = "time";

  timeParagraph.style.cssText = "align-items:center;display:inline-flex;";
  messageDiv.style.cssText =
    "display:flex;justify-content:center;margin:10px; padding:4px; ";
  paragraph.textContent = value;
  paragraph.style.cssText = `margin:20px; width:auto; padding-left:12px;padding-bottom:6px; padding-top:6px; padding-right:12px;font-size:30px; background-color:${MESSAGES_COLOR};color:white;`;

  messageColor(string, paragraph);
  messageDiv.appendChild(paragraph);
  messageDiv.appendChild(timeParagraph);

  return messageDiv;
}
export { createMessages };
