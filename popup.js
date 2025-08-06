document.addEventListener("DOMContentLoaded", () => {
  const options = document.querySelectorAll(".dropdown-option");
  const button = document.querySelector('.format-button');

//* Sélection d’un format au clic
  options.forEach(option => {
    option.addEventListener("click", () => {
      options.forEach(opt => opt.classList.remove("selected"));
      option.classList.add("selected");
      const selected = document.querySelector(".dropdown-option.selected");
      if (selected) console.log(selected.textContent);
    });
  });

  const patternTexts = [
    "MM/dd/yyyy HH:mm",
    "MM/dd/yyyy HH:mm:ss",
    "yyyy/MM/dd HH:mm",
    "yyyy/MM/dd HH:mm:ss",
    "MMM/dd/yyyy HH:mm",
    "MMM/dd/yyyy HH:mm:ss",
    "yyyy/MMM/dd HH:mm",
    "yyyy/MMM/dd HH:mm:ss",
    "Mm-dd-yyyy HH:mm",
    "MM-dd-yyyy HH:mm:ss",
    "yyyy-MM-dd HH:mm",
    "yyyy-MM-dd HH:mm:ss",
    "MMM-dd-yyyy HH:mm",
    "MMM-dd-yyyy HH:mm:ss",
    "yyyy-MMM-dd HH:mm",
    "yyyy-MMM-dd HH:mm:ss",
    "d MMM yyyy HH:mm",
    "d MMM yyyy HH:mm:ss"
  ];

  const previewTexts = [
    "01/22/1970 00:00",
    "01/22/1970 00:00:00",
    "1970/01/22 00:00",
    "1970/01/22 00:00:00",
    "Jan/22/1970 00:00",
    "Jan/22/1970 00:00:00",
    "1970/Jan/22 00:00",
    "1970/Jan/22 00:00:00",
    "01-22-1970 00:00",
    "01-22-1970 00:00:00",
    "1970-01-22 00:00",
    "1970-01-22 00:00:00",
    "Jan-22-1970 00:00",
    "Jan-22-1970 00:00:00",
    "1970-Jan-22 00:00",
    "1970-Jan-22 00:00:00",
    "2 Jan 1970 00:00",
    "2 Jan 1970 00:00:00"
  ];

  const patternFormat = "Pattern format";
  const previewFormat = "Preview format";
  let linkContent = true;
  let buttonContent = true;

//* permet de changer la vue entre pattern et preview
  button.addEventListener('click', () => {
    const toggleLinkContent = linkContent ? previewTexts : patternTexts;
    const toggleButtonContent = buttonContent ? patternFormat : previewFormat;
    options.forEach((a, i) => {
      if (toggleLinkContent[i] && toggleButtonContent) {
        a.textContent = toggleLinkContent[i];
      }
    });
    button.textContent = toggleButtonContent;
    buttonContent = !buttonContent;
    linkContent = !linkContent;
  });
});
