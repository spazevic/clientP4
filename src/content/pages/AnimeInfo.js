import React, {useEffect, useState} from 'react'
const AnimeInfo = props => {
	let [animeData, setAnimeData] = useState({})
	let [newComment, setNewComment] = useState('')
	let [comments, setComments] = useState({})
	let [userList, setUserList] = useState([])
	let [userRating, setUserRating] = useState()
	useEffect(() => {
		getAnimeData()
		getComments()
		findUsers()
	}, [])
	const getAnimeData = () => {
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
	console.log(props.animeId)

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
	    	console.log(response)
	    })
	    .catch(err => {
	    	console.log(err)
		})
	}

	const addNewComment = e => {
		e.preventDefault()
		if (!comments.length) {
			addCommentData()
		}
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
	    	console.log(response)
	    })
	    .catch(err => {
	    	console.log(err)
		})
	}

	const getComments = () => {
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
		    	console.log(err)
			})
		)
		.catch(err => {
		    	console.log(err)
		})
	}

	const addFavesData = () => {
  		fetch(process.env.REACT_APP_SERVER_URL + 'favorites', {
	      method: 'POST',
	      body: JSON.stringify({
	      	user: props.user._id
	      }),
	      headers: {
	        'Content-Type': 'application/json'
	      }
	    })
	    .then(response => {
	    	console.log(response)
	    })
	    .catch(err => {
	    	console.log(err)
		})
	}

	const addNewFaves = () => {
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
	    	console.log(response)
	    })
	    .catch(err => {
	    	console.log(err)
		})
	}

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
	console.log(userList)




	let genreList;
	//check for genres so it doesn't try to access the array before it exists
	if (animeData.genres) {
		console.log('hi')
		console.log(animeData.genres[0])
		genreList = animeData.genres.map((g, i) => {
			console.log(g.name)
			return (
				<div key = {i}>
				{g.name}
				</div>
			)
		})
	}

	console.log(comments)
	let commentList;

	if (comments.animeId) {

		console.log('hey bro i got comments')
		commentList = comments.userComment.map((c, i) => {
			console.log('yoyoyo')
			console.log(props.user)
			console.log(c.user)
			let name
			for (let i =0; i < userList.length; i++) {
				if (c.user == userList[i]._id) {
					console.log(userList[i].username)
					name = userList[i].username
				}
			}
			return (
				<div key = {i}>
				{name}
				{c.body}
				</div>
			)
		})
	}



  return (
    <div>

    	<div>
    		{animeData.title}
    	</div>
    	<div>hi</div>
    	<form onSubmit={addNewComment}>
    		<input type='text' name='newComment' type='text'onChange={e => 
      		setNewComment(e.target.value)}/>
    		<input type='submit' value='Add New Comment' />
    	</form>
    	<div>
    		{animeData.score}
      	</div>
      	<div>
      		<img src={animeData.image_url} />
      	</div>
      	<div>
      		{animeData.synopsis}
      		{genreList}
      		{commentList}
      	</div>
      	<form onSubmit={addFavesData}>
      		<input type='submit' value='create rating' />
      	</form>
      	<form onSubmit={addNewFaves}>
      		<input type='number' min='1' max='10' onChange={e => 
      		setUserRating(e.target.value)}/>
      		<input type='submit' value ='Give a rating' />
      	</form>
	  <div>
	  <iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/594376845&color=%23b98eef&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>
      <div style={{fontSize: "10px", color: "#cccccc",lineBreak: "anywhere", wordBreak: "normal", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", fontFamily: "Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif", fontWeight: "100"}}>
	  <a href="https://soundcloud.com/poppaz" title="TO$HiO™" target="_blank" style={{color: "#cccccc", textDecoration: "none"}}>TO$HiO™</a> · <a href="https://soundcloud.com/poppaz/the-promised-neverland-2" title="The Promised Neverland - Isabellas Lullaby イザベラの唄" target="_blank" style={{color: "#cccccc", textDecoration: "none"}}>The Promised Neverland - Isabellas Lullaby イザベラの唄</a></div>
	  </div>
    </div>
  )
}
export default AnimeInfo