import App from 'next/app'
import Head from 'next/head'
import { GoogleAnalytics } from "nextjs-google-analytics";
import Header from '../components/header'
import Navigation from '../components/Navigation';
import '../styles/globals.css'
import '../styles/blog-post.css'
import '../styles/blog-list.css'
import 'prism-themes/themes/prism-shades-of-purple.css';

function MyApp({ Component, pageProps }) {
	return <>
					<Head>
						<title>Gabe Sousa | Front-End Developer</title>
						<meta name="viewport" content="initial-scale=1.0, width=device-width" />
						<meta name="theme-color" content="#fdced0" media="(prefers-color-scheme: light)"></meta>
						<meta name="theme-color" content="#14112e" media="(prefers-color-scheme: dark)"></meta>
						<link rel="icon" href="/favicon.ico" />
					</Head>
					<GoogleAnalytics trackPageViews />
					<Navigation /> 
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
