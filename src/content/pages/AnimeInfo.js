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
			console.log(data.genres[0].name)
		})
		.catch(err => {
			console.log(err)
		})
	}
	console.log(props.animeId)

	let genreList;
	//check for genres so it doesn't try to access the array before it exists
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

  return (
    <div>
    	<div>
    		{animeData.title}
    	</div>
    	<form action='#' method='POST'>
    		<input type='hidden' value ={animeData.mal_id} />
    		<input type='submit' value='Add to Favs' />
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
      	</div>
    </div>
  )
}
export default AnimeInfo