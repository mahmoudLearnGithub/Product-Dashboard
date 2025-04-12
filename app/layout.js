export default function RootLayout({ children }) {

  
  return (
    <html lang="en">
      <body className="p-8 bg-gray-100">
        <main className="max-w-4xl mx-auto">{children}</main>
      </body>
    </html>
  );
}
