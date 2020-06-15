import React, { useState, useEffect }  from 'react'
import { Redirect, Link} from 'react-router-dom'

const Profile = props => {
	let [secretMessage, setSecretMessage] = useState('')
	let [playlist, setPlaylist] = useState([])
	let [faves, setFaves] = useState([])

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
		getFaves()
		getPlaylist()
	}, [])

	const getId = (id) => {
		console.log('hi')
		props.getAnimeId(id)
	}

	const getPlaylist = () => {
		if (props.user) {
		fetch(process.env.REACT_APP_SERVER_URL + 'playlist/' + props.user._id, {
	      method: 'GET',
	      headers: {
	        'Content-Type': 'application/json'
	      }
	    })
	   	.then(response => response.json()
		    .then(response => {
		    	console.log(response)
		    	setPlaylist(response.animePlaylist)
		    	console.log(response.animePlaylist)
		    })
		    .catch(err => {
		    	console.log(err)
			})
		)
		.catch(err => {
		    	console.log(err)
		})
		}
	}

	const getFaves = () => {
		if (props.user) {
		fetch(process.env.REACT_APP_SERVER_URL + 'favorites/' + props.user._id, {
	      method: 'GET',
	      headers: {
	        'Content-Type': 'application/json'
	      }
	    })
	   	.then(response => response.json()
		    .then(response => {
		    	console.log(response.faves)
		    	setFaves(response.faves)

		    })
		    .catch(err => {
		    	console.log(err)
			})
		)
		.catch(err => {
		    	console.log(err)
		})
		}
	}
	//get list of all rated anime
	let favList = faves.map((f, i) => {
		return (
			<div key={i} onClick={() => getId(f.animeId)}>
				<Link to='/animeinfo'>
				<h3>{f.title}</h3> Rating: {f.rating}
				</Link>
			</div>

		)
	})
	//get list of all animes in queue
	let queueList = playlist.map((p, i) => {
		return (
			<div key={i} onClick={() => getId(p.animeId)}>
				<Link to='/animeinfo'>
				<h3>{p.title}</h3> Status: {p.queue}
				</Link>
			</div>
		)
	})
	if (!props.user) {
		return <Redirect to="/login" />
	}
  return (
	  <div>
		   <div class="profileB">
			   </div>
      <h2>Username: {props.user.username}</h2>
      <img src={props.user.pic} alt="user pic" className="profilePic" />
	  
      <h2>{secretMessage}</h2>
      <div>
      	<h1>Rated Anime </h1>
      	{favList}
      	<h1>Anime in queue list</h1>
      	{queueList}

      </div>
	  <div class="soundCloud">
	  <iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/194124863&color=%23e978eb&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>
      <div style={{fontSize: "10px", color: "#cccccc",lineBreak: "anywhere", wordBreak: "normal", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", fontFamily: "Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif", fontWeight: "100"}}>
	  <a href="https://soundcloud.com/okami_dende" title="Dendé" target="_blank" style={{color: "#cccccc", textDecoration: "none"}}>Dendé</a> · <a href="https://soundcloud.com/okami_dende/naruto-blue-bird-hip-hop-remix" title="Naruto Blue Bird Hip Hop remix" target="_blank" style={{color: "#cccccc", textDecoration: "none"}}>Naruto Blue Bird Hip Hop remix</a></div>
	</div>
	</div>
  )
  
}


export default Profile
