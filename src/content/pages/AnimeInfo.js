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
      {props.animeId}
      {animeData.title}
	  <div>
	  <iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/241059426&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>
      <div style={{fontSize: "10px", color: "#cccccc",lineBreak: "anywhere", wordBreak: "normal", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", fontFamily: "Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif", fontWeight: "100"}}>
	  <a href="https://soundcloud.com/user-655183365" title="MujinTengu" target="_blank" style={{color: "#cccccc", textDecoration: "none"}}>MujinTengu</a> · <a href="https://soundcloud.com/user-655183365/one-punch-man-opening" title="One Punch Man - Opening" target="_blank" style={{color: "#cccccc", textDecoration: "none"}}>One Punch Man - Opening</a></div>
	  </div>
    </div>
  )
}
export default AnimeInfo