import './styles.css'
import logo from './logo.png'
import stone from './jerusalemStone.jpg'
import Container from './Container.js';

const Story = () => {
    return(
        <div className='page'>
      <div className='top-border'>
        <img className='logo' src={logo} />
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%', marginTop: '20px', justifyContent: 'space-between' }}>
          <h5>Menu</h5>
          <h5>Our Story</h5>
          <h5>Order Online</h5>
          <h5>Reserve a Table</h5>
        </div>
      </div>

      <div style={{height: '100vh', position: 'relative', marginTop:'-40px', paddingTop:'50px'}}>  
      <img src={stone} style={{height: '100%', width: '100%', position: 'absolute', top: '0', left: '0', zIndex: '-1'}}/>

      <Container backgroundColor="glass" style={{position: 'relative', zIndex: '5', marginTop: '50px'}}>
        <h3>
        It was 1949, somewhere just outside of Istanbul, Turkey. My father’s uncle, Yona, whom he would later be named for, had just been stabbed to death in the street. My grandfather, a quiet and physically unimposing man, charted a course for his family. His wife, my grandmother, had just given birth to their sixth child. They were accumulating wealth thanks to their thriving farm, but there was a growing sense that they would never be safe in their homeland. My grandfather decided that they would make the pilgrimage to the newly formed land of Israel. They left immediately.

Carrying only necessities and the money they would spend entirely securing their safe passage, they traveled to their new home. When they arrived, they found a one-bedroom apartment with a dirt floor, among the other poor Sephardic Jews who had come to seek refuge from an increasingly hostile Arab world. They were Arabs, culturally speaking, but now they would be Israelis.

In 1950, two years after the nation of Israel was created, my father was born. My grandfather had opened a stall in the Machane Yehuda Market, walking distance from their apartment. Food was scarce. Space was tight. The dream of a new life had not yet become a reality for my family.

My grandmother was an imposing woman by any measure. She was tall
and strong. She was hard and tough. She was a true matriarch. Food was her warmth. My grandmother mastered the art of peasant food. She turned simple and humble ingredients into dishes with deep flavor that soothed your soul and transformed your circumstances. It was no accident that my grand- mother was called Simcha, her cooking brought joy and celebration.

I never spent a lot of time with my grandmother. My father was the only member of his family to leave Israel for America, and I grew up far away from our family. She passed away when I was four. I remember where I was standing when my father got the news. My mom packed his suitcase while I watched him sob. It was the only time I’d seen him cry.

Still, my grandmother and I have always been close. My father has spent his life cooking. He started teaching me to cook when I was very young. Long before I understood technique or science, I understood that my dad’s Amer- icanized dishes possessed my grandmother’s Turkish soul. The way toasted paprika melts into olive oil when eggplant salad is folded together is no dif- ferent than the way chorizo sweats and coats farfalle. That is what I learned to love about cooking food, making it feel like something.

Israeli cuisine is at a crossroads. Great chefs have introduced the many cultural dishes of the nation to the world’s stage and America has embraced our unique blend of Mediterranean and Middle Eastern foods. Some of the best restaurants in America pay tribute to Israel and all that it has to offer. Modern Israeli food is everywhere.

In true Israeli fashion, I have little interest in the status quo. I want to innovate. I want to create. I want to feature the fearless flavors of Israeli food and take them somewhere new. I want to reimagine; I want to cross boundaries. Now is the time to move Israeli cuisine past the modern and into the future.

With far less urgency and under much less dramatic circumstances, I find myself asking the same questions that my grandfather asked that night in Turkey: What’s next? Where do I go from here? How do I move forward? Just as he did almost seventy years ago, I find my answer in Simcha.

​

Intro, The Simcha Cookbook.  -Avi Shemtov.
        </h3>
        
        </Container>
      </div>
      </div>
    );
}

export default Story;