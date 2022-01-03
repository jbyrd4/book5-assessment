import { getAuthors, getRecipients, getTopics, sendLetter } from "./dataAccess.js";

export const letterForm = () => {
  const authors = getAuthors();
  let html = `
    <label class="label" for="authorsList">Authors</label>
    <select name="authorsList" id="authorsList" class="dropDowns">
    <option value="0">Choose An Author</option>
    `

  const authorOptions = authors.map((author) => {
    return `
        <option value="${author.id}" name="${author.name}">
        ${author.name}
        </option>
        `;
  });

  const topicOptions = () => {
    const topics = getTopics();
    let html = `
        <label class="label" for="topicsRow">Topics</label>
        <ul class="topics" name="topicsRow">`;

    const topicsList = topics.map((topic) => {
      return `<li class="topicItems">
            <input type="radio" name="topicList" value="${topic.id}"/> ${topic.name}
                </li>`;
    });

    html += topicsList.join("");
    html += "</ul>";
    return html;
  };

  const recipientOptions = () => {
      const recipients = getRecipients()
      let html = `
          <label class="label" for="recipientsList">Recipent</label>
          <select name="recipientsList" id="recipientsList" class="dropDowns">
          <option value="0">Choose A Recipient</option>
      `
  
      const recipientsList = recipients.map((recipient) => {
          return `
          <option value="${recipient.id}">
          ${recipient.name}
          </option>
          `
      })
  
      html += recipientsList.join("")
      html += `</select>`
      return html
  }

  html += authorOptions.join("");
  html += `</select>`;
  html += `
        <div class="field">
        <label class="label" for="letterBody">Letter</label>
        <textarea name="letterBody" class="input"></textarea>
        </div>
        `;
  html += `${topicOptions()}`;
  html += `${recipientOptions()}`
  html += `
    <br>
    <button class="button" id="sendLetter">Send Letter</button>
  `
  return html;
};

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("change", changeEvent => {
    if (changeEvent.target.name === "topicList") {
        setTopic(parseInt(changeEvent.target.value))
    }
})

let topicId
const setTopic = (id) => {
    topicId = id
}

mainContainer.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "sendLetter") {
        const authors = getAuthors()
        const recipients = getRecipients()
        const topics = getTopics()


        const selectedAuthor = document.querySelector("select[name='authorsList']").value
        const finalAuthor = authors.find(author => author.id === parseInt(selectedAuthor))
        const authorName = finalAuthor.name
        const authorEmail = finalAuthor.email

        const writtenLetter = document.querySelector("textarea[name='letterBody']").value
        
        //const selectedTopic = document.querySelector("input[name='topicList']").value
        const finalTopic = topics.find(topic => topic.id === topicId)
        const topicName = finalTopic.name

        const selectedRecipient = document.querySelector("select[name='recipientsList']").value
        const finalRecipient = recipients.find(recipient => recipient.id === parseInt(selectedRecipient))
        const recipientName = finalRecipient.name
        const recipientEmail = finalRecipient.email


        const dataToSendToApi = {
            author: authorName,
            authorEmail: authorEmail,
            letterText: writtenLetter,
            topic: topicName,
            recipient: recipientName,
            recipientEmail: recipientEmail,
            date: Date(Date.now()).toString()
        }
        sendLetter(dataToSendToApi)
    }
})
