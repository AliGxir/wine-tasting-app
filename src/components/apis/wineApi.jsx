export const fetchDeleteWine = (wineId, fnOnResolve, navigate) => {
  const configObj = {
    method: "DELETE",
  };
  fetch(`http://localhost:3000/favorites/${wineId}`, configObj)
    .then(() => fnOnResolve(wineId))
    .then(() => navigate("/wines"))
    .catch(console.log);
};

export const fetchPatchWine = (
  url,
  validFormData,
  handlePatchWine,
  toggleEditMode,
  handleError,
  navigate
) => {
  fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(validFormData),
  })
    .then((resp) => resp.json())
    .then((patchedWine) => {
      handlePatchWine(patchedWine);
      navigate("/wines");
    })
    .then(() => toggleEditMode())
    .catch((error) => {
      handleError(error.text);
      setTimeout(() => handleError(""), 5000);
    });
};

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
