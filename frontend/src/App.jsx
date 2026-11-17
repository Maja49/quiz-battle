import { useEffect, useState } from "react";  

function App() {
  const [message, setMessage] = useState('Loading...')

  useEffect(() => {
    fetch('http://localhost:5000/')
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message)
      })
      .catch((error) => {
        console.error('Error: ', error)
        setMessage('Could not connect to the server')
      })

  }, [])

  return (
    <div>
      <h1>Quiz battle</h1>
      <p>{message}</p>
    </div>
  )
}

export default App