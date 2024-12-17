export const metadata = {
    title: "Volvo App Varun",
    description: "Volvo App by Varun for Inteview purpose only on 17-12-2024",
  };
  
  export default function RootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <html lang="en">
        <body>{children}</body>
      </html>
    );
  }