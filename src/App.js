import React, { useState, useEffect } from 'react';
import { Parallax } from 'react-scroll-parallax';
import BackgroundGrid from './BackgroundGrid.js';
import BackgroundVideo from './BackgroundVideo.js';
import logo from './logo.png'
import './styles.css'
import GoogleDocViewer from './GoogleDocViewer.js';
import axios from 'axios';


const App = () => {

  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    /*
          fetch("/.netlify/functions/googleApiProxy")
      .then(response => response.json())
      .then(data => {
        // put data into array here
      });
    */
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className='page'>
      <div className='top-border'>
        <img className='logo' src={logo} />
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%', marginTop: '20px', justifyContent: 'space-between' }}>
          <h5 style={{ marginLeft: '0', marginRight: '0' }}>Menu</h5>
          <h5>About Us</h5>
          <h5>Calendar</h5>
          <h5>Opentable</h5>
          <h5>Contact Us!</h5>
        </div>
      </div>

      <BackgroundVideo />

      <Parallax translateY={[0, -10]}>
  <div className='opener'>
    <h1>Welcome to Simcha!</h1>
    <button className='bottom-button'>
      <span>↓</span> {/* Replace with an appropriate arrow icon */}
    </button>
  </div>
</Parallax>

      {/*translateY={[75, -100]}*/}
      <Parallax speed={15} opacity={[3, 0]} translateY={[400, 0]}>
        <div className='menu-container' >
          <div>
            <GoogleDocViewer />
          </div>

        </div>
      </Parallax>
      {/*translateY={[240, -170]}*/}
      <Parallax speed={25} opacity={[2.5, 0]}>
        <div className='story-container'>
          <div className='story'>
            It was 1949, somewhere just outside of Istanbul, Turkey. My father’s uncle, Yona, whom he would later be named for, had just been stabbed to death in the street. My grandfather, a quiet and physically unimposing man, charted a course for his family. His wife, my grandmother, had just given birth to their sixth child. They were accumulating wealth thanks to their thriving farm, but there was a growing sense that they would never be safe in their homeland. My grandfather decided that they would make the pilgrimage to the newly formed land of Israel. They left immediately.

            Carrying only necessities and the money they would spend entirely securing their safe passage, they traveled to their new home. When they arrived, they found a one-bedroom apartment with a dirt floor, among the other poor Sephardic Jews who had come to seek refuge from an increasingly hostile Arab world. They were Arabs, culturally speaking, but now they would be Israelis.

            In 1950, two years after the nation of Israel was created, my father was born. My grandfather had opened a stall in the Machane Yehuda Market, walking distance from their apartment. Food was scarce. Space was tight. The dream of a new life had not yet become a reality for my family.

            My grandmother was an imposing woman by any measure. She was tall
            and strong. She was hard and tough. She was a true matriarch. Food was her warmth. My grandmother mastered the art of peasant food. She turned simple and humble ingredients into dishes with deep flavor that soothed your soul and transformed your circumstances. It was no accident that my grand- mother was called Simcha, her cooking brought joy and celebration.

            I never spent a lot of time with my grandmother. My father was the only member of his family to leave Israel for America, and I grew up far away from our family. She passed away when I was four. I remember where I was standing when my father got the news. My mom packed his suitcase while I watched him sob. It was the only time I’d seen him cry.

            Still, my grandmother and I have always been close. My father has spent his life cooking. He started teaching me to cook when I was very young. Long before I understood technique or science, I understood that my dad’s Amer- icanized dishes possessed my grandmother’s Turkish soul. The way toasted paprika melts into olive oil when eggplant salad is folded together is no dif- ferent than the way chorizo sweats and coats farfalle. That is what I learned to love about cooking food, making it feel like something.

            Israeli cuisine is at a crossroads. Great chefs have introduced the many cul- tural dishes of the nation to the world’s stage and America has embraced our unique blend of Mediterranean and Middle Eastern foods. Some of the best restaurants in America pay tribute to Israel and all that it has to offer. Modern Israeli food is everywhere.

            In true Israeli fashion, I have little interest in the status quo. I want to innovate. I want to create. I want to feature the fearless flavors of Israeli food and take them somewhere new. I want to reimagine; I want to cross boundaries. Now is the time to move Israeli cuisine past the modern and into the future.

            With far less urgency and under much less dramatic circumstances, I find myself asking the same questions that my grandfather asked that night in Turkey: What’s next? Where do I go from here? How do I move forward? Just as he did almost seventy years ago, I find my answer in Simcha.

            Intro, The Simcha Cookbook.  -Avi Shemtov.
          </div>
        </div>
      </Parallax>

      <Parallax speed={25} opacity={[2.5, 0]}>
        <div className='element-container'>
          calendurrrrr
          {/*iterate over data in array?*/}
        </div>
      </Parallax>

      <Parallax speed={25} opacity={[2.5, 0]}>
        <div className='element-container'>
          all about that opnetable bb ;);)
        </div>
      </Parallax>

      <Parallax speed={25} opacity={[2.5, 0]}>
        <div className='element-container'>
          like what u see bbg ? ;) well there's more where that came from...
          call me 696-696-9696 ;););)
        </div>
      </Parallax>

    </div>

  );
}

export default App;
