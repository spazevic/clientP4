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
    </div>
  )
}
export default Anime