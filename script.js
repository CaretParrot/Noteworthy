let currentDoc = "";
let currentLine = 0;
let shift = false;
let control = false;
let allNotesDocs = document.getElementsByClassName("notesDoc");

for (let i = 0; i < allNotesDocs.length; i++) {
    document.getElementById("notes").onkeydown = function (event) {
        registerKeys(event);
    }
}

onkeyup = function (event) {
    shift = false;
    control = false;
}

function promptAndOpenNotes() {
    let name = prompt("Name:");
    if (name === null) {
        return;
    } else {
        currentDoc = name;
        createElement("span", "", currentDoc, document.getElementById("notesPage"));
        document.getElementById(currentDoc).contentEditable = "true";
        document.getElementById(currentDoc).classList.add("notesDoc");
        document.getElementById(currentDoc).focus();
        document.getElementById("notesName").innerHTML = currentDoc;
        changePage('notesPage', 'page', 'flex');
        allNotesDocs = document.getElementsByClassName("notesDoc");
        for (let i = 0; i < allNotesDocs.length; i++) {
            document.getElementById("notesPage").onkeydown = function (event) {
                registerKeys(event);
            }
        }
    }
}

function registerKeys(event) {
    switch (event.key) {
        case "Escape":
            changePage('homePage', 'page', 'flex');
            break;
        case "Shift":
            shift = true;
            break;
        case "Control":
            control = true;
            break;
        case "e":
            if (control) {
                exportNotes();
            }
            break;
        case "Tab":
            event.preventDefault();
            break;
        case "/":
            commandSelection();
            break
    }
}

function exportNotes() {
    let exportedText = document.getElementById(currentDoc).innerHTML.replace(/<br>/g, "\n");
    createElement("a", "", "link", document.body);
    document.getElementById("link").href = URL.createObjectURL(new Blob([exportedText], { type: "text/rtf" }));
    document.getElementById("link").download = `${currentDoc}.rtf`;
    document.getElementById("link").click();
    console.log(exportedText);
}

function commandSelection() {
    let command = prompt("Enter a command:")
    if (command === null) {
        return
    } else {
        let color = prompt("Select a color:");
    }
}