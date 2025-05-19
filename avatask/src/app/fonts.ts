import localFont from 'next/font/local';
import { Victor_Mono } from 'next/font/google';

// Import MonaSans-Bold as a local font
export const monaSans = localFont({
  src: '../../fonts/MonaSans-Bold.woff',
  variable: '--font-mona-sans',
  display: 'swap',
});

// Import Victor Mono from Google Fonts
export const victorMono = Victor_Mono({
  subsets: ['latin'],
  variable: '--font-victor-mono',
  display: 'swap',
});
