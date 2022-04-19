/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
};

// To use optimised images but bypass Next's built in image processor...

// First, install the following packages:

// imagemin-mozjpeg
// imagemin-optipng
// imagemin-svgo
// next-optimized-images

// Next, update the next.config file (this file) with the following wrapped export

// import withOptimizedImages from 'next-optimized-images';

// module.exports = withOptimizedImages({
//   /* config for next-optimized-images */
//   handleImages: ['jpeg', 'png', 'svg'],
//   // your config for other plugins or the general next.js here...
//   reactStrictMode: true,
//   images: {
//     disableStaticImages: true,
//     domains: ['YOUR_DOMAIN_HERE.com'],
//   },
//   async redirects() {
//     return [
//       {
//         source: '/someurlhere',
//         destination: '/',
//         permanent: true,
//       },
//     ];
//   },
// });
