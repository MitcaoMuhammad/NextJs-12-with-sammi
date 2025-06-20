import { CacheProvider, EmotionCache } from '@emotion/react'
import 'src/styles/globals.css'
import 'nprogress/nprogress.css'
import type { AppProps } from 'next/app'
import { Roboto } from 'next/font/google'
import createEmotionCache from 'src/helpers/create-emotion-cache'
import Head from 'next/head'
import { ThemeProvider } from '@mui/material/styles'
import theme from 'src/helpers/theme'
import { CssBaseline } from '@mui/material'
import NProgress from 'nprogress'
import { useEffect } from 'react'
import Router from 'next/router'

const roboto = Roboto({
	subsets: ['latin'],
	weight: ['300', '400', '500', '700'],
	style: ['normal', 'italic'],
})

const clientSideEmotionCach = createEmotionCache()

export interface MyAppProps extends AppProps {
	emotionCache?: EmotionCache
}

function MyApp(props: MyAppProps) {
	const { Component, emotionCache = clientSideEmotionCach, pageProps } = props

	useEffect(() => {
		const handleRouteStart = () => NProgress.start()
		const handleRouteDone = () => NProgress.done()

		Router.events.on('routeChangeStart', handleRouteStart)
		Router.events.on('routeChangeComplete', handleRouteDone)
		Router.events.on('routeChangeError', handleRouteDone)

		return () => {
			Router.events.off('routeChangeStart', handleRouteStart)
			Router.events.off('routeChangeComplete', handleRouteDone)
			Router.events.off('routeChangeError', handleRouteDone)
		}
	}, [])

	return (
		<CacheProvider value={emotionCache}>
			<Head>
				<meta name='viewport' content='initial-scale=1, width=device-width' />
			</Head>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Component {...pageProps} />
			</ThemeProvider>
		</CacheProvider>
	)
}

export default MyApp
