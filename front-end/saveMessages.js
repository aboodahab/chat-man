import { SAVE_MESSAGE } from "./variables.js";
function saveMessage(value, p, date) {
  return fetch(SAVE_MESSAGE, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      value: value,
      string: localStorage.getItem("r"),
    }),
  })
    .then((y) => y.json())
    .then((r) => {
      
      date = r.time;

      if (r.msg === "error") {
        console.log("errorr");
        return;
      }

      p.style.cssText =
        "margin:20px; width:auto; padding-left:12px;padding-bottom:6px; padding-top:6px; padding-right:12px;font-size:30px; background-color:blueviolet;color:white;";

      return date;
    });
}
export { saveMessage };
