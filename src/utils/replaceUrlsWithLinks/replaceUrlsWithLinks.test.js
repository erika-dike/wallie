import replaceUrlsWithLinks from './replaceUrlsWithLinks';


describe('replaceUrlsWithLinks test suite', () => {
  it('replaces single url with anchor links', () => {
    const text = 'Search http://google.com';
    const url = ['http://google.com'];
    const expected = `Search <a href=${url}>${url}</a>`;
    expect(replaceUrlsWithLinks(text, url)).toEqual(expected);
  });

  it('replaces multiple urls in a text with anchor links', () => {
    const text = [
      'I search with http://google.com,',
      'watch videos on http://youtube.com and catch up with friends on',
      'http://facebook.com',
    ].join(' ');
    const urls = [
      'http://google.com', 'http://youtube.com', 'http://facebook.com',
    ];
    const expected = [
      `I search with <a href=${urls[0]}>${urls[0]}</a>,`,
      `watch videos on <a href=${urls[1]}>${urls[1]}</a>`,
      'and catch up with friends on',
      `<a href=${urls[2]}>${urls[2]}</a>`,
    ].join(' ');
    expect(replaceUrlsWithLinks(text, urls)).toEqual(expected);
  });
});
