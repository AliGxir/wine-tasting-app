export const fetchPostWine = (url, finalizedData, handleError, navigate) => {
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(finalizedData),
  })
    .then((resp) => {
      if (!resp.ok) {
        throw new Error("Failed to fetch because server is not running");
      }
      navigate("/wines");
    })
    .catch((error) => {
      handleError(error.text);
      setTimeout(() => handleError(""), 5000);
    });
};
