// Import packages
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import jwtDecode from 'jwt-decode'

// Resources and custom components
import './App.css';
import Content from './content/Content'
import Footer from './nav/Footer'
// import Header from './nav/Header'
import Nav from './nav/Nav'

const App = props => {
  // Declare state variables
  let [user, setUser] = useState(null)

  useEffect(() => {
    decodeToken()
  }, [])

  const decodeToken = () => {
    let token = localStorage.getItem('boilerToken')

    if (token) {
      let decodedUser = jwtDecode(token)

      if (!decodedUser || Date.now() > decodedUser.exp * 1000) {
        console.log('Expired or bad token')
        setUser(null)
      } else {
        console.log('User and token are good')
        setUser(decodedUser)
      }
    } else {
      console.log('There was no token')
      setUser(null)
    }
  }

  const updateToken = (newToken) => {
    //set the new token into localstorage
    localStorage.setItem('boilerToken', newToken || "")

    decodeToken()
  }

  return (
    <Router>
      <div className="App">
        <Nav user={user} updateToken={updateToken} />
        {/* <Header /> */}
        <main>
          <Content user={user} updateToken={updateToken}/>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
