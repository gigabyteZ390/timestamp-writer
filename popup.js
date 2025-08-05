document.addEventListener("DOMContentLoaded", () => {
  const options = document.querySelectorAll(".dropdown-option");

  options.forEach(option => {
    option.addEventListener("click", () => {
      options.forEach(opt => opt.classList.remove("selected"));
      option.classList.add("selected");
    });
  });
});


/*const selectedText = option.cloneNode(true);
selectedText.querySelector(".indicator")?.remove();
console.log(selectedText.textContent.trim()); */





