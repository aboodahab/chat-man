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
    arr.push("please add all the data");
    if (email.value.endsWith(".com")) {
      arr.push("add gmail email");
    }
    errorDiv.style.cssText = "display:flex;justify-content: center;";
    paragraph.textContent = `${arr.join(" and ")}`;

    setTimeout(() => {
      paragraph.textContent = ``;
    }, 3500);
    return;
  }

  fetch("http://localhost:2000/signu", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email.value, password: password.value }),
  })
    .then((y) => y.json())

    .then((r) => {
      console.log(r);
      if (r.action === "created") {
        window.localStorage.setItem(`r`, JSON.stringify(r.string));
        checkAndTake();
      }
    });
});
function checkAndTake() {
  let r = localStorage.getItem("r");

  if (r) {
    window.location = "/chat/index.html";
  } else {
    return;
  }
}
window.onload = checkAndTake();
