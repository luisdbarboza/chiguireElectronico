import React, { useState, useEffect, useRef } from "react";
import Post from "./Post";
import { SERVER_ADDRESS } from "../utils";

const MoreArticlesButton = ({ pagination, limit, setPagination }) => {
  return (
    <button
      className="more-stories-btn"
      onClick={() => setPagination({ ...pagination, limit: limit + 5 })}
    >
      Ver mas historias
    </button>
  );
};

const Pagination = ({ type, subtype}) => {
  const [posts, setPosts] = useState([]);
  const [pagination, setPagination] = useState({
    from: 0,
    limit: 5,
  });
  const { from, limit } = pagination;
  const totalNumberOfPosts = useRef(0);

  useEffect(() => {
    const fetchPosts = async () => {
      let url;
      switch (type) {
        case "category":
          url = new URL(`${SERVER_ADDRESS}/categories/${subtype}`);
          break;
        case "tag":
          url = new URL(`${SERVER_ADDRESS}/tags/${subtype}`);
          break;
        default:
          url = new URL(`${SERVER_ADDRESS}/posts`);
      }

      const params = { from, limit };

      url.search = new URLSearchParams(params).toString();

      const promiseResponse = await fetch(url);
      const responseData = await promiseResponse.json();

      if (responseData.ok) {
        totalNumberOfPosts.current = responseData.numberOfPosts;

        switch (type) {
          case "category":
            setPosts(responseData.category.posts);
            break;
          case "tag":
            setPosts(responseData.tag.posts);
            break;
          default:
            setPosts(responseData.posts);
        }
      } else {
        setPosts([]);
      }
    };
    fetchPosts();
  }, [pagination, type, subtype]);

  if (posts.length > 0) {
    return (
      <div className="news-flex">
        {posts.slice(from, limit).map((post, index) => {
          return (
            <Post key={index} post={post} index={index} pagination={type} />
          );
        })}

        {limit < totalNumberOfPosts.current && (
          <MoreArticlesButton
            pagination={pagination}
            limit={limit}
            setPagination={setPagination}
          />
        )}
      </div>
    );
  } else {
    return (
      <div className="news-flex">
        <h2>Cargando...</h2>
      </div>
    );
  }
};

export default Pagination;
