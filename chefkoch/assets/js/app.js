let MODE = "zutaten";

//* toggle search
let search_modal = document.querySelector(".search");
let search = [
  document.querySelector('[data-element="search"]'),
  document.querySelector('[data-element="search_close"]'),
];

search.forEach((elm) => {
  elm.addEventListener("click", () => {
    search_modal.classList.toggle("active");
  });
});

//* recipe toggle
let recipe_mode_buttons = document.querySelectorAll(
  '[data-element="recipe_mode"]'
);

recipe_mode_buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (!button.classList.contains("active")) {
      MODE = button.getAttribute("data-mode");
      recipe_mode_buttons.forEach((button) => {
        button.classList.toggle("active");
      });
    }
  });
});

//* add element to recipe
let element_input = document.querySelector('[data-element="element"]');
let zutaten = document.querySelector("ul");
let rezept = document.querySelector("ol");

element_input.addEventListener("keyup", (event) => {
  if (event.keyCode == 13) {
    let el = document.createElement("li");
    el.textContent = element_input.value;
    el.setAttribute("contenteditable", "true");

    if (MODE === "zutaten") zutaten.appendChild(el);
    if (MODE === "rezept") rezept.appendChild(el);
  }
});
