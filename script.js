let currentDoc = "";
let currentLine = 0;
let shift = false;
let allNotesDocs = document.getElementsByClassName("notesDoc");

for (let i = 0; i < allNotesDocs.length; i++) {
    document.getElementById("notes").onkeydown = function (event) {
        registerKeys(event);
    }
}

document.getElementById("notes").onmousedown = function (event) {
    if (+document.activeElement.id !== 0) {
        currentLine = +document.activeElement.id;
    }
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
        createElement("div", "", name, document.getElementById("notesPage"));
        document.getElementById(name).dataset.lineCount = 0;
        document.getElementById(name).classList.add("notesDoc");
        addNewLine(name);
        allNotesDocs = document.getElementsByClassName("notesDoc");
        changePage('notesPage', 'page', 'flex');
        for (let i = 0; i < allNotesDocs.length; i++) {
            document.getElementById("notesPage").onkeydown = function (event) {
                registerKeys(event);
            }
        }
    }

}

function addNewLine(divId) {
    createElement("input", "", document.getElementById(divId).dataset.lineCount, document.getElementById(divId));
}

function registerKeys(event) {
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
        document.getElementById(currentLine - 1).focus();
        currentLine = +document.activeElement.id;
    }

    if (event.key === "Shift") {
        shift = true;
    }

    currentLine = +document.activeElement.id;
}