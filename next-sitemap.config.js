/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.NEXT_PUBLIC_MP_DOMAIN || 'https://example.com',
    generateRobotsTxt: true, // (optional)
    // ...other options
}