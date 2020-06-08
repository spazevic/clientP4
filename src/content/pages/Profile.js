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
	})

	if (!props.user) {
		return <Redirect to="/login" />
	}
  return (
    <div>
      <h2>{props.user.firstname}</h2>
      <img href={props.user.pic} alt="user pic" />
      <h2>{secretMessage}</h2>
    </div>
  )
}

export default Profile
