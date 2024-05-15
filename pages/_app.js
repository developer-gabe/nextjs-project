import App from 'next/app'
import Head from 'next/head'
import { Analytics } from "@vercel/analytics/react"
import Navigation from '../components/Navigation';
import '../styles/globals.css'
import '../styles/blog-post.css'
import '../styles/blog-list.css'
import 'prism-themes/themes/prism-shades-of-purple.css';

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Analytics />
            <Head>
                <title>Gabe Araujo Sousa | Front-End Developer</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="theme-color" content="#fdced0" media="(prefers-color-scheme: light)"></meta>
                <meta name="theme-color" content="#14112e" media="(prefers-color-scheme: dark)"></meta>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navigation /> 
            <Component {...pageProps} />
          <footer>GARAUXO.com | {new Date().getFullYear()}</footer>
            <Analytics />
        </>
    );
}

MyApp.getInitialProps = async (appContext) => {
    const appProps = await App.getInitialProps(appContext)

    return { ...appProps }
}

export default MyApp