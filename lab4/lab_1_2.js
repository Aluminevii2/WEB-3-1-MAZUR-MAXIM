
function scrie(idZona, text) {
  console.log(text);
  document.getElementById(idZona).textContent += text + "\n";
}

let fructe = ["Măr", "Pară", "Banana", "Portocală", "Kiwi"];

scrie("rez1", "Lista: " + fructe.join(", "));
scrie("rez1", "Primul element: " + fructe[0]);
scrie("rez1", "Ultimul element: " + fructe[fructe.length - 1]);
scrie("rez1", "Număr de elemente: " + fructe.length);


let orase = ["Chișinău", "Bălți", "Cahul"];

orase.push("Orhei");       // la sfârșit
orase.unshift("Soroca");   // la început
orase.pop();               // elimină ultimul
orase.shift();             // elimină primul

scrie("rez2", "Lista finală: " + orase.join(", "));
