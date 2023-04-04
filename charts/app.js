const TITLE = "Charts Watchlist";
const DEFAULT_TAB = "view"; // either add or view

//* apply titles
let titles = document.querySelectorAll('[data-element="title"]');
titles.forEach((element) => {
  element.textContent = TITLE;
});

//* tabs
let tab_trigger = document.querySelectorAll('[data-element="tab_trigger"]');
// get targets
let targets = [];
tab_trigger.forEach((trigger) => {
  targets.push(
    document.querySelector(
      `[data-view="${trigger.getAttribute("data-target")}"]`
    )
  );
});
// apply tab logic
tab_trigger.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    targets.forEach((target) => {
      target.style.display = "none";
    });

    // set new active tab
    document.querySelector(
      `[data-view="${trigger.getAttribute("data-target")}"]`
    ).style.display = "block";
  });
});
// show default tab
targets.forEach((target) => {
  if (target.getAttribute("data-view") !== DEFAULT_TAB)
    target.style.display = "none";
});

//* nudge php script
let form = document.querySelector('[data-element="form"]');
let method = form.getAttribute("data-method"); //& tbd
let action = form.getAttribute("data-action");
let name = document.querySelector("#name");
let url = document.querySelector("#url");

document
  .querySelector('[data-element="submit"]')
  .addEventListener("click", () => {
    const obj = {
      NAME: name.value,
      URL: url.value,
    };
    JSON.stringify(obj);
    console.log(obj);

    fetch(action, {
      method: "POST",
      mode: "same-origin",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        document.querySelector(".wrapper").innerHTML = "";
        setShares();
      })
      .catch((error) => console.error(error));

    //& tbd clear inputs
  });

//* load share charts
let card = document.querySelector("template#card_share");
let shareSpace = document.querySelector(".wrapper");

async function getShares() {
  const res = await fetch("api_downloads.php");
  const shares = await res.json();
  return shares;
}

function setShares() {
  getShares().then((shares) => {
    for (const [key, value] of Object.entries(shares)) {
      let clone = card.content.cloneNode(true);
      let img = clone.querySelector("div > figure > img");
      let title = clone.querySelector("div > .card-body > h2");
      let desc = clone.querySelector("div > .card-body > p");

      img.setAttribute("src", `charts/${value[0]}`);
      img.setAttribute("alt", value[0]);
      title.textContent = value[0];
      desc.textContent = value[1];

      shareSpace.appendChild(clone);
    }
  });
}
setShares();
