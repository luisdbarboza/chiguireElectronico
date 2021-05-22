import React, { useEffect, useState } from "react";
import Page from "../components/Page";
import Pagination from "../components/Pagination";
import { useParams, useHistory } from "react-router-dom";
import { SERVER_ADDRESS, fetchBestPosts } from "../utils";

const HighlitedArticle = () => {
  return (
    <article className="highlited-article">
      <figure className="article-img">
        <img
          loading="lazy"
          src="/images/intel20.jpg"
          alt="titular de la noticia"
        />
      </figure>

      <h2 className="article-title">
        Intel sufre la mayor fuga de información en su historia
      </h2>

      <div className="article-details">
        <p className="short-description">
          Alguien en Twitter comenzó a postear enlaces a un archivo que contiene
          el volcado de la información con más de 20 GB de datos de información
          confidencial de Intel.
        </p>
      </div>

      <div className="writter-date">Naruto Uzumaki | 7 de agosto de 2020</div>
    </article>
  );
};

const Article = () => {
  return (
    <article className="regular-article">
      <div className="article-thumbnail">
        <img
          loading="lazy"
          src="/images/advertencia-facebook.jpg"
          alt="article thumbnail"
        />
      </div>

      <div className="article-info">
        <div className="short-description">
          Facebook mostrará una advertencia antes de compartir noticias sobre la
          COVID-19
        </div>
        <div className="writter-date">Por: Steven Fernandez | 8 de julio</div>
      </div>
    </article>
  );
};

const MoreArticlesButton = ({ pagination, limit, setPagination }) => {
  return (
    <button
      className="more-articles-btn"
      onClick={() => setPagination({ ...pagination, limit: limit + 5 })}
    >
      Ver mas historias
    </button>
  );
};

const CategoryArticles = ({ category }) => {
  return (
    <section className="category-articles">
      <Pagination type="category" subtype={category} />
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
                <article className="recommended-article" key={index} onClick={() => {
                  history.push(`/posts/${post._id}`);
                }}>
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

const CategoryGrid = ({ children, categoryId }) => {
  const [title, setTitle] = useState("");

  useEffect(() => {
    const fetchTitle = async () => {
      let url = new URL(`${SERVER_ADDRESS}/categories/name/${categoryId}`);

      const promiseResponse = await fetch(url);
      const responseData = await promiseResponse.json();

      if (responseData.ok) {
        setTitle(responseData.category);
      }
    };
    fetchTitle();
  }, []);

  return (
    <div className="category-grid">
      <h2 id="category-title">{title}</h2>
      <div className="articles-side-content-wrapper">{children}</div>
    </div>
  );
};

const Category = () => {
  const { category } = useParams();
  return (
    <Page name="category">
      <CategoryGrid categoryId={category}>
        <CategoryArticles category={category} />
        <SideContent />
      </CategoryGrid>
    </Page>
  );
};

export default Category;
