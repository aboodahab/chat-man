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
    return;
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
  let r = localStorage.getItem("r");

  if (r) {
    window.location = "/chat/index.html";
  }
}
window.onload = checkAndTake();

a.addEventListener("click", () => {
  window.location = "/accounts/login.index.html";
});
