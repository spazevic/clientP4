import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import {Button,InputGroup,FormControl} from 'react-bootstrap/';


const EditProfile = props => {
// Declare and initialize state variables
  let [profileUrl, setProfileUrl] = useState('')
  let [bio, setBio] = useState('')
  let [token, setToken] = useState()
  let [page, setPage] = useState(false)
  useEffect(() => {
		setToken(localStorage.getItem('boilerToken'))
		fetch(process.env.REACT_APP_SERVER_URL + 'profile', {
			headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
			}
		})
		.then(response => {
			console.log(response)

			if (!response.ok) {
				return 
			}

			response.json()
			.then(result => {
				console.log(result)
			})
		})
		.catch(err => {
			console.log(err)
		})
	}, [])


  const handleSubmit = e => {
    let token = localStorage.getItem('boilerToken')
    e.preventDefault()
    fetch(process.env.REACT_APP_SERVER_URL + 'profile/' + props.user._id, {
        method: 'PUT',
        body: JSON.stringify({
            pic: profileUrl,
            bio
        }),
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
    	}
    })
    .then(response => {
        console.log('Response', response)
        if (!response.ok) {
        return
        }
        response.json().then(result => {
        console.log('Result', result)
        })
        setPage(true)
    })
    .catch(err => {
        console.log('Error submitting login info', err)
    })
}

if (page){
    return <Redirect to='/profile' />
}

return (
    <div>
        <h2>Edit profile</h2>
        <span className="red"></span>
        <form onSubmit={handleSubmit}>
            <div class="signupB">
            
            <div>
                <label>Profile Pic URL:</label>
                <input type="url" name="profileUrl" onChange={e => setProfileUrl(e.target.value)} />
            </div>
            
            <div>
                <label>Bio:</label>
                <input name="bio" type="textarea" onChange={e => setBio(e.target.value)} />
            </div>
            <button type="submit">Submit</button>
            </div>
        </form>
        <div class="soundCloud">
            <iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/306495735&color=%23647cac&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>
        <div style={{fontSize: "10px", color: "#cccccc",lineBreak: "anywhere", wordBreak: "normal", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", fontFamily: "Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif", fontWeight: "100"}}>
        <a href="https://soundcloud.com/luiz-alves-625547605" title="ANIMES" target="_blank" style={{color: "#cccccc", textDecoration: "none"}}>ANIMES</a> · <a href="https://soundcloud.com/luiz-alves-625547605/sparkle-kimi-no-na-wa-your-name-ost" title="Sparkle Kimi No Na Wa. (Your Name.) OST" target="_blank" style={{color: "#cccccc", textDecoration: "none"}}>Sparkle Kimi No Na Wa. (Your Name.) OST</a></div>      </div>
    </div>
)
}
export default EditProfile