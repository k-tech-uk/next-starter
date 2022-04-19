import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';

// Assets
import Logo from '../public/vercel.svg';

export default function Header(): JSX.Element {
  const title = '';
  const desc = '';
  const ogImgRelativePath = '/image-name-here.png';
  const keywords = '';
  const classification = '';

  const siteURL = 'https://mydomainhere.com';
  const ogImageURL = `${siteURL}${ogImgRelativePath}`;
  const pathName = useRouter().pathname;
  const pageURL = pathName === '/' ? siteURL : siteURL + pathName;
  const twitterHandle = '@';
  const siteName = '';
  const locale = 'en_gb';

  return (
    <header>
      <NextSeo
        title={title}
        description={desc}
        canonical={pageURL}
        openGraph={{
          type: 'website',
          locale: locale, //  Default is en_US
          url: pageURL,
          title,
          description: desc,
          images: [
            {
              url: ogImageURL,
              width: 1200,
              height: 630,
              alt: 'SOME_ALT_FOR_SITES_DEFAULT_IMAGE',
            },
          ],
          site_name: siteName,
        }}
        twitter={{
          handle: twitterHandle,
          site: twitterHandle,
          cardType: 'summary_large_image',
        }}
        additionalMetaTags={[
          {
            property: 'author',
            content: title,
          },
          {
            property: 'google-site-verification',
            content: 'ENTER_YOUR_VERIFICATION_IF_APPLICABLE',
          },
          {
            property: 'msvalidate.01',
            content: 'ENTER_YOUR_VERIFICATION_IF_APPLICABLE',
          },
          {
            httpEquiv: 'x-ua-compatible',
            content: 'IE=edge',
          },
          {
            property: 'keywords',
            content: keywords,
          },
          {
            property: 'classification',
            content: classification,
          },
          {
            property: 'copyright',
            content: `Copyright ${siteName} - All rights reserved.`,
          },
          {
            property: 'designer',
            content: 'DESIGNER_DETAILS_HERE',
          },
          {
            property: 'distribution',
            content: 'Global',
          },
          {
            property: 'publisher',
            content: 'PUBLISHER_DETAILS_HERE',
          },
          {
            property: 'rating',
            content: 'General',
          },
          {
            property: 'resource-type',
            content: 'Document',
          },
          {
            property: 'revisit-after',
            content: '3',
          },
          {
            property: 'subject',
            content: classification,
          },
        ]}
        additionalLinkTags={[
          {
            rel: 'icon',
            href: `${siteURL}/favicon.ico`,
          },
          {
            rel: 'icon',
            href: `${siteURL}/favicon-16x16.png`,
            sizes: '16x16',
          },
          {
            rel: 'icon',
            href: `${siteURL}/favicon-32x32.png`,
            sizes: '32x32',
          },
          {
            rel: 'preconnect',
            href: 'https://fonts.googleapis.com',
          },
          {
            rel: 'preconnect',
            href: 'https://fonts.gstatic.com',
          },
          // Import any external fonts you like here...
          // {
          //   rel: 'stylesheet',
          //   href: 'https://fonts.googleapis.com/css2?family=Assistant:wght@300;400;500;600;700;800&family=Open+Sans:wght@300;400;500;600;700;800&display=swap',
          // },
          {
            rel: 'manifest',
            href: `${siteURL}/site.manifest`,
          },
          {
            rel: 'apple-touch-icon',
            href: `${siteURL}/apple-touch-icon.png`,
          },
        ]}
      />
      <div className="container flex justify-between items-center">
        <Link href="/">
          <a>
            <Image
              src={Logo}
              alt="your logo here"
              // width={500} automatically provided
              // height={500} automatically provided
              // blurDataURL="data:..." automatically provided
              // placeholder="blur" // Optional blur-up while loading
            />
          </a>
        </Link>
        <nav>
          <Link href="/">
            <a>Home</a>
          </Link>
        </nav>
      </div>
    </header>
  );
}
