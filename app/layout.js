import './globals.css';

export const metadata = {
  title: 'SyncRoom — Listen Together',
  description:
    'Real-time synchronized music playback across devices. Create a room, share the code, and listen together from anywhere in the world.',
  keywords: ['music', 'sync', 'listen together', 'real-time', 'peer-to-peer'],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
