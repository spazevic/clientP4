import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
const AnimeSearch = props => {
	//set states for 
	let [animeName, setAnimeName] = useState('')
	let [animeList, setAnimeList] = useState([])
	let [animeId, setAnimeId] = useState('')

	useEffect(() => {
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

	let animeShow = animeList.map((a, i) => {
		return (
			<div key={i} onClick={() => getId(a.mal_id)}>
			{a.title}
			{a.mal_id}
			<Link to='/animeinfo'>Go to Anime Page</Link>
			</div>
		)
	})

  return (
    <div>
      Anime Stub!
      <form onSubmit={getAnimeData}>
      	<input name='name' type='text'onChange={e => 
      		setName(e.target.value)}/>
      </form>
      {animeShow}
	  <div>
	  <iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/625034931&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>
      <div style={{fontSize: "10px", color: "#cccccc",lineBreak: "anywhere", wordBreak: "normal", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", fontFamily: "Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif", fontWeight: "100"}}>
	  <a href="https://soundcloud.com/user-943653299" title="KayleeKat" target="_blank" style={{color: "#cccccc", textDecoration: "none"}}>KayleeKat</a> · <a href="https://soundcloud.com/user-943653299/oi-oi-oi-bakugou-remix" title="Oi Oi Oi /Bakugou Remix/" target="_blank" style={{color: "#cccccc", textDecoration: "none"}}>Oi Oi Oi /Bakugou Remix/</a></div>
	  </div>
    </div>
  )
}
export default AnimeSearch