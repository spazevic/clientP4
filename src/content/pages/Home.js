import React, {useEffect, useState} from 'react'


const Home = props => {
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
      <h2>HOME STUB</h2>
    </div>
  )
}

export default Home
