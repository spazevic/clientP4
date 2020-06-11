import React, { useEffect, useState } from 'react'

const Home = props => {


  return (
    <div>
        <h2>WELCOME TO ANIMANIA</h2>
      <div class="leeDrops">
      </div>
      <div class="soundCloud">
        <iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/677661183&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>
        <div style={{ fontSize: "10px", color: "#cccccc", lineBreak: "anywhere", wordBreak: "normal", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", fontFamily: "Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif", fontWeight: "100" }}>
          <a href="https://soundcloud.com/alu-kawaii" title="Alu Kawaii" target="_blank" style={{ color: "#cccccc", textDecoration: "none" }}>Alu Kawaii</a> · <a href="https://soundcloud.com/alu-kawaii/demon-slayer-kimetsu-no-yaiba" title="Demon Slayer: Kimetsu no Yaiba EP 19 Ending Full 『Kamado Tanjiro no Uta』" target="_blank" style={{ color: "#cccccc", textDecoration: "none" }}>Demon Slayer: Kimetsu no Yaiba EP 19 Ending Full 『Kamado Tanjiro no Uta』</a></div>
      </div>
    </div>
  )
}

export default Home
