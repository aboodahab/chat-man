const input = document.querySelector(".i");
const button = document.querySelector(".btn");
const messagesHome = document.querySelector(".messages-home");
const arr = [];
let time = new Date(2010, 5, 10);
function createMessages(value, p) {
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
      time = r.time;
      if (r.msg === "error") {
        console.log("errorr");
        return;
      }

      p.style.cssText =
        "margin:20px; width:auto; padding-left:12px;padding-bottom:6px; padding-top:6px; padding-right:12px;font-size:30px; background-color:blueviolet;color:white;";
    });
}
function showButton() {
  check(input.value);
}
const onClicking = () => {
  console.log(input.value.length);

  const paragraph = showMessages(input.value);
  createMessages(input.value, paragraph);
};
button.addEventListener("click", onClicking);
function check(data) {
  if (data !== "") {
    button.style.display = "flex";

    return;
  }
  button.style.display = "none";
}

function showMessages(value) {
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
  console.log(value, input.value);
  return paragraph;
}

function fetchFn() {
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
window.onload = fetchFn();

input.addEventListener("keyup", showButton);
function creativeTime(msgTime, ele, hours) {
  const OurTime = new Date();
  const msgString = `${msgTime}`;
  const ourString = `${OurTime}`;
  const re = /\d+/gi;

  let ourDay = ourString.match(re);
  let msgDay = msgString.match(re);
  if (msgTime.getHours() > 12) {
    hours = `${msgTime.getHours() - 12}:${addZero(msgTime.getMinutes())}pm`;
  }

  if (msgTime.getHours() < 12) {
    hours = `${msgTime.getHours()}:${addZero(msgTime.getMinutes())}am`;
  }
  if (msgTime.getHours() === 0) {
    hours = `12:${addZero(msgTime.getMinutes())}am`;
  }

  if (ourDay[0] > msgDay[0]) {
    ele.textContent = `${
      ourDay[0] - msgDay[0]
    } day ago ${msgTime.getFullYear()}/${
      msgTime.getMonth() + 1
    }/${msgTime.getDate()} ${hours}`;
  }
  if (ourDay[0] === msgDay[0]) {
    ele.textContent = `today ${msgTime.getFullYear()}/${
      msgTime.getMonth() + 1
    }/${msgTime.getDate()} ${hours}`;
  }
  if (OurTime.getMonth() > msgTime.getMonth()) {
    ele.textContent = `${
      OurTime.getMonth() - msgTime.getMonth()
    } month ago ${msgTime.getFullYear()}/${
      msgTime.getMonth() + 1
    }/${msgTime.getDate()} ${hours}:`;
  }
  ourDay[1], msgDay[1];
  if (ourDay[1] > msgDay[1]) {
    ele.textContent = `${
      ourDay[1] - msgDay[1]
    } year ago ${msgTime.getFullYear()}/${
      msgTime.getMonth() + 1
    }/${msgTime.getDate()} ${hours}:`;
  }
}
function addZero(minutes) {
  let min = ``;
  if (minutes < 10) {
    min = `0${minutes}`;

    return min;
  }
  return minutes;
}
// {}
// []

setInterval(() => {
  console.log("chock");
  fetch("http://localhost:2000/chocks", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ time: time }),
  })
    .then((y) => y.json())
    .then((r) => {
      console.log("choeeeck", r);
      if (r.new.length !== 0) {
        time = r.new[r.new.length - 1].time;
        console.log(time, "tome");
        let msgValue = r.new[r.new.length - 1].msgValue;
        console.log("nock");
        console.log(msgValue.length, "lengtho");
        showMessages(msgValue);
      }
    });
  return;
}, 5000);
