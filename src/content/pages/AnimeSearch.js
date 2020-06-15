import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'


const AnimeSearch = props => {
	//set states for 
	let [animeName, setAnimeName] = useState('')
	let [animeList, setAnimeList] = useState([])
	let [animeId, setAnimeId] = useState('')

	useEffect(() => {
		getFaves()
	}, [])
	const getAnimeData = e => {
		e.preventDefault()
		console.log(animeName)

		fetch('https://api.jikan.moe/v3/search/anime?q='+ animeName + '&page=1')
		.then(response => response.json())
		.then(data => {
			console.log(data)
			console.log(data.results)
			setAnimeList(data.results)
		})
		.catch(err => {
			console.log(err)
		})
	}

	const setName = (name) => {
		console.log(name)
		let tester = name.split(' ')
		let newby = ''
		for (let i =0; i < tester.length; i++) {
			console.log('hi')
			if (i == tester.length - 1) {
				newby = newby + tester[i]
			} else {
				newby = newby + tester[i] + '%20'
			}
			console.log(newby)
		}
		setAnimeName(newby)
	}

	const getId = (id) => {
		console.log('hi')
		props.getAnimeId(id)
	}
	//used to test if faves for user has been set
	const getFaves = () => {
		let tester;
		fetch(process.env.REACT_APP_SERVER_URL + 'favorites/' + props.user._id, {
	      method: 'GET',
	      headers: {
	        'Content-Type': 'application/json'
	      }
	    })
	   	.then(response => response.json()
		    .then(response => {
		    	console.log(response)
		    	tester = response
		    	console.log(tester)
		    })
		    .catch(err => {
		    	tester = 'failure'
		    	addFavesData()
		    	console.log(err)
			})
		)
		.catch(err => {
		    	console.log(err)
		})
		
	}
	//initilaize faves data for user if not done yet
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

	console.log()

	let animeShow = animeList.map((a, i) => {
		return (
		
			<div key={i} onClick={() => getId(a.mal_id)}>
			<Link to='/animeinfo'>
			<div>{a.title}</div>
			<img src={a.image_url} />
			</Link>
			</div>
	
		)
	})


  return (
	  <div>
    <div class="animeSearchB">
      Anime Stub!
      <form onSubmit={getAnimeData}>
      	<input name='name' type='text'onChange={e => 
      		setName(e.target.value)}/>
      </form>
	  </div>
      <div className="animeContainer">
      {animeShow}
      </div>

	  <div>
	  <iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/389247156&color=%23b98eef&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>
      <div style={{fontSize: "10px", color: "#cccccc",lineBreak: "anywhere", wordBreak: "normal", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", fontFamily: "Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif", fontWeight: "100"}}>
	  <a href="https://soundcloud.com/user-496097060" title="ᴍᴀɢɪɪ" target="_blank" style={{color: "#cccccc", textDecoration: "none"}}>ᴍᴀɢɪɪ</a> · <a href="https://soundcloud.com/user-496097060/1-hour-of-wii-music-1" title="Wii Music" target="_blank" style={{color: "#cccccc", textDecoration: "none"}}>BUM BUM BUMMMM DEE DUMMM</a></div>
	  </div>
	  </div>
  )
}
export default AnimeSearch