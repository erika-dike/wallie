export default function replaceUrlsWithLinks(text, urls) {
  let result = text;
  urls.forEach((url) => {
    result = result.replace(url, `<a href=${url}>${url}</a>`);
  });

  return result;
}
