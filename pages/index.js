import Bio from '../components/bio';

export default function Home() {
  return (
      <main>
				<Bio 
					userName="Gabe Sousa"
					userImage="/images/gabe.jpg"
					userTitle="Front-End Developer"
					userBio="Howdy! I'm a developer with experience in all sorts of technologies and frameworks like React, Vue.js, and even good ol' WordPress. I've got a knack for delivering top-notch work, and I've engineered all sorts of cool stuff, like SPAs, custom landing pages, email templates, and even some sweet web animations. Let's build something awesome together!"
				/>

      </main>
  )
}
