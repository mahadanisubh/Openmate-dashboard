import './globals.css';

export const metadata = {
  title: 'OpenMate - Your website should answer customers',
  description:
    'OpenMate turns your business knowledge into a 24/7 AI assistant for your website. Add one script, connect your knowledge, and start helping customers in minutes.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Preload the display face — above-the-fold headings wait on it; one variable TTF covers all nine weights in a single request. */}
        <link rel="preload" href="/fonts/Nohemi-VF-BF6438cc58ad63d.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
