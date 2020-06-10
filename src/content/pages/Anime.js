import React, {useEffect, useState} from 'react'
const Anime = props => {

	useEffect(() => {
		getAnimeData()
	}, [])
	const getAnimeData = () => {
		fetch('https://api.jikan.moe/v3/search/anime?q=Naruto&page=1')
		.then(response => response.json())
		.then(data => {
			console.log(data)
		})
		.catch(err => {
			console.log(err)
		})
	}
  return (
    <div>
      Anime Stub!
      <form>
      	
      </form>
	<div>
	<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/243461659&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>
	<div style={{fontSize: "10px", color: "#cccccc",lineBreak: "anywhere", wordBreak: "normal", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", fontFamily: "Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif", fontWeight: "100"}}>
	<a href="https://soundcloud.com/user-198341359" title="Bl00dfalcon" target="_blank" style={{color: "#cccccc", textDecoration: "none"}}>Bl00dfalcon</a> · <a href="https://soundcloud.com/user-198341359/beautiful-green-wild-beast-naruto-ost" title="Beautiful Green Wild Beast - Naruto OST" target="_blank" style={{color: "#cccccc", textDecoration: "none"}}>Beautiful Green Wild Beast - Naruto OST</a></div>
	</div>
    </div>
  )
}
export default Anime