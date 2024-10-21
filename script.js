let indent = 0;

onkeydown = function (event) {
    console.log(document.activeElement);
    if (event.key === "Tab") {
        event.preventDefault();
        indent++;
        document.activeElement.style.textIndent = `${indent}rem`;
    }
}