import React from "react";
import moment from "moment";
import "moment/locale/es-mx";
import { Link, useHistory } from "react-router-dom";
import { SERVER_ADDRESS } from "../utils";

const Post = React.memo(({ index, post, pagination }) => {
  const history = useHistory();
  const token = JSON.parse(localStorage.getItem("token"));

  moment.locale("es-mx");

  return (
    <article
      className={pagination === "all" ? "single-story" : "regular-article"}
      key={index}
    >
      {/* <!--CONTENEDOR INVIDDUAL PARA CADA NOTICIA--> */}
      <div
        className={
          pagination === "all" ? "story-thumbnail" : "article-thumbnail"
        }
      >
        {/* <!--MINIATURA DE LA NOTICIA--> */}
        <img loading="lazy" src={`${post.referentialImage}`} alt={post.title} />
      </div>

      <div className={pagination === "all" ? "story-info" : "article-info"}>
        <header>
          <Link to={`/posts/${post._id}`} className="title">
            {post.title}
          </Link>
          {pagination === "all" && (
            <Link className="category" to={`/category/${post.category._id}`}>
              {post.category.name}
            </Link>
          )}
        </header>
        {pagination !== "all" && post.description && (
          <p className="description">
            {post.description.length > 100
              ? post.description.slice(0, 125) + "..."
              : post.description}
          </p>
        )}
        <footer>
          <Link
            to={`/posts/${post._id}#comentarios`}
            className="link-to-comments"
          >
            <span>{post.numberOfComments}</span>{" "}
            <img
              src="/images/icons/comments.svg"
              loading="lazy"
              alt="post comments"
            />
          </Link>
          <Link to={`/users/${post.author._id}`}>{post.author.username}</Link>
          <span>{moment(post.createdAt).fromNow()}</span>
        </footer>
      </div>
    </article>
  );
});

export default Post;
