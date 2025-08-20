import App from 'next/app'
import Head from 'next/head'
import { Analytics } from "@vercel/analytics/react"
import { WindowProvider, useWindows } from '../lib/WindowContext';
import WindowManager from '../components/WindowManager';
import Navigation from '../components/Navigation';
import Dock from '../components/Dock';
import BlogPost from '../components/blog-post';
import '../styles/globals.css'
import '../styles/blog-post.css'
import '../styles/blog-list.css'
import 'prism-themes/themes/prism-shades-of-purple.css';

function AppContent({ Component, pageProps }) {
  const { openWindow } = useWindows();

  const handleOpenPost = (post) => {
    openWindow(<BlogPost post={post} />, post.title);
  };

  // Try to get blog data from pageProps if available (like on home page)
  const allPostsData = pageProps.allPostsData || [];

  return (
    <>
      <WindowManager />  
      <Navigation /> 
      <Component {...pageProps} />
      <Dock allPostsData={allPostsData} onOpenPost={handleOpenPost} />
    </>
  );
}

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Analytics />
            <Head>
                <title>Gabe Araujo Sousa | Front-End Developer</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
                <meta name="theme-color" content="#fdced0" media="(prefers-color-scheme: light)"></meta>
                <meta name="theme-color" content="#14112e" media="(prefers-color-scheme: dark)"></meta>
                <link rel="icon" href="/favicon.ico" />
            </Head>
						<WindowProvider>
              <AppContent Component={Component} pageProps={pageProps} />
						</WindowProvider>
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