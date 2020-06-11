import React, { useState, useEffect }  from 'react'
import { Redirect } from 'react-router-dom'

const Profile = props => {
	let [secretMessage, setSecretMessage] = useState('')

	useEffect(() => {
		let token = localStorage.getItem('boilerToken')
		fetch(process.env.REACT_APP_SERVER_URL + 'profile', {
			headers: {
				'Authorization': `Bearer ${token}`
			}
		})
		.then(response => {
			console.log(response)

			if (!response.ok) {
				setSecretMessage('Nice try')
				return 
			}

			response.json()
			.then(result => {
				console.log(result)
				setSecretMessage(result.message)
			})
		})
		.catch(err => {
			console.log(err)
			setSecretMessage('Nein')
		})
	}, [])

	if (!props.user) {
		return <Redirect to="/login" />
	}
  return (
    <div>
      <h2>{props.user.firstname}</h2>
      <img href={props.user.pic} alt="user pic" />
      <h2>{secretMessage}</h2>
      <div>
      	<h1>Top 5 Anime </h1>
      </div>
	  <div>
		<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/194124863&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>
		<div style={{fontSize: "10px", color: "#cccccc",lineBreak: "anywhere", wordBreak: "normal", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", fontFamily: "Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif", fontWeight: "100"}}>
		<a href="https://soundcloud.com/okami_dende" title="Dendé" target="_blank" style={{color: "#cccccc", textDecoration: "none"}}>Dendé</a> · <a href="https://soundcloud.com/okami_dende/naruto-blue-bird-hip-hop-remix" title="Naruto Blue Bird Hip Hop remix" target="_blank" style={{color:"#cccccc", textDecoration: "none"}}>Naruto Blue Bird Hip Hop remix</a></div>
	</div>
    </div>
  )
}


export default Profile
