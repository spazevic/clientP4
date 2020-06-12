// Packages
import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

const Signup = props => {
  // Declare and initialize state variables
  let [email, setEmail] = useState('')
  let [firstname, setFirstname] = useState('')
  let [lastname, setLastname] = useState('')
  let [message, setMessage] = useState('')
  let [password, setPassword] = useState('')
  let [profileUrl, setProfileUrl] = useState('')
  let [username, setUsername] = useState('')
  let [bio, setBio] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    // TODO: Send the user sign up data to the server
    fetch(process.env.REACT_APP_SERVER_URL + 'auth/signup', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
        firstname,
        lastname,
        pic: profileUrl,
        username,
        bio
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
      <h2>Signup</h2>
      <span className="red">{message}</span>
      <form onSubmit={handleSubmit}>
        <div class="signupB">
          <label>First Name:</label>
          <input name="firstname" placeholder="Your first name" onChange={e => setFirstname(e.target.value)} />
        <div>
          <label>Last Name:</label>
          <input name="lastname" placeholder="Your last name" onChange={e => setLastname(e.target.value)} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" onChange={e => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" onChange={e => setPassword(e.target.value)} />
        </div>
        <div>
          <label>Profile Pic URL:</label>
          <input type="url" name="profileUrl" onChange={e => setProfileUrl(e.target.value)} />
        </div>
        <div>
          <label>Username:</label>
          <input name="username" type='text' onChange={e => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Bio:</label>
          <input name="bio" type="textarea" onChange={e => setBio(e.target.value)} />
        </div>
        <button type="submit">Sign Me Up!</button>
        </div>
      </form>
      <div class="soundCloud">
      <iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/306495735&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>
      <div style={{fontSize: "10px", color: "#cccccc",lineBreak: "anywhere", wordBreak: "normal", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", fontFamily: "Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif", fontWeight: "100"}}>
      <a href="https://soundcloud.com/luiz-alves-625547605" title="ANIMES" target="_blank" style={{color: "#cccccc", textDecoration: "none"}}>ANIMES</a> · <a href="https://soundcloud.com/luiz-alves-625547605/sparkle-kimi-no-na-wa-your-name-ost" title="Sparkle Kimi No Na Wa. (Your Name.) OST" target="_blank" style={{color: "#cccccc", textDecoration: "none"}}>Sparkle Kimi No Na Wa. (Your Name.) OST</a></div>
      </div>
    </div>
  )
}

export default Signup
