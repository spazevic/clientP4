// Packages
import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

const Login = props => {
  // Declare and initialize state variables
  let [email, setEmail] = useState('')
  let [message, setMessage] = useState('')
  let [password, setPassword] = useState('')

  // Event handlers
  const handleSubmit = e => {
    e.preventDefault()
    fetch(process.env.REACT_APP_SERVER_URL + 'auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      console.log('Response', response)
      if (!response.ok) {
        setMessage(`${response.status}: ${response.statusText}`)
        return
      }

      response.json().then(result => {
        console.log('Result', result)
        props.updateToken(result.token)
      })
    })
    .catch(err => {
      console.log('Error submitting login info', err)
    })
  }

    if (props.user) {
    return <Redirect to="/profile" />
    }

 

  return (
    <div>
      <div>
        <h2>

        </h2>
      </div>
      
      <span className="red">{message}</span>
      <form onSubmit={handleSubmit}>
          <div class='loginB'>
          <label>Email:</label>
            <input type="email" name="email" onChange={e => setEmail(e.target.value)} />
            <label>Password:</label>
            <input type="password" name="password" onChange={e => setPassword(e.target.value)} />
          <button type="submit">Login In!</button>
          </div>
            
        </form>
        <div class="soundCloud" type="hidden">
        <iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/772235665&color=%23ff008a&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>
        <div style={{fontSize: "10px", color: "#cccccc",lineBreak: "anywhere", wordBreak: "normal", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", fontFamily: "Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif", fontWeight: "100"}}>
          <a href="https://soundcloud.com/cyclop-water-boi" title="WhiteIce" target="_blank" style={{color: "#cccccc", textDecoration: "none"}}>WhiteIce</a> · <a href="https://soundcloud.com/cyclop-water-boi/demon-slayer-op" title="Demon Slayer OP" target="_blank" style={{color: "#cccccc", textDecoration: "none"}}>Demon Slayer OP</a></div>
        </div>
    </div>
  )
}

export default Login
