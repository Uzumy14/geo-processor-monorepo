export const metadata = {
  title: "Geo Processor",
  description: "Frontend para visualizar centroid y bounds en mapa",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body style={{ margin: 0, fontFamily: "Arial, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
