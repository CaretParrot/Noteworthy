let indent = 0;
let shiftDown = false;

document.getElementById("notes").onkeydown = function (event) {
    console.log(document.activeElement);
    if (event.key === "Tab") {
        if (shiftDown === true) {
            event.preventDefault();
            if (indent > 0) {
                indent--;
            }
            shiftDown = true;
        } else {
            event.preventDefault();
            indent++;
        }
        document.activeElement.style.textIndent = `${indent}rem`;
    }

    if (event.key === "Shift") {
        shiftDown = true;
    }
}

onkeyup = function (event) {
    shiftDown = false;
}