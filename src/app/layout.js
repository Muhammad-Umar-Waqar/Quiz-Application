// app/layout.js




export const metadata = {
  title: 'Test App',
  description: 'A test application for creating and attempting quizzes.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="container mx-auto p-4">
          {children}
        </div>
      </body>
    </html>
  );
}
