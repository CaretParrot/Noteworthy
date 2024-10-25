let currentDoc = "";
let currentLine = 0;
let shift = false;

let notes = {};

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

    if (event.key === "Backspace" && document.activeElement.value === "" && document.getElementById(currentLine - 1) !== null) {
        event.preventDefault();
        document.activeElement.remove();
        delete notes[currentDoc][currentLine];
        document.getElementById(currentLine - 1).focus();
        currentLine = +document.activeElement.id;
    }

    if (event.key === "Shift") {
        shift = true;
    }

    if (event.key === "Tab") {
        event.preventDefault();
        if (shift === true && notes[currentDoc][currentLine]["indent"] >= 0) {
            notes[currentDoc][currentLine]["indent"]--;
            shift = true;
        } else {
            notes[currentDoc][currentLine]["indent"]++;
        }
    }

    document.activeElement.style.textIndent = `${notes[currentDoc][currentLine]["indent"]}rem`;
    currentLine = +document.activeElement.id;
    notes[currentDoc][currentLine]["text"] = document.activeElement.value;
}

document.getElementById("notes").onmousedown = function (event) {
    if (+document.activeElement.id !== 0) {
        currentLine = +document.activeElement.id;
    }
    notes[currentDoc][currentLine]["text"] = document.activeElement.value;
}

onkeyup = function (event) {
    shift = false;
}

function promptAndOpenNotes() {
    let name;
    name = prompt("Name:");
    if (name === null) {
        return;
    } else {
        if (document.getElementById("notes").innerHTML === "") {
            notes[name] = {
                data: [],
                lineCount: 0
            };
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
    notes[currentDoc]["data"][currentLine] = {
        "text": "- ",
        "indent": 0
    }
    createElement("input", "", notes[currentDoc]["lineCount"], document.getElementById("notes"));
    document.getElementById(notes[currentDoc]["lineCount"]).value = "- ";
    document.getElementById(notes[currentDoc]["lineCount"]).focus();
}