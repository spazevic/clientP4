import React, {useEffect, useState} from 'react'
const AnimeInfo = props => {
	//most os these states hold varbiles which are passed into the backend in order to update the info in regards to the anime or user
	let [animeData, setAnimeData] = useState({})
	let [newComment, setNewComment] = useState('')
	let [comments, setComments] = useState({})
	let [currentRating, setCurrentRating] = useState()
	let [userList, setUserList] = useState([])
	let [userRating, setUserRating] = useState()
	let [playlist, setPlaylist] = useState([])
	let [watchState, setWatchState] = useState('Watched')
	//this is my sneaky refresher which updates the page on a change of the status of any comments, queues, or ratings
	let [refresher, setRefresher] = useState('')
	useEffect(() => {
		getAnimeData()
		getComments()
		findUsers()
		getFaves()
		getPlaylist()
	}, [refresher])
	//loads data for the specific anime 
	const getAnimeData = () => {
		if(props.animeId) {
		fetch('https://api.jikan.moe/v3/anime/' + props.animeId)
		.then(response => response.json())
		.then(data => {
			console.log(data)
			setAnimeData(data)
			console.log(data.genres[0].name)
		})
		.catch(err => {
			console.log(err)
		})
		}
	}
	console.log('work')
	//sets initial state for comment on a page if no comments have been added
	const addCommentData = () => {
  		fetch(process.env.REACT_APP_SERVER_URL + 'comment', {
	      method: 'POST',
	      body: JSON.stringify({
	      	animeId: props.animeId
	      }),
	      headers: {
	        'Content-Type': 'application/json'
	      }
	    })
	    .then(response => {
	    	setRefresher(Math.random())
	    	console.log(response)
	    })
	    .catch(err => {
	    	console.log(err)
		})
	}

	//this adds a new comment to the current anime page
	const addNewComment = e => {
		e.preventDefault()
  		fetch(process.env.REACT_APP_SERVER_URL + 'comment', {
	      method: 'PUT',
	      body: JSON.stringify({
	      	animeId: props.animeId,
	      	user: props.user,
	      	body: newComment
	      }),
	      headers: {
	        'Content-Type': 'application/json'
	      }
	    })
	    .then(response => {
	    	setRefresher(Math.random())
	    	console.log(response)
	    })
	    .catch(err => {
	    	console.log(err)
		})
	}
	//this loads the comments for the specific page
	const getComments = () => {
		if (props.animeId){
		fetch(process.env.REACT_APP_SERVER_URL + 'comment/' + props.animeId, {
	      method: 'GET',
	      headers: {
	        'Content-Type': 'application/json'
	      }
	    })
	   	.then(response => response.json()
		    .then(response => {
		    	console.log(response.userComment)
		    	setComments(response)
		    })
		    .catch(err => {
		    	addCommentData()
		    	console.log(err)
			})
		)
		.catch(err => {
		    	console.log(err)
		})
		}
	}

	//this adds to the users anime favorites
	const addNewFaves = e => {
		e.preventDefault()
  		fetch(process.env.REACT_APP_SERVER_URL + 'favorites', {
	      method: 'Put',
	      body: JSON.stringify({
	      	user: props.user._id,
	      	title: animeData.title,
            rating: userRating,
            genre: animeData.genres,
            animeId: props.animeId 

	      }),
	      headers: {
	        'Content-Type': 'application/json'
	      }
	    })
	    .then(response => {
	    	setRefresher(Math.random())
	    	console.log(response)
	    })
	    .catch(err => {
	    	console.log(err)
		})
	}

	//this loads all animes rated by the user to check if the current has been rated
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
		    	console.log(response)
		    	for (let i = 0; i <response.faves.length; i++) {
		    		console.log(response.faves[i])
		    		if (response.faves[i].animeId == props.animeId) {
		    		setCurrentRating(response.faves[i].rating)
		    	}
		    	}

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

	//this loads the user list, this is to assign the user for each comment that was posted
	const findUsers = () => {
		fetch(process.env.REACT_APP_SERVER_URL + 'auth/users', {
	      method: 'GET',
	      headers: {
	        'Content-Type': 'application/json'
	      }
	    })
	   	.then(response => response.json()
		    .then(response => {
		    	console.log(response)
		    	setUserList(response)
		    })
		    .catch(err => {
		    	console.log(err)
			})
		)
		.catch(err => {
		    	console.log(err)
		})
	}
	//this loads the entire queuelist of the user to check if teh current anime is on it or not
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

	//this adds an anime to the queue list, defaults to watched
	const addNewQueue = e => {
		e.preventDefault()
  		fetch(process.env.REACT_APP_SERVER_URL + 'playlist', {
	      method: 'Put',
	      body: JSON.stringify({
	      	user: props.user._id,
	      	title: animeData.title,
            queue: 'Watched',
            animeId: props.animeId 

	      }),
	      headers: {
	        'Content-Type': 'application/json'
	      }
	    })
	    .then(response => {
	    	setRefresher(Math.random())
	    	console.log(response)
	    })
	    .catch(err => {
	    	console.log(err)
		})
	}

	//this allwos the user to change the watch status of the anime
	const setQueueStatus = e => {
		if (props.animeId) {
		e.preventDefault()
		console.log('hehe XD')
		fetch(process.env.REACT_APP_SERVER_URL + 'playlist/' + props.animeId, {
	      method: 'Put',
	      body: JSON.stringify({
	      	user: props.user._id,
	      	title: animeData.title,
            queue: watchState,
            animeId: props.animeId 

	      }),
	      headers: {
	        'Content-Type': 'application/json'
	      }
	    })
	    .then(response => {
	    	setRefresher(Math.random())
	    	console.log(response)
	    })
	    .catch(err => {
	    	console.log(err)
		})
		}
	}
	//this allows the user to edit their current rating for the anime
	const setNewRating= e => {
		if (props.animeId) {
		e.preventDefault()
		console.log('hehe XD')
		fetch(process.env.REACT_APP_SERVER_URL + 'favorites/' + props.animeId, {
	      method: 'Put',
	      body: JSON.stringify({
	      	user: props.user._id,
	      	title: animeData.title,
            rating: userRating,
            genre: animeData.genres,
            animeId: props.animeId 

	      }),
	      headers: {
	        'Content-Type': 'application/json'
	      }
	    })
	    .then(response => {
	    	setRefresher(Math.random())
	    	console.log(response)
	    })
	    .catch(err => {
	    	console.log(err,)
		})
		}
	}

	//this loads all the genres for the displayed anime
	let genreList;
	if (animeData.genres) {
		console.log('hi')
		console.log(animeData.genres[0])
		genreList = animeData.genres.map((g, i) => {
			return (
				<div key = {i}>
				{g.name}
				</div>
			)
		})
	}

	//loads the comments for displayed anime
	let commentList;
	if (comments.animeId) {
		console.log('hey bro i got comments')
		commentList = comments.userComment.map((c, i) => {
			let name
			for (let i =0; i < userList.length; i++) {
				if (c.user == userList[i]._id) {
					console.log(userList[i].username)
					name = userList[i].username
				}
			}
			return (
				<div key = {i}>
				<strong>{name}:{" "}</strong>
				{c.body}
				</div>
			)
		})
	}
	//get current rating of anime from user
	let rating;
	if(currentRating) {
		rating = (
			<div>
			<form onSubmit={setNewRating}>
				<label>Edit Rating: {" "}</label>
				<input type='number' min='1' max='10' onChange={e => 
      			setUserRating(e.target.value)}/>
				<input type='submit' value='edit'/>
			</form>
			</div>
		)

	} else {
		rating = (
		<form onSubmit={addNewFaves}>
      		<input type='number' min='1' max='10' onChange={e => 
      		setUserRating(e.target.value)}/>
      		<input type='submit' value ='Give a rating' />
      	</form>
		)
	}
	//sets default add to queue form for user
	let queueMaster = (
		<form onSubmit={addNewQueue}>
	    	<input type='submit' value='add to queue' />
	    </form>
	)
	//checks if user has added anime ot queue list, if they have repalces default form with an edit form
	let statusCheck = playlist.map((p, i) => {
		if (p.animeId == props.animeId) {
			queueMaster = (
				<div>
				{p.queue}
				<form onSubmit={setQueueStatus}>
		    		<select id='status' name='status' onChange={e => 
      				setWatchState(e.target.value)} >
		    			<option value='Watched'>Watched </option>
		    			<option value='Watching'>Currently Watching</option>
		    			<option value='Plan to watch'>Plan to Watch</option>
		    		</select>
		    		<input type='submit' value='Set Status' />
	    		</form>
	    		</div>
			)
		}
	})
	
if (props.user && props.animeId) {
  return (
    <div>
    	<div class="animeTitle">
			<h1><strong>{animeData.title}</strong></h1>
    	</div>
    	Your rating is: {currentRating}
    	{rating}
    	{queueMaster}
    	<div>
    		{animeData.score}
      	</div>
      	<div>
      		<div class="imgFloat"><img src={animeData.image_url} /></div>
      		<div class="synFloat">{animeData.synopsis}</div>
      	</div>
      	<div>
      		<div class="genreCSS"><h3>List of genres</h3></div>
      		<div class="genreList">{genreList}</div>
      		<form onSubmit={addNewComment}>
	    		<input type='text' name='newComment' type='text'onChange={e => 
	      		setNewComment(e.target.value)}/>
    			<input type='submit' value='Add New Comment' />
    		</form>
    		{commentList}
      	</div>

	  <div>
	  <iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/594376845&color=%23b98eef&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>
      <div style={{fontSize: "10px", color: "#cccccc",lineBreak: "anywhere", wordBreak: "normal", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", fontFamily: "Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif", fontWeight: "100"}}>
	  <a href="https://soundcloud.com/poppaz" title="TO$HiO™" target="_blank" style={{color: "#cccccc", textDecoration: "none"}}>TO$HiO™</a> · <a href="https://soundcloud.com/poppaz/the-promised-neverland-2" title="The Promised Neverland - Isabellas Lullaby イザベラの唄" target="_blank" style={{color: "#cccccc", textDecoration: "none"}}>The Promised Neverland - Isabellas Lullaby イザベラの唄</a></div>
	  </div>
    </div>
  )
} else {
	return (
		<div>Please search for the anime again, something went wrong</div>
	)
}
}


export default AnimeInfo