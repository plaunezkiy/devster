import Navbar from "@/components/Navbar/Navbar";
import StoreProvider from "@/lib/store/StoreProvider";
import "./globals.css";
import ThemeProvider from "@/components/Providers/ThemeProvider";
import Footer from "@/components/Footer/Footer";

export const metadata = {
  title: "Devster",
  description: "Nik Peleshaty's personal blog",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StoreProvider>
      <ThemeProvider>
        <body className="font-sans dark:bg-zinc-800 duration-300 text-gray-700 dark:text-gray-200">
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex flex-grow md:px-[10%] px-4 mb-12">{children}</div>
            <Footer />
          </div>
        </body>
      </ThemeProvider>
    </StoreProvider>
  );
}
