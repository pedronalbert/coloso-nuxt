export default promise => new Promise((resolve) => {
  promise
    .then(resolve)
    .catch((error) => {
      /* eslint-disable */
      console.error(error);
      resolve();
    });
});
