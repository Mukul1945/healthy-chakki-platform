import "./globals.css";
import { Outfit } from "next/font/google";
import Providers from "../redux/Providers";
import ConditionalLayout from "../components/common/ConditionalLayout";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata = {
  title: "Healthy Chakki | Fresh Atta & Pure Foods",
  description: "Fresh wheat, bajra & jowar atta ground daily in Greater Noida. No mixing, no preservatives.",
};

import { SocketProvider } from "../context/SocketContext";
import { Toaster } from "react-hot-toast";
import ChatBot from "../components/common/ChatBot";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={outfit.variable}>
      <body className="min-h-screen flex flex-col bg-[#fffbeb] overflow-x-hidden">
        <Providers>
          <SocketProvider>
            <ConditionalLayout>{children}</ConditionalLayout>
            <Toaster position="top-right" reverseOrder={false} />
            <ChatBot />
          </SocketProvider>
        </Providers>
      </body>
    </html>
  );
}
