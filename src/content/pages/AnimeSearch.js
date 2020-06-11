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
			<Link to='/animeinfo'>
			<div>{a.title}</div>
			<img src={a.image_url} />
			</Link>
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
      <div className="animeContainer">
      {animeShow}
      </div>
    </div>
  )
}
export default AnimeSearch