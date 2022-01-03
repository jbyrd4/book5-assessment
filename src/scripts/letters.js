import { getLetters } from "./dataAccess.js";

export const lettersList = () => {
    const letters = getLetters()
    let html = `
        <h2>Letters</h2>
        <ul class="letterList">`
        const buildLetter = letters.map((letter) => {
            return `<li class="singleLetter">
            <p>Dear ${letter.recipient} (${letter.recipientEmail}),</p>
            <p>${letter.letterText}</p>
            <p>Sincerely, ${letter.author} (${letter.authorEmail})</p>
            <p>Sent on: ${letter.date}</p>
            <p class="topicStyle">${letter.topic}</p>
            </li>`
        })
        html += buildLetter.join("")
        html += `</ul>`
    return html
}