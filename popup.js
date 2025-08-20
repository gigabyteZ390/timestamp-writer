import { bindKey, bindKeyCombo } from "./libs/keystrokes.js";

let selected = null;
let formattedDate = null;

document.addEventListener("DOMContentLoaded", () => {
  const options = document.querySelectorAll(".dropdown-option");
  const formatButton = document.querySelector('.format-button');
  const writeButton = document.querySelector('.write-button');
  const storage = (typeof browser !== "undefined" ? browser : chrome).storage;

  storage.local.get("selectedIndex", data => {
  if (typeof data.selectedIndex === "number") {
    options.forEach(opt => opt.classList.remove("selected"));
    options[data.selectedIndex].classList.add("selected");
    selected = options[data.selectedIndex];
    getDate();
  }
});

//* Sélection d’un format au clic
  options.forEach((option, index) => {
    option.dataset.index = index;
    option.addEventListener("click", () => {
      options.forEach(opt => opt.classList.remove("selected"));
      option.classList.add("selected");
      selected = document.querySelector(".dropdown-option.selected");
      storage.local.set({selectedIndex : index});
      if (selected) console.log(selected.textContent);
      getDate();
    });
  });

//* Permet de copier (clipboard) la date au format choisis
  writeButton.addEventListener("click", () => {
    if (!selected) {
      swal({
        text: "Please, select a format.",
        icon: "warning",
        button: "Ok",
      });
      return;
    }
    navigator.clipboard.writeText(formattedDate);
  })

  const patternTexts = [
    "MM/dd/yyyy HH:mm",
    "MM/dd/yyyy HH:mm:ss",
    "dd/MM/yyyy HH:mm",
    "dd/MM/yyyy HH:mm:ss",
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
    "22/01/1970 00:00",
    "22/01/1970 00:00:00",
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
  formatButton.addEventListener('click', () => {
    const toggleLinkContent = linkContent ? previewTexts : patternTexts;
    const toggleButtonContent = buttonContent ? patternFormat : previewFormat;
    options.forEach((a, i) => {
      if (toggleLinkContent[i] && toggleButtonContent) {
        a.textContent = toggleLinkContent[i];
      }
    });
    formatButton.textContent = toggleButtonContent;
    buttonContent = !buttonContent;
    linkContent = !linkContent;
  });
})

  const dateFormats = {
      0: (yyyy, MM, dd, d, HH, mm, ss, MMM) => `${MM}/${dd}/${yyyy} ${HH}:${mm}`,
      1: (yyyy, MM, dd, d, HH, mm, ss, MMM) => `${MM}/${dd}/${yyyy} ${HH}:${mm}:${ss}`,
      2: (yyyy, MM, dd, d, HH, mm, ss, MMM) => `${dd}/${MM}/${yyyy} ${HH}:${mm}`,
      3: (yyyy, MM, dd, d, HH, mm, ss, MMM) => `${dd}/${MM}/${yyyy} ${HH}:${mm}:${ss}`,
      4: (yyyy, MM, dd, d, HH, mm, ss, MMM) => `${yyyy}/${MM}/${dd} ${HH}:${mm}`,
      5: (yyyy, MM, dd, d, HH, mm, ss, MMM) => `${yyyy}/${MM}/${dd} ${HH}:${mm}:${ss}`,
      6: (yyyy, MM, dd, d, HH, mm, ss, MMM) => `${MMM}/${dd}/${yyyy} ${HH}:${mm}`,
      7: (yyyy, MM, dd, d, HH, mm, ss, MMM) => `${MMM}/${dd}/${yyyy} ${HH}:${mm}:${ss}`,
      8: (yyyy, MM, dd, d, HH, mm, ss, MMM) => `${yyyy}/${MMM}/${dd} ${HH}:${mm}`,
      9: (yyyy, MM, dd, d, HH, mm, ss, MMM) => `${yyyy}/${MMM}/${dd} ${HH}:${mm}:${ss}`,
      10: (yyyy, MM, dd, d, HH, mm, ss, MMM) => `${MM}-${dd}-${yyyy} ${HH}:${mm}`,
      11: (yyyy, MM, dd, d, HH, mm, ss, MMM) => `${MM}-${dd}-${yyyy} ${HH}:${mm}:${ss}`,
      12: (yyyy, MM, dd, d, HH, mm, ss, MMM) => `${yyyy}-${MM}-${dd} ${HH}:${mm}`,
      13: (yyyy, MM, dd, d, HH, mm, ss, MMM) => `${yyyy}-${MM}-${dd} ${HH}:${mm}:${ss}`,
      14: (yyyy, MM, dd, d, HH, mm, ss, MMM) => `${MMM}-${dd}-${yyyy} ${HH}:${mm}`,
      15: (yyyy, MM, dd, d, HH, mm, ss, MMM) => `${MMM}-${dd}-${yyyy} ${HH}:${mm}:${ss}`,
      16: (yyyy, MM, dd, d, HH, mm, ss, MMM) => `${yyyy}-${MMM}-${dd} ${HH}:${mm}`,
      17: (yyyy, MM, dd, d, HH, mm, ss, MMM) => `${yyyy}-${MMM}-${dd} ${HH}:${mm}:${ss}`,
      18: (yyyy, MM, dd, d, HH, mm, ss, MMM) => `${d} ${MMM} ${yyyy} ${HH}:${mm}`,
      19: (yyyy, MM, dd, d, HH, mm, ss, MMM) => `${d} ${MMM} ${yyyy} ${HH}:${mm}:${ss}`
  };

function getLettersMonth(MM) {
    const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return months[MM];
}

function getDate() {

  if (!selected) return null;

  const selectedIndex = parseInt(selected.dataset.index);
  const formatFunction = dateFormats[selectedIndex];

  if (!formatFunction) return null;

  const date = new Date();
  const yyyy = date.getFullYear();
  let MM = date.getMonth() + 1;
  const MMM = getLettersMonth(MM);
  let dd = date.getDate();
  const d = date.getDate();
  const HH = date.getHours();
  let mm = date.getMinutes();
  let ss = date.getSeconds();

  if (dd < 10) dd = "0" + dd;
  if (MM < 10) MM = "0" + MM;
  if (mm < 10) mm = "0" + mm;
  if (ss < 10) ss = "0" + ss;

  formattedDate = formatFunction(yyyy, MM, dd, d, HH, mm, ss, MMM);
  console.log(formattedDate);
  return formattedDate;
}
