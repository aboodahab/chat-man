
function saveMessages(value, p,date) {
;
  fetch("http://localhost:2000/messages", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      value: value,
      string: localStorage.getItem("r"),
    }),
  })
    .then((y) => y.json())
    .then((r) => {
      console.log(date, "o");

      date = r.time;
      console.log(date, "e");
      if (r.msg === "error") {
        console.log("errorr");
        return;
      }

      p.style.cssText =
        "margin:20px; width:auto; padding-left:12px;padding-bottom:6px; padding-top:6px; padding-right:12px;font-size:30px; background-color:blueviolet;color:white;";
    });
}
export { saveMessages, };
