import {
  CSSReset,
  ChakraProvider,
  ColorModeScript,
  extendTheme,
} from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { Provider as JotaiProvider, useAtom } from 'jotai';
import { uiTheme } from '@/store/ui';
import Head from 'next/head';
import '@fontsource/inter/400.css';
import '@fontsource/inter/100.css';
import '@fontsource/inter/800.css';

// 2. Add your color mode config
const config = {
  initialColorMode: 'light',
  useSystemColorMode: true,
};

const colors = {
  BluePrimary: {
    100: '#F7FAFC',
    200: '#47ABF7',
    500: '#1572E9',
  },
  GreenPrimary: {
    50: '#F4F9F4',
    100: '#ECFCF3',
    200: '#3FCE36',
    300: '#21D173',
    400: '#0F8445',
    500: '#025628',
    600: '#0F8445',
    700: '#025628',
    800: '#285E61',
    900: '#00411E',
  },
  GrayPrimary: {
    50: '#F7FAFC',
    600: '#828282',
  },
  OrangePrimary: {
    400: '#FFF3E4',
    500: '#FFFBE4',
    600: '#FEBD1E',
  },
  BlackPrimary: {
    200: 'rgba(75,75,75,0.38)',
    700: 'rgba(0, 0, 0, 0.64)',
    800: 'rgba(0, 0, 0, 0.80)',
    400: '#2D3748',
  },
};

// 3. extend the theme
export const customTheme = extendTheme({
  colors,
  config,
  fonts: {
    heading: `'Inter', sans-serif`,
    body: `'Inter', sans-serif`,
  },
  components: {
    Text: {
      color: 'white',
      variants: {
        normal: {
          color: 'white',
          fontSize: '13px',
        },
        _dark: {
          color: 'black',
        },
      },
    },
    Button: {
      variants: {
        white: {
          bg: 'white',
          border: '1px',
          borderColor: 'gray.400',
        },
      },
    },
    Input: {
      variants: {
        normal: {
          borderColor: 'BlackPrimary.800',
        },
      },
    },
  },
  styles: {
    global: {
      '#__next::-webkit-scrollbar': {
        heigt: '6px',
        width: '6px',
      },
      '#__next::-webkit-scrollbar-thumb': {
        background: '#FFFFFF',
      },
    },
  },
});

export const AppHead = () => {
  return (
    <Head>
      <title>{'BISMILLAH 🤍'}</title>
      <meta name="google" content="notranslate" />
      <link rel="shortcut icon" href="/favicon/favicon.ico" />
      <link rel="icon" href="/favicon/vercel.svg" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicon/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon/favicon-16x16.png"
      />
    </Head>
  );
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <AppHead />
      <ChakraProvider theme={customTheme}>
        <CSSReset />
        <JotaiProvider>
          <Component {...pageProps} />
        </JotaiProvider>
      </ChakraProvider>
    </>
  );
}
