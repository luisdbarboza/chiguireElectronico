const useFetch = async (
  path,
  responseType,
  requestBody,
  requestType,
  requestHeaders
) => {
  try {
    let data;
    let promiseResponse;

    if (!requestBody) {
      promiseResponse = await fetch(path);
    } else {
      promiseResponse = await fetch(path, {
        method: requestType,
        body: requestBody,
        headers: requestHeaders,
      });
    }

    switch (responseType) {
      case "text":
        data = await promiseResponse.text();
        break;
      case "json":
        data = await promiseResponse.json();
        break;
      default:
        return Error("Wrong type");
    }

    return data;
  } catch (err) {
    return err;
  }
};

export default useFetch;
