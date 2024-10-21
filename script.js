onkeydown = function (event) {
    console.log(document.activeElement);
    if (event.key === "Tab") {
        event.preventDefault();
        document.activeElement.style.textIndent = "1rem";
    }

    if (event.key === "Backspace") {
        if (document.activeElement.style.textIndent === "1rem" && document.activeElement.innerHTML === "")
        document.activeElement.style.textIndent = "0rem";
    }
}