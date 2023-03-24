const menuEl = document.querySelector(".menu");
const burgerBtn = document.querySelector(".burger");
const closeBtn = document.querySelector(".menu__close");

burgerBtn.addEventListener("click", function (e) {
  e.preventDefault();
  menuEl.classList.toggle("right-0");
});

closeBtn.addEventListener("click", function (e) {
  e.preventDefault();
  menuEl.classList.remove("right-0");
});

document.body.addEventListener("click", function (e) {
  e.preventDefault();
  if (
    !e.target.classList.contains("menu") &&
    !e.target.closest(".menu") &&
    !e.target.classList.contains("burger") &&
    !e.target.closest(".burger")
  ) {
    menuEl.classList.remove("right-0");
  }
});
