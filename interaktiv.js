document.addEventListener("DOMContentLoaded", function () {
  runProgram();
});
// DCL her venter man på at hele DOM er loaded ind før der sker noget, altså hele html bliver læst ind, derefter kalder man funktionen
// asynkron funktion for at man kan loade ting ind dynamisk
async function runProgram() {
  // variabler der bruges senere hen
  let selected;
  let selectedID;
  let active;
  let infoboks;
  // 1. Load svg map ved at lave en variabel
  //------------------------------------------------------------------------------------
  let mySvg = await fetch("interaktiv.svg");
  let svg = await mySvg.text();
  // svg tolkes som text

  document.querySelector("#map").innerHTML = svg;
  // skal tolkes som HTML

  // 2. find infobokse og skjul dem
  //------------------------------------------------------------------------------
  let scafati_boks = document.querySelector("#map #scafati");
  let bellano_boks = document.querySelector("#map #bellano");

  scafati_boks.style.visibility = "hidden";
  bellano_boks.style.visibility = "hidden";
  // Når jeg trykker på cirklerne laver man en funktion som modtager et event, som kalder en funktion
  document.querySelector("#map #points").addEventListener("click", function (evt) {
    clicked(evt);
  });
  // function clicked
  function clicked(obj) {
    // find det klikkede element og putte det i en variabel. parentElement bruges for at få fat i hele punktet, og ikke stor/lille cirkel
    selected = obj.target.parentElement;
    // finde elementets ID
    selectedID = selected.getAttribute("id");
    console.log(selectedID);

    // det her har jeg brugt i sidste projekt, hvor jeg vidst fik det fra chat.
    // den første linje tjekker om elementet man trykker på er aktivt.
    if (active && active.getAttribute("id") === selectedID) {
      if (infoboks) infoboks.style.visibility = "hidden";
      infoboks = null;
      active = null;
      return;
    }
    //hvis ja, så gemmer den infoboksen og starter forfra
    // Hide all infoboxes. Dette array gør sådan, at kun 1 infoboks kan blive vist af gangen, ved at lukke alle før den viser en ny.
    [scafati_boks, bellano_boks].forEach(function (box) {
      box.style.visibility = "hidden";
    });

    //tjekker, om infoboks eksisterer, og hvis den eksisterer, skal den skjules
    if (infoboks) {
      infoboks.style.visibility = "hidden";
    }

    if (selectedID === "punkt-s") {
      scafati_boks.style.visibility = "visible";
      infoboks = scafati_boks;
    }

    if (selectedID === "punkt-b") {
      bellano_boks.style.visibility = "visible";
      infoboks = bellano_boks;
    }

    active = selected;
  }
}
