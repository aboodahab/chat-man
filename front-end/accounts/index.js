const email = document.querySelector(".email");
const password = document.querySelector(".password");
const btn = document.querySelector("button");
const paragraph = document.querySelector(".p");
const errorDiv = document.querySelector(".error");
const a = document.querySelector("a");
let arr = [];
btn.addEventListener("click", (e) => {
  e.preventDefault();
  if (email.value === "" || password.value === "") {
    if (email.value.endsWith(".com")) {
      arr.push("add gmail email");
    }
    arr.push("please add all the data");
    errorDiv.style.cssText = "display:flex;justify-content: center;";
    paragraph.textContent = `${arr.join("and")}`;

    setTimeout(() => {
      paragraph.textContent = ``;
    }, 3500);
  }

  fetch("http://localhost:2000/signin", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email.value, password: password.value }),
  })
    .then((y) => y.json())
    .then((r) => {
      console.log(r);
      if (r.action === "signin") {
        localStorage.setItem(`r`, JSON.stringify(r.string));
      }
    });
});
function checkAndTake() {
  let data = "";
  if (localStorage.getItem("r") === null) {
    return;
  }
  data = localStorage.getItem("r");
  fetch("http://localhost:2000/check", {
    method: "post",
    body: JSON.stringify(data),
  })
    .then((y) => y.json())
    .then((r) => {
      console.log(r);
    });
  console.log(data);
  window.location = "http://127.0.0.1:5500/chat/index.html";
}
window.onload = checkAndTake();
