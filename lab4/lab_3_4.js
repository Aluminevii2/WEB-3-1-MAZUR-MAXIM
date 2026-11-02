let produse = ["Pâine", "Lapte", "Ouă"];

let campProdus = document.getElementById("produs");
let zonaLista = document.getElementById("zonaLista");

function arataLista() {
  zonaLista.innerHTML = "";

  if (produse.length === 0) {
    zonaLista.innerHTML = '<li class="eroare">Lista este goală!</li>';
    return;
  }

  produse.forEach(function (p) {
    let li = document.createElement("li");
    li.textContent = p;
    zonaLista.appendChild(li);
  });
}


function citesteProdus() {
  let valoare = campProdus.value.trim();
  campProdus.value = "";
  campProdus.focus();
  return valoare === "" ? null : valoare;
}

document.getElementById("btnSfarsit").onclick = function () {
  let p = citesteProdus();
  if (p) produse.push(p);
  arataLista();
};

document.getElementById("btnInceput").onclick = function () {
  let p = citesteProdus();
  if (p) produse.unshift(p);
  arataLista();
};

document.getElementById("btnPrimul").onclick = function () {
  produse.shift();
  arataLista();
};

document.getElementById("btnUltimul").onclick = function () {
  produse.pop();
  arataLista();
};

arataLista();
