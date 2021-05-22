const SERVER_ADDRESS = "https://restapichiguireelectronico.herokuapp.com";

const fetchBestPosts = async (limit, setPosts) => {
  const url = new URL(`${SERVER_ADDRESS}/posts`);
  const params = { type: "best-posts", limit };

  url.search = new URLSearchParams(params).toString();

  const promiseResponse = await fetch(url);
  const responseData = await promiseResponse.json();

  if (responseData.ok) {
    setPosts(responseData.posts);
  }
};

export { SERVER_ADDRESS,  fetchBestPosts};
