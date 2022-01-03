const mainContainer = document.querySelector("#container")

const applicationState = {
    authors: [],
    recipients: [],
    topics: [],
    letters: []
}

export const fetchAuthors = () => {
    return fetch("http://localhost:8088/authors")
    .then(response => response.json())
    .then(
        (authorRequests) => {
            applicationState.authors = authorRequests
        }
    )
}

export const fetchRecipients = () => {
    return fetch("http://localhost:8088/recipients")
    .then(response => response.json())
    .then(
        (recipientRequests) => {
            applicationState.recipients = recipientRequests
        }
    )
}

export const fetchTopics = () => {
    return fetch("http://localhost:8088/topics")
    .then(response => response.json())
    .then(
        (topicRequests) => {
            applicationState.topics = topicRequests
        }
    )
}

export const fetchLetters = () => {
    return fetch("http://localhost:8088/letters")
    .then(response => response.json())
    .then(
        (letterRequests) => {
            applicationState.letters = letterRequests
        }
    )
}

export const sendLetter = (letter) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(letter)
    }
    return fetch("http://localhost:8088/letters", fetchOptions)
    .then(response => response.json())
    .then(() => {
        mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
    })
}

export const getAuthors = () => {
    return applicationState.authors.map((author) => ({...author}))
}

export const getRecipients = () => {
    return applicationState.recipients.map((recipient) => ({...recipient}))
}

export const getTopics = () => {
    return applicationState.topics.map((topic) => ({...topic}))
}

export const getLetters = () => {
    return applicationState.letters.map((letter) => ({...letter}))
}