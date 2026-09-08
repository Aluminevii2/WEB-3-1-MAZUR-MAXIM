const colors = [
    "#ff0000", // 0 - roșu
    "#ff7f00", // 1 - portocaliu
    "#ffff00", // 2 - galben
    "#00ff00", // 3 - verde
    "#00ffff", // 4 - cyan
    "#0000ff", // 5 - albastru
    "#8b00ff", // 6 - violet
    "#ff00ff", // 7 - magenta
    "#ff69b4", // 8 - roz
    "#8b4513", // 9 - maro
    "#000000"  // 10 - negru
];

function changeColor() {
    const id = Number(document.getElementById("colorId").value);

    if (id >= 0 && id <= 10) {
        document.body.style.backgroundColor = colors[id];
    }
}
