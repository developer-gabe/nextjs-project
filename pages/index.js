import Bio from '../components/bio';

export default function Home() {
  return (
      <main>
				<Bio 
					userName="Gabe Sousa"
					userImage="/images/gabe.jpg"
					userTitle="Web Developer"
					userBio="I have a strong background in web development and have experience in various technologies and frameworks such as React, Vue.js and WordPress. I have a proven track record of delivering high-quality work, as demonstrated by my experience in developing SPAs, custom landing pages, email templates, and HTML5 animations."
				/>

				{/* <Bio 
					userName="Arthur Morgan"
					userImage="/images/arthur.jpg"
					userTitle="Outlaw"
					userBio="Arthur Morgan is a fictional character and the main protagonist of Rockstar Games' 2018 video game Red Dead Redemption 2. He is voiced by Roger Clark and portrayed by Dutch actor Rob Wiethoff."
				/> */}
      </main>
  )
}
