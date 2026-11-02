let elevi = [
  { nume: "Popescu Ana", varsta: 17, nota: 9 },
  { nume: "Rusu Mihai", varsta: 18, nota: 8 },
  { nume: "Ciobanu Maria", varsta: 17, nota: 10 }
];


function gasesteElev(numeCautat) {
  let n = numeCautat.trim().toLowerCase();
  return elevi.find(function (e) {
    return e.nume.toLowerCase() === n;
  });
}

function afiseazaElevi() {
  let catalog = document.getElementById("catalog");
  catalog.innerHTML = "";

  elevi.forEach(function (elev, i) {
    let div = document.createElement("div");
    div.className = "elev";
    div.innerHTML =
      '<span class="nume">' + (i + 1) + ". " + elev.nume + "</span><br>" +
      "Vârsta: " + elev.varsta + "<br>" +
      "Nota: " + elev.nota;
    catalog.appendChild(div);
  });

  document.getElementById("contor").textContent = "Număr de elevi: " + elevi.length;
}

function adaugaElev() {
  let nume = document.getElementById("nume").value.trim();
  let varsta = Number(document.getElementById("varsta").value);
  let nota = Number(document.getElementById("nota").value);

  if (nume === "" || varsta <= 0 || nota <= 0) {
    alert("Completează corect toate câmpurile!");
    return;
  }

  let elevNou = {
    nume: nume,
    varsta: varsta,
    nota: nota
  };
  elevi.push(elevNou);

  document.getElementById("nume").value = "";
  document.getElementById("varsta").value = "";
  document.getElementById("nota").value = "";
  afiseazaElevi();
}

function stergeElev() {
  let camp = document.getElementById("numeSters");
  let elev = gasesteElev(camp.value);

  if (elev === undefined) {
    alert("Elevul nu a fost găsit!");
    return;
  }

  elevi.splice(elevi.indexOf(elev), 1);
  camp.value = "";
  afiseazaElevi();
}

function cautaElev() {
  let elev = gasesteElev(document.getElementById("numeCautat").value);
  let zona = document.getElementById("rezultat");

  if (elev) {
    zona.className = "rezultat ok";
    zona.innerHTML = "<b>Elev găsit!</b><br>Nume: " + elev.nume +
      "<br>Vârsta: " + elev.varsta + "<br>Nota: " + elev.nota;
  } else {
    zona.className = "rezultat nu";
    zona.textContent = "Elevul nu a fost găsit!";
  }
}

afiseazaElevi();
