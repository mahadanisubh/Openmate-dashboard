import './globals.css';

export const metadata = {
  title: 'OpenMate — Your website should answer customers',
  description:
    'OpenMate turns your business knowledge into a 24/7 AI assistant for your website. Add one script, connect your knowledge, and start helping customers in minutes.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
