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

export const getSortedPostsData = () => {
  const fileNames = getCleanedPostFileNames();
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // convert the date to a string
    matterResult.data.date = matterResult.data.date.toString();

    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    };
  });

  return allPostsData
    .filter((post) => post.published === null || post.published !== false)
    .sort((a, b) => {
      return new Date(a.date).getTime() < new Date(b.date).getTime() ? 1 : -1;
    });
};

export const getAllPostIds = () => {
  const fileNames = getCleanedPostFileNames();
  return fileNames.map((fileName) => ({
    params: {
      id: fileName.replace(/\.md/, ''),
    },
  }));
};

export const getPostData = async (id) => {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const matterResult = matter(fileContents);

  matterResult.data.date = matterResult.data.date.toString();

  const processedContent = await remark().use(html).process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
};

export const getAllPostsXmlData = async () => {
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
      const contentHtml = processedContent.toString();

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
