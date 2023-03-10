import App from 'next/app'
import '../styles/globals.css'
import Header from '../components/header'
import Canvas from '../components/canvas';

function MyApp({ Component, pageProps }) {
	return <>
					<Header /> 
					<Component {...pageProps} />
					<footer>GabeSousa.com 2023</footer>
					<Canvas />
				</>
}

MyApp.getInitialProps = async (appContext) => {
	// calls page's `getInitialProps` and fills `appProps.pageProps`
	const appProps = await App.getInitialProps(appContext)

	return { ...appProps }
}

export default MyApp
