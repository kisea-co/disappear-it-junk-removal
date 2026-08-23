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
            --gold: #c89a3a;
            --gold-soft: #c89a3a;
          }
          .eyebrow.dark {
            color: #c89a3a !important;
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

          /* Trust strip: substantial 4-across strip on desktop + tablet */
          .trust-grid {
            grid-template-columns: repeat(4, 1fr) !important;
            min-height: 104px !important;
          }
          .trust-item {
            min-height: 104px !important;
            padding: 18px 22px !important;
            justify-content: center !important;
            gap: 14px !important;
            border-right: 1px solid var(--line) !important;
            border-bottom: 0 !important;
          }
          .trust-item:last-child {
            border-right: 0 !important;
          }
          .trust-item svg {
            width: 32px !important;
            height: 32px !important;
            flex: 0 0 32px !important;
          }
          .trust-item strong {
            font-size: .7rem !important;
            letter-spacing: .12em !important;
          }
          .trust-item span {
            font-size: .73rem !important;
            line-height: 1.4 !important;
          }

          @media (min-width: 721px) and (max-width: 920px) {
            .trust-grid {
              grid-template-columns: repeat(4, 1fr) !important;
            }
            .trust-item {
              min-height: 102px !important;
              padding: 16px 14px !important;
              gap: 10px !important;
              border-bottom: 0 !important;
            }
            .trust-item:nth-child(2) {
              border-right: 1px solid var(--line) !important;
            }
            .trust-item svg {
              width: 29px !important;
              height: 29px !important;
              flex-basis: 29px !important;
            }
            .trust-item strong {
              font-size: .64rem !important;
              letter-spacing: .09em !important;
            }
            .trust-item span {
              font-size: .67rem !important;
            }
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

            /* Mobile only: larger 2x2 trust cards */
            .trust-grid {
              grid-template-columns: repeat(2, 1fr) !important;
              min-height: 0 !important;
            }
            .trust-item {
              min-height: 128px !important;
              padding: 22px 16px !important;
              justify-content: flex-start !important;
              gap: 14px !important;
              border-bottom: 1px solid var(--line) !important;
            }
            .trust-item:nth-child(2n) {
              border-right: 0 !important;
            }
            .trust-item:nth-last-child(-n + 2) {
              border-bottom: 0 !important;
            }
            .trust-item svg {
              width: 35px !important;
              height: 35px !important;
              flex-basis: 35px !important;
            }
            .trust-item strong {
              font-size: .72rem !important;
              letter-spacing: .1em !important;
            }
            .trust-item span {
              font-size: .75rem !important;
              line-height: 1.45 !important;
            }
          }
        `}</style>
      </body>
    </html>
  );
}
