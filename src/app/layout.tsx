/********************************************************************/
/******************Base Layout for KB's Kustomz Site ****************/
/********************************************************************/

import "./globals.css";
import Header from "../Sections/Header";
import Footer from "../Sections/Footer";
import { Work_Sans } from "next/font/google";
import { schemaData } from "../SEO/schemaMarkup";
import Head from "next/head";

const workSans = Work_Sans({
  subsets: ["latin"],
});


export const metadata = {
  title: "KB's Kustomz | Custom Paint and Body Shop| Wyanet, IL",
  description: `KB’s Kustomz is a locally owned custom paint and body shop in Wyanet, IL, 
                owned and operated by Kory Brown. Conveniently located at 13845 1650 N Ave, Wyanet, IL, 
                KB’s Kustomz specializes in custom automotive paint, auto body repair, and custom vehicle 
                enhancements tailored to your vision. Whether you’re looking for a custom paint job, 
                bodywork repairs, or a complete vehicle transformation, KB’s Kustomz delivers high-quality 
                craftsmanship and attention to detail you can trust.`,
};



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        {/* Load the Schema Markup JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaData).replace(/</g, "\\u003c"),
          }}
        />
      </Head>

      <body
        className={`${workSans.className} bg-black font-serif`}
        suppressHydrationWarning
      >
        <Header />
        {children}
        <Footer/>
      </body>
    </html>
  );
}
