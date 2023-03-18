import App from 'next/app'
import '../styles/globals.css'
import Header from '../components/header'
import '../styles/blog-post.css'
import '../styles/blog-list.css'
import 'prism-themes/themes/prism-shades-of-purple.css';

function MyApp({ Component, pageProps }) {
	return <>
					<Header /> 
					<Component {...pageProps} />
					<footer>GabeSousa.com 2023</footer>
				</>
}

MyApp.getInitialProps = async (appContext) => {
	// calls page's `getInitialProps` and fills `appProps.pageProps`
	const appProps = await App.getInitialProps(appContext)

	return { ...appProps }
}

export default MyApp
