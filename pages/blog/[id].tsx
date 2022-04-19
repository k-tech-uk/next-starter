import Link from 'next/link';

// components
import Layout from '../../layouts/default';

// helpers
import { getAllPostIds, getPostData, getSortedPostsData } from '../../lib/posts';

export default function Post({ postData, allRelatedPostsData }) {
  return (
    <Layout
      description={postData.description}
      image={postData.featuredimage}
      title={postData.title}
      url={`blog/${postData.id}`}
    >
      <>
        <article className="container article" id="article-content">
          <div className="post-meta">
            <DateDisplay dateString={postData.date} className="has-text-grey-light" />
            <h1>{postData.title}</h1>
          </div>
          <div className="post-content" dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
          <CallToAction {...ctaData} />
        </article>
        <div className="container">
          <div className="author-box section">
            <div className="media is-small">
              <div className="media-left">
                <figure>
                  <img src="/img/38687284.jpg" alt="Rob Kendal" className="avatar fancy-img" />
                </figure>
              </div>
              <div className="media-content">
                <h3 className="subtitle is-size-4">About Rob Kendal</h3>
                <p>
                  Rob Kendal is an award-winning freelance front-end developer and marketer who likes simple, organised
                  thinking and making clever things. You can find him working on some things on{' '}
                  <a href="https://github.com/bpk68" title="rob kendal's github profile">
                    GitHub
                  </a>{' '}
                  and recording podcasts, such as{' '}
                  <a href="https://thefrontendpodcast.site" title="The Front End podcast website">
                    The Front End
                  </a>
                  . Say hi and <a href="https://twitter.com/kendalmintcode">follow me on twitter</a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <h2 className="title is-size-3">Read more</h2>
          {allRelatedPostsData.map(({ id, date, title, featuredimage, description, tags }) => (
            <div className="" key={`${id}_${date}_1`}>
              <div className="media article-list-item">
                <div className="media-left">
                  <Link href={`/blog/${id}`}>
                    <a>
                      <img src={featuredimage} alt={title} className="" />
                    </a>
                  </Link>
                </div>
                <div className="media-content">
                  <DateDisplay dateString={date} className="has-text-grey-light has-text-uppercase" />
                  <h3 className="subtitle is-size-4">
                    <Link href={`/blog/${id}`}>
                      <a>{title}</a>
                    </Link>
                  </h3>
                  <p>{description}</p>
                  <p className="tags">
                    {tags.length > 0 &&
                      tags.map((tag) => (
                        <Link href={`/tags/?tag=${tag}`} key={tag}>
                          <a>
                            <small>#{tag}</small>
                          </a>
                        </Link>
                      ))}
                  </p>
                  <p className="has-text-right">
                    <Link href={`/blog/${id}`}>
                      <a>read the full article</a>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    </Layout>
  );
}

const hasRelatedTags = (mainPostTags, loopPostTags) => {
  let matchingTags = loopPostTags.length > 0;

  matchingTags = loopPostTags.some((tag) => mainPostTags.includes(tag));

  return matchingTags;
};

export async function getStaticPaths() {
  // Return a list of possible value for id
  const paths = getAllPostIds();
  return {
    fallback: false,
    paths,
  };
}

export async function getStaticProps({ params }) {
  // Fetch necessary data for the blog post using params.id
  const postData = await getPostData(params.id);
  const allPostsData = await getSortedPostsData();
  let allRelatedPostsData = [];

  try {
    allRelatedPostsData = allPostsData
      .filter((post) => post.id !== params.id && hasRelatedTags(postData.tags, post.tags))
      .slice(0, 3);
  } catch (err) {
    allRelatedPostsData = [];
  }

  return {
    props: {
      postData,
      allRelatedPostsData,
    },
  };
}
