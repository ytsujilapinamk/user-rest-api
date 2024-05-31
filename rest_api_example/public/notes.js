
function createNoteListItem(note) {

    const element = document.createElement("DIV")
    const idElement = document.createElement("P")
    const contentElement = document.createElement("P")
    const editButton = document.createElement("BUTTON")

    editButton.innerText = "Muokkaa"

    idElement.innerText = note.id
    contentElement.innerText = note.content

    element.append(idElement, contentElement, editButton)


    editButton.addEventListener("click", (e) => {

       

        const editContainer = document.createElement("FORM")

        const label = document.createElement("LABEL")
        const input = document.createElement("INPUT")

        input.setAttribute("name", "content")
        input.setAttribute("value", note.content)
        // input.value = note.content

        const updateButton = document.createElement("BUTTON")
        updateButton.innerText = "tallenna"

        editContainer.append(label, input, updateButton)

        editContainer.addEventListener("submit", async (e) => {

            try {

                e.preventDefault()

                const formData = new FormData(editContainer)
                const noteData = Object.fromEntries(formData)

                const response = await fetch("/api/v1/notes", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        id: note.id,
                        content: noteData.content
                    })
                })

                if (response.ok) {
                    location.reload()
                } else {
                    alert("Päivittäminen ei onnistunut")
                }

            } catch (error) {
                alert("Päivittäminen ei onnistunut")
            }
        })

        element.append(editContainer)
    })
    return element
}

async function getNotes() {

    const response = await fetch("/api/v1/notes")
    const data = await response.json()

    const notesContainer = document.getElementById("notes")

    const noteElements = data.map(createNoteListItem)

    notesContainer.append(...noteElements)

}

function createNote(note) {

    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(note)
    };

    fetch('/api/v1/notes', options)
        .then(response => {

            if (response.ok) {
                window.location.assign("/notes.html")
            } else {
                alert("Tarkista tiedot")
            }

        }).catch(err => console.error(err));

}

document.addEventListener("DOMContentLoaded", async () => {

    await getNotes()

    const form = document.getElementById("create-note")

    form.addEventListener("submit", (event) => {

        event.preventDefault()

        const formData = new FormData(form)
        const note = Object.fromEntries(formData)
        form.reset()
        createNote(note)

    })

})