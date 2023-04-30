import { useState } from "react"

export default function MyPage() {
  const [prompt, setPrompt] = useState("")
  const [answer, setAnswer] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setIsLoading(true)

    const response = await fetch("/api/get-answer", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt: prompt })
    })
    const data = await response.json()
    setAnswer(data.text.trim())
    const input = document.querySelector('.prompt-field');
    input.value = ""
    setIsLoading(false)
  }

  function handleChange(e) {
    
    setPrompt(e.target.value)
    
  }

  function handleCardClick(e) {
    const input = document.querySelector('.prompt-field');
    input.value = e.target.textContent;

    setPrompt(e.target.innerText)
  }

  return (
    <div className="container">
      

<div className="container-inner-1">
<h1>&lt;zanyaro/&gt;</h1>
      <h4>the omgniscient AI tutor of yours!</h4>
      <h5>(Beta)</h5>

      <div className="answer-area">{answer}</div>
      {isLoading && <div className="loading-spinner"></div>}

      <form className="our-form" onSubmit={handleSubmit}>
        <input className="prompt-field" type="text" onChange={handleChange} />
        <button className="prompt-button">Go!</button>
      </form>
</div>


      <div className="container-cards">
        <p className="card" onClick={handleCardClick}>How can I write a function in Python that takes two numbers as input and returns the sum of the numbers?</p>
        <p className="card" onClick={handleCardClick}>Write a program that asks the user to enter their name and greets them by printing a message to the console</p>
        <p className="card" onClick={handleCardClick}>Implement a function that takes a string as input and returns the length of the string.</p>
      </div>

      
    </div>
  )
}