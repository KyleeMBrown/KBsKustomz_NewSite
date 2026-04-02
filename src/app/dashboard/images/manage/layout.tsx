export const dynamic = 'force-dynamic';
export const metadata = {
    robots: {
        index: false,
        follow: false,
    }
}

  export default function RootLayout({ children }) {
    return ( 
        <div>
          {children}
        </div>
    );
  }
  