import React, {useEffect, useState} from 'react'
const AnimeInfo = props => {
	let [animeData, setAnimeData] = useState({})
	useEffect(() => {
		getAnimeData()
	}, [])
	const getAnimeData = () => {
		fetch('https://api.jikan.moe/v3/anime/' + props.animeId)
		.then(response => response.json())
		.then(data => {
			console.log(data)
			setAnimeData(data)
		})
		.catch(err => {
			console.log(err)
		})
	}
	console.log(props.animeId)
  return (
    <div>
      AnimeInfo Stub!
      {props.animeId}
      {animeData.title}
    </div>
  )
}
export default AnimeInfo