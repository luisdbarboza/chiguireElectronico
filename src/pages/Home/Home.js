import React, { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import Page from "../../components/Page";
import Pagination from "../../components/Pagination";
import { SERVER_ADDRESS, fetchBestPosts } from "../../utils";

const TopStory = ({ story, token }) => {
  return (
    <Link to={`/posts/${story._id}`} className="big">
      <img
        src={`${story.referentialImage}`}
        loading="lazy"
        alt={story.title}
      />
      <div className="story-heading">
        <h2>{story.title}</h2>
      </div>
    </Link>
  );
};

const BestStories = () => {
  const [posts, setPosts] = useState([]);
  const token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    fetchBestPosts(4, setPosts);
  }, []);

  return (
    <>
      <div className="blue-border-div">
        <div className="top-stories-header">
          <h2>Mejores historias</h2>
        </div>

        <div className="white-background-div">
          {posts.length > 0 ? (
            <div className="top-stories-grid">
              <TopStory story={posts[0]} token={token} />

              <div className="tiny">
                {posts.slice(1).map((story, index) => {
                  return (
                    <Link
                      to={`/posts/${story._id}`}
                      className="tiny-story"
                      key={index}
                    >
                      <img
                        src={`${story.referentialImage}`}
                        loading="lazy"
                        alt={story.title}
                      />
                      <div className="story-heading">
                        <h2>{story.title}</h2>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </>
  );
};

const MostReadPosts = () => {
  const [posts, setPosts] = useState([]);
  const goTo = useCallback(
    (post, index) => <Link to={`/posts/${post._id}`} key={index}><li>{post.title}</li></Link>,
    []
  );

  useEffect(() => {
    fetchBestPosts(10, setPosts);
  }, []);

  if (posts.length > 0) {
    const col1Links = posts
      .slice(0, 5)
      .map((post, index) => goTo(post, index));
    const col2Links = posts
      .slice(5)
      .map((post, index) => goTo(post, index));

    return (
      <>
        <div className="most-read-news">
          <div className="most-read-header">
            <div>
              <h2>Lo mas leido</h2>
            </div>
          </div>
          <ol>
            <div className="col">{col1Links}</div>
            <div className="col">{col2Links}</div>
          </ol>
        </div>
      </>
    );
  } else {
    return (
      <div className="most-read-news">
        <div className="most-read-header">
          <div>
            <h2>Lo mas leido</h2>
          </div>
        </div>
      </div>
    )
  }
};

const LatestNewsAndNewsletterForm = () => {
  const [posts, setPosts] = useState([]);

  return (
    <>
      <div className="flex-latest-newsletter">
        <section className="latest-news">
          <header className="latest-news-header">
            <div>
              <h3>Lo ultimo</h3>
            </div>
          </header>

          <Pagination type="all" />
        </section>

        <div className="newsletter-column">
          <form className="newsletter-form" action="#">
            <div className="newsletter-form-header">
              <h3>Suscribete</h3>
            </div>

            <div className="flex-form">
              <p>
                Recibe las ultimas noticias de nuestro newsletter en tu correo
              </p>
              <input type="email" name="email" placeholder="usuario@dominio" />
              <button>Suscribirse</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

const Home = () => {
  return (
    <Page name="home">
      <BestStories />
      <LatestNewsAndNewsletterForm />
      <MostReadPosts />
    </Page>
  );
};

export default Home;
