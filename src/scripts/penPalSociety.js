import { letterForm } from "./form.js"
import { lettersList } from "./letters.js"

export const penPalSociety = () => {
    return `
    <h1>Pen Pal Society</h1>
    <section class="mainForm">
        ${letterForm()}
    </section>
    <section>
        ${lettersList()}
    </section>
    `
}