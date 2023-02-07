import App from 'next/app'
import '../styles/globals.css'
import Header from '../components/header'

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

// The component takes in two props, 'Component' and 'pageProps', and passes them down to the 'Component' being rendered.
// The 'MyApp' component implements the 'getInitialProps' method which is an async function that is called during the server-side rendering process to retrieve initial data for the page.
// The method calls the 'getInitialProps' method of the 'App' component and retrieves the 'appProps' object.
// The method then returns an object that spreads the 'appProps' object, effectively passing down any initial props from the 'App' component to the 'MyApp' component.