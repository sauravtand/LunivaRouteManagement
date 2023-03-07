export const GenerateUrlEncodedData = (initialObject) => {
  const formData = Object.keys(initialObject)
    .map((key) => {
      return `${key}=${encodeURIComponent(initialObject[key])}`
    })
    .join('&');
  return formData;
}