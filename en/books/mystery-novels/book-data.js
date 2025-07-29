// Amazon book data for Japanese mystery novels
// Update ASSOCIATE_ID with your actual Amazon Associates ID

const ASSOCIATE_ID = 'northernscrip-20';

const books = {
  'devotion-of-suspect-x': {
    title: 'The Devotion of Suspect X',
    author: 'Keigo Higashino',
    amazonASIN: '1250002699',
    imageUrl: 'https://m.media-amazon.com/images/I/81FxuHgUMuL._SL1500_.jpg',
    priceFrom: '$12.99',
    formats: ['Kindle', 'Paperback', 'Hardcover'],
    pages: 298,
    publisher: 'Minotaur Books',
    publishDate: '2011-02-01'
  },
  'journey-under-midnight-sun': {
    title: 'Journey Under the Midnight Sun',
    author: 'Keigo Higashino',
    amazonASIN: '0349142815',
    imageUrl: 'https://m.media-amazon.com/images/I/71qL7nXO5LL._SL1500_.jpg',
    priceFrom: '$14.99',
    formats: ['Kindle', 'Paperback'],
    pages: 576,
    publisher: 'Abacus',
    publishDate: '2016-11-01'
  },
  'malice': {
    title: 'Malice',
    author: 'Keigo Higashino',
    amazonASIN: '1250035600',
    imageUrl: 'https://m.media-amazon.com/images/I/71Y5Pa8AL-L._SL1500_.jpg',
    priceFrom: '$13.99',
    formats: ['Kindle', 'Paperback', 'Hardcover'],
    pages: 304,
    publisher: 'Minotaur Books',
    publishDate: '2014-10-14'
  },
  'tokyo-zodiac-murders': {
    title: 'The Tokyo Zodiac Murders',
    author: 'Soji Shimada',
    amazonASIN: '1782271430',
    imageUrl: 'https://m.media-amazon.com/images/I/81QZ5XBHX8L._SL1500_.jpg',
    priceFrom: '$13.99',
    formats: ['Kindle', 'Paperback'],
    pages: 352,
    publisher: 'Pushkin Vertigo',
    publishDate: '2015-12-03'
  },
  'decagon-house-murders': {
    title: 'The Decagon House Murders',
    author: 'Yukito Ayatsuji',
    amazonASIN: '1782276343',
    imageUrl: 'https://m.media-amazon.com/images/I/71QKQ9piNuL._SL1500_.jpg',
    priceFrom: '$15.99',
    formats: ['Kindle', 'Paperback'],
    pages: 256,
    publisher: 'Pushkin Vertigo',
    publishDate: '2020-12-03'
  },
  'six-four': {
    title: 'Six Four',
    author: 'Hideo Yokoyama',
    amazonASIN: '0374536557',
    imageUrl: 'https://m.media-amazon.com/images/I/71nDX6c0jFL._SL1500_.jpg',
    priceFrom: '$17.99',
    formats: ['Kindle', 'Paperback', 'Hardcover'],
    pages: 656,
    publisher: 'Farrar, Straus and Giroux',
    publishDate: '2016-11-08'
  }
};

// Generate Amazon affiliate URLs
function generateAmazonURL(asin, tag = ASSOCIATE_ID) {
  return `https://www.amazon.com/dp/${asin}?tag=${tag}`;
}

// Generate book card HTML
function generateBookCard(bookKey) {
  const book = books[bookKey];
  if (!book) return '';
  
  return `
    <div class="amazon-book-card">
      <div class="book-image">
        <img src="${book.imageUrl}" alt="${book.title}" loading="lazy">
      </div>
      <div class="book-details">
        <h3>${book.title}</h3>
        <p class="author">by ${book.author}</p>
        <div class="book-meta">
          <span class="pages">${book.pages} pages</span>
          <span class="publisher">${book.publisher}</span>
        </div>
        <div class="price-info">
          <span class="price">From ${book.priceFrom}</span>
          <div class="formats">
            ${book.formats.map(format => `<span class="format-tag">${format}</span>`).join('')}
          </div>
        </div>
        <a href="${generateAmazonURL(book.amazonASIN)}" 
           target="_blank" 
           rel="noopener noreferrer" 
           class="amazon-buy-button">
          View on Amazon
        </a>
      </div>
    </div>
  `;
}

export { books, generateAmazonURL, generateBookCard };