import React, { useEffect, useState } from 'react'

const Home = props => {


  return (
    <div>
        <h2>WELCOME TO ANIMANIA</h2>
      <div class="leeDrops">
      </div>
      <div class="soundCloud">
      <iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/674088104&color=%23b98eef&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>
      <div style={{fontSize: "10px", color: "#cccccc",lineBreak: "anywhere", wordBreak: "normal", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", fontFamily: "Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif", fontWeight: "100"}}>
      <a href="https://soundcloud.com/nico-music-972969236" title="Nico Music" target="_blank" style={{color: "#cccccc", textDecoration: "none"}}>Nico Music</a> · <a href="https://soundcloud.com/nico-music-972969236/demon-slayer-kimetsu-no-yaiba-ending-full-ep-19-kamado-tanjiro-no-uta" title="Demon Slayer: Kimetsu no Yaiba EP 19 Ending Full  - 『Kamado Tanjiro no Uta』" target="_blank" style={{color: "#cccccc", textDecoration: "none"}}>Demon Slayer: Kimetsu no Yaiba EP 19 Ending Full  - 『Kamado Tanjiro no Uta』</a></div>
      </div>
    </div>
  )
}

export default Home
