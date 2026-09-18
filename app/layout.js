export const metadata = {
  title: 'Openmate Dashboard',
  description: 'Tenant administration for Openmate.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
