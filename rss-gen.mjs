// const fs = require('fs');
// const path = require('path');
// const matter = require('gray-matter');
// const remark = require('remark');
// const html = require('remark-html');

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');

const getCleanedPostFileNames = () => {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.filter((fileName) => fileName !== '.DS_Store');
};

const getAllPostsXmlData = async () => {
  const fileNames = getCleanedPostFileNames();
  const allPostsData = await Promise.all(
    fileNames.map(async (fileName) => {
      // Remove ".md" from file name to get id
      const id = fileName.replace(/\.md$/, '');

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);

      // convert the date to a string
      matterResult.data.date = matterResult.data.date.toString();

      const processedContent = await remark().use(html).process(matterResult.content);

      // process any CDATA trailing tags (i.e. ']]>') as they break the feed...
      const contentHtml = processedContent.toString().replace(/]]>/g, ']]]]><![CDATA[>');

      // Combine the data with the id
      return {
        id,
        contentHtml,
        ...matterResult.data,
      };
    })
  );

  return allPostsData
    .filter((post) => post.published === null || post.published !== false)
    .sort((a, b) => {
      return new Date(a.date).getTime() < new Date(b.date).getTime() ? 1 : -1;
    });
};

const blogPostsRssXml = (blogPosts) => {
  let latestPostDate = '';
  let rssItemsXml = '';
  blogPosts.forEach((post) => {
    const postDate = Date.parse(post.date);
    const postHref = `https://YOUR_SITE_DOMAIN/blog/${post.id}`;
    if (!latestPostDate || postDate > Date.parse(latestPostDate)) {
      latestPostDate = post.date;
    }
    rssItemsXml += `
      <item>
        <title><![CDATA[ ${post.title} ]]></title>
        <link>${postHref}</link>
        <pubDate>${post.date}</pubDate>
        <guid isPermaLink="false">${postHref}</guid>
        <description>
        <![CDATA[ ${post.description} ]]>
        </description>
        <content:encoded>
          <![CDATA[ ${post.contentHtml} ]]>
        </content:encoded>
    </item>`;
  });
  return {
    rssItemsXml,
    latestPostDate,
  };
};

const getRssXml = (blogPosts) => {
  const { rssItemsXml, latestPostDate } = blogPostsRssXml(blogPosts);
  return `<?xml version="1.0" ?>
  <rss
    xmlns:dc="http://purl.org/dc/elements/1.1/"
    xmlns:content="http://purl.org/rss/1.0/modules/content/"
    xmlns:atom="http://www.w3.org/2005/Atom"
    version="2.0"
  >
    <channel>
        <title><![CDATA[ articles by YOUR_NAME_HERE ]]></title>
        <link>https://YOUR_DOMAIN_HERE</link>
        <description>
          <![CDATA[ PUT_YOUR_DESCRIPTION_HERE ]]>
        </description>
        <language>en</language>
        <lastBuildDate>${latestPostDate}</lastBuildDate>
        ${rssItemsXml}
    </channel>
  </rss>`;
};

async function generateRSS() {
  const allBlogPostData = await getAllPostsXmlData();
  const processedXml = getRssXml(allBlogPostData);

  const staticOutputPath = path.join(process.cwd(), 'out');

  fs.writeFile(`${staticOutputPath}/rss.xml`, processedXml, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('File written successfully');
    }
  });
}

// kick it all off
generateRSS();
