import { ProductContextProvider } from '@/components/ProductContext'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (<ProductContextProvider>
      <Component {...pageProps} />
  </ProductContextProvider>)
  

}
