import Link from 'next/link';

// components
import Layout from '../../layouts/default';

// helpers
import { getSortedPostsData } from '../../lib/posts';

const Blog = ({ allPostsData }) => {
  return (
    <Layout
      title="Helpful blog articles about WordPress, Jamstack & frontend development | Rob Kendal, freelance web developer"
      description="Read articles from Rob Kendal about WordPress, Jamstack, frontend development and JavaScript"
    >
      <h1 className="has-text-centered">Latest articles</h1>
      <section>
        <div className="columns is-multiline is-variable is-1-tablet is-2-desktop is-3-widescreen">
          {allPostsData.slice(0, 7).map(({ id, date, title, featuredimage, description, tags }) => {
            const isFeatured = allPostsData.map((post) => post.id).indexOf(id) <= 2;
            return (
              <div
                className={`column ${
                  isFeatured
                    ? 'is-12-touch is-offset-0-touch is-10-desktop is-offset-1-desktop is-4-widescreen is-offset-0-widescreen'
                    : 'is-6-tablet is-6-desktop is-6-widescreen is-3-fullhd'
                }`}
                key={`${id}_${date}`}
              >
                <div className="card article-item">
                  <div className="card-image">
                    <Link href={`/blog/${id}`}>
                      <a>
                        <img src={featuredimage} alt={title} className="unstyled" />
                      </a>
                    </Link>
                  </div>
                  <div className="card-content">
                    <DateDisplay dateString={date} className="has-text-grey-light has-text-uppercase" />
                    <h3 className="subtitle is-size-4">
                      <Link href={`/blog/${id}`}>
                        <a>{title}</a>
                      </Link>
                    </h3>
                    <p>{isFeatured ? description : description.split(' ').slice(0, 15).join(' ') + '...'}</p>
                    <p className="has-text-right">
                      <Link href={`/blog/${id}`}>
                        <a>read the full article</a>
                      </Link>
                    </p>
                    <p className="tags has-text-centered">
                      {tags.length > 0 &&
                        tags.map((tag) => (
                          <Link href={`/tags/?tag=${tag}`} key={`${tag}_${Date.now().toString()}`}>
                            <a>
                              <small>#{tag}</small>
                            </a>
                          </Link>
                        ))}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <section>
        <div className="container">
          {allPostsData.slice(7).map(({ id, date, title, featuredimage, description, tags }) => (
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
                        <Link href={`/tags/?tag=${tag}`} key={`${tag}_${Date.now().toString()}`}>
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
      </section>
    </Layout>
  );
};

export default Blog;

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();

  return {
    props: {
      allPostsData,
    },
  };
}
