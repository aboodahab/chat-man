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
  });
});
