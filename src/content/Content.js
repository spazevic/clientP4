// Packages
import React, {useState} from 'react'
import { Route } from 'react-router-dom'

// Custom components
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Signup from './pages/Signup'
import AnimeSearch from './pages/AnimeSearch'
import AnimeInfo from './pages/AnimeInfo'
import EditProfile from './pages/EditProfile'



const Content = props => {
  let [animeId, setAnimeId] = useState()

  const getAnimeId = (id) => {
    console.log('this is working', id)
    setAnimeId(id)
  }

  return (
    <div className="container">
      <Route exact path="/" component={Home} />
      <Route path="/login" render={
        () => <Login user={props.user} updateToken={props.updateToken} />
      } />
      <Route path="/profile" render={
        () => <Profile user={props.user} getAnimeId={getAnimeId}/>
      } />
      <Route path="/anime" render={
        () => <AnimeSearch user={props.user} getAnimeId={getAnimeId}/>
      } />
      <Route path="/animeinfo" render={
        () => <AnimeInfo user={props.user} animeId = {animeId}/>
      } />
      <Route path="/signup" render={
        () => <Signup user={props.user} updateToken={props.updateToken} />
      } />
       <Route path="/editprofile" render={
        () => <EditProfile user={props.user}  />
      } />
    </div>
  )
}

export default Content
