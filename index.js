const URL = "https://api.adviceslip.com/advice";

function getAdvice(method, url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.onreadystatechange = function () {
      if (this.readyState === 4) {
        if (this.status >= 200 && this.status < 300) {
          resolve(JSON.parse(this.responseText));
        } else {
          reject("Request failed with status " + this.status);
        }
      }
    };
    xhr.send();
  });
}

async function displayAdvice() {
  const { slip } = await getAdvice("GET", URL);
  document.getElementById("adviceId").textContent = `Advice #${slip.id}`;
  document.getElementById(
    "adviceText"
  ).outerHTML = `<p id="adviceText">&ldquo;${slip.advice}&rdquo;</p>`;
}

document.addEventListener("DOMContentLoaded", displayAdvice);
document
  .querySelector(".dice-icon-container")
  .addEventListener("click", displayAdvice);
