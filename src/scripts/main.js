import { fetchAuthors, fetchTopics, fetchRecipients, fetchLetters } from "./dataAccess.js"
import { penPalSociety } from "./penPalSociety.js"

export const mainContainer = document.querySelector("#container")

export const render = () => {
    fetchAuthors()
    .then(() => fetchTopics())
    .then(() => fetchRecipients())
    .then(() => fetchLetters())
    .then(() => {
        mainContainer.innerHTML = penPalSociety()
    })
}

render()

mainContainer.addEventListener("stateChanged", customEvent => render())