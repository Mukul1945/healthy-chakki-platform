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

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={outfit.variable}>
      <body className="min-h-screen flex flex-col bg-[#fffbeb]">
        <Providers>
          <ConditionalLayout>{children}</ConditionalLayout>
        </Providers>
      </body>
    </html>
  );
}
