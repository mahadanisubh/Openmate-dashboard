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
        {/* Preload the display face: the above-the-fold headings wait on it. It is one variable TTF
         * carrying all nine weights, so this single request covers every display weight. */}
        <link rel="preload" href="/fonts/Nohemi-VF-BF6438cc58ad63d.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
