export default promise => new Promise((resolve) => {
  promise
    .then(resolve)
    .catch((error) => {
      console.error(error);

      resolve();
    });
});
