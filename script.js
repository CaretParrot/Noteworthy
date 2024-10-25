let currentDoc = "";
let currentLine = 0;

let notes = {}

document.getElementById("notes").onkeydown = function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        addNewLine();
    }

    if (event.key === "ArrowUp" && currentLine >= 2) {
        document.getElementById(currentLine - 1).focus();
    }

    if (event.key === "ArrowDown") {
        document.getElementById(currentLine + 1).focus();
    }

    if (event.key === "Escape") {
        changePage('homePage', 'page', 'flex');
    }

    if (event.key === "Backspace" && document.activeElement.innerHTML === "") {
        document.activeElement.remove();
        delete notes[currentDoc][currentLine];
        document.getElementById(currentLine - 1).focus();
    }

    currentLine = +document.activeElement.id;
    notes[currentDoc][currentLine] = document.activeElement.innerHTML;
}

document.getElementById("notes").onmousedown = function (event) {
    notes[currentDoc][currentLine] = document.activeElement.innerHTML;
    if (+document.activeElement.id !== 0) {
        currentLine = +document.activeElement.id;
    }
}

function promptAndOpenNotes() {
    let name;
    name = prompt("Name:");
    if (name === null) {
        return;
    } else {
        if (document.getElementById("notes").innerHTML === "") {
            notes[name] = { "lineCount": 0 };
            currentDoc = name;
            addNewLine();
        }
        document.getElementById("notesName").innerHTML = currentDoc;
        changePage('notesPage', 'page', 'flex');
    }
    
}

function addNewLine() {
    notes[currentDoc]["lineCount"]++;
    currentLine++;
    notes[currentDoc][currentLine] = "";
    createElement("li", "", notes[currentDoc]["lineCount"], document.getElementById("notes"));
    document.getElementById(notes[currentDoc]["lineCount"]).contentEditable = true;
    document.getElementById(notes[currentDoc]["lineCount"]).focus();
}