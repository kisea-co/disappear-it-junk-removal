import type { Metadata } from 'next';
import { Montserrat, Barlow_Condensed } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const sans = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
});

const display = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Disappear It Junk & Trash Removal | Atlanta, GA',
  description: 'Professional junk removal for homes and businesses throughout Atlanta and surrounding metro areas. Request a quote from Disappear It Junk & Trash Removal.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <style>{`
          :root {
            --gold: #bf9000;
            --gold-soft: #bf9000;
          }
          .eyebrow.dark {
            color: #bf9000 !important;
          }
          .section {
            padding-top: 64px !important;
            padding-bottom: 86px !important;
          }
          .page-hero {
            padding-top: 58px !important;
            padding-bottom: 54px !important;
          }
          .commercial-section {
            padding-top: 62px !important;
            padding-bottom: 82px !important;
          }
          .final-cta {
            padding-top: 56px !important;
            padding-bottom: 66px !important;
          }
          @media (max-width: 720px) {
            .section {
              padding-top: 52px !important;
              padding-bottom: 66px !important;
            }
            .page-hero {
              padding-top: 48px !important;
              padding-bottom: 44px !important;
            }
            .commercial-section {
              padding-top: 50px !important;
              padding-bottom: 64px !important;
            }
            .hero-media {
              min-height: 0 !important;
              aspect-ratio: auto !important;
              overflow: visible !important;
              background: transparent !important;
              border: 0 !important;
            }
            .hero-media img,
            .photo-card img,
            .project-photo img {
              position: static !important;
              display: block !important;
              width: 100% !important;
              height: auto !important;
              max-width: 100% !important;
              object-fit: unset !important;
              opacity: 1 !important;
              visibility: visible !important;
            }
            .photo-card,
            .work-large,
            .work-stack > div,
            .project-photo {
              display: block !important;
              width: 100% !important;
              min-height: 0 !important;
              height: auto !important;
              overflow: visible !important;
            }
            .work-showcase,
            .work-stack,
            .before-after {
              display: grid !important;
              grid-template-columns: 1fr !important;
              height: auto !important;
            }
          }
        `}</style>
      </body>
    </html>
  );
}
