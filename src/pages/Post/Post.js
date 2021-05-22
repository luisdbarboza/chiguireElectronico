import React, { useState, useEffect, lazy } from "react";
import Page from "../../components/Page";
import moment from "moment";
import "moment/locale/es-mx";
import { useParams, Link, useHistory } from "react-router-dom";
import CommentsSectionContextProvider from "../../context/CommentsSectionContext";
import { SERVER_ADDRESS, fetchBestPosts } from "../../utils";

const CommentsSection = lazy(() =>
  import("./components/CommentsSection/CommentsSection")
);    

//Renderiza el contenido del post recuperado de la bdd
const renderContent = (content) => {
  return { __html: content };
};

//Componentes
const PostHeader = ({ title, referentialImage }) => {
  return (
    <header
      className="post-header"
      style={{
        backgroundImage: `url(${referentialImage})`,
      }}
    >
      <div className="header-contents">
        <div className="social-media-icons-div">
          <img
            loading="lazy"
            src="/images/icons/telegram_color.svg"
            alt="share-btn"
          />
          <img
            loading="lazy"
            src="/images/icons/facebook_color.svg"
            alt="share-btn"
          />
          <img
            loading="lazy"
            src="/images/icons/twitter_color.svg"
            alt="share-btn"
          />
        </div>
        <h1 className="title">{title}</h1>
      </div>
    </header>
  );
};

const PostBody = ({
  content,
  author,
  numberOfComments,
  description,
  createdAt,
}) => {
  moment.locale("es-mx");

  return (
    <section className="post-body">
      <div className="post-links">
        <div className="date-comments">
          <span className="date">{moment(createdAt).fromNow()}</span>
          <a href="#comentarios" className="link-to-comments">
            <img
              loading="lazy"
              src="/images/icons/comments.svg"
              alt="comments"
            />
            <span>{numberOfComments} comentarios</span>
          </a>
        </div>
        <div className="author">
          <figure className="wrapper">
            <img
              loading="lazy"
              src="/images/icons/man.png"
              alt="imagen del autor"
            />
            <Link to="#">{author.username}</Link>
          </figure>
        </div>
      </div>

      <div
        className="post-contents"
        dangerouslySetInnerHTML={renderContent(content)}
      />
    </section>
  );
};

const SideContent = () => {
  const [recommendedPosts, setRecommendedPosts] = useState([]);
  const history = useHistory();
  const token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    fetchBestPosts(3, setRecommendedPosts);
  }, []);

  return (
    <aside className="side-content">
      <section className="recommended-section">
        <header className="recommended-header">
          <h6>Te recomendamos</h6>
        </header>

        <div className="recommended-articles-wrapper">
          {recommendedPosts.length > 0 &&
            recommendedPosts.map((post, index) => {
              return (
                <article
                  className="recommended-article"
                  key={index}
                  onClick={() => {
                    history.push(`/posts/${post._id}`);
                  }}
                >
                  <img
                    loading="lazy"
                    src={`${post.referentialImage}`}
                    alt="recommended post"
                  />
                  <div className="story-heading">
                    <h4>{post.title}</h4>
                  </div>
                </article>
              );
            })}
        </div>
      </section>
    </aside>
  );
};

const PostContentAndRecommended = ({ children }) => {
  return <div className="post-wrapper">{children}</div>;
};

const Post = () => {
  const [post, setPost] = useState({});
  const {
    title,
    author,
    description,
    createdAt,
    content,
    referentialImage,
    numberOfComments,
  } = post;

  let { id } = useParams();

  //busca el post en la bdd
  useEffect(() => {
    const fetchPost = (id) => {
      const query1 = fetch(`${SERVER_ADDRESS}/posts/clicksUpdate/${id}`, {
        method: "PUT",
      });
      const query2 = fetch(`${SERVER_ADDRESS}/posts/${id}`);

      Promise.all([query1, query2]).then(async (responses) => {
        let query1Results = await responses[0].json();
        let query2Results = await responses[1].json();

        if (query1Results.ok) {
          console.log("Numero de clicks actualizado");
        }

        if (query2Results.ok) {
          setPost(query2Results.post);
        }
      });
    };

    fetchPost(id);
  }, [id]);

  return (
    <Page name="post">
      {post.content ? (
        <>
          <PostHeader title={title} referentialImage={referentialImage} />
          <PostContentAndRecommended>
            <PostBody
              content={content}
              author={author}
              numberOfComments={numberOfComments}
              description={description}
              createdAt={createdAt}
            />
            <SideContent />
          </PostContentAndRecommended>
          <CommentsSectionContextProvider>
            <CommentsSection postId={id} numberOfComments={numberOfComments} />
          </CommentsSectionContextProvider>
        </>
      ) : (
        <div>
          <h1>Cargando....</h1>
        </div>
      )}
    </Page>
  );
};

export default Post;
