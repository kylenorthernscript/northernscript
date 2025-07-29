// Amazon Associates Configuration
// Replace YOUR-ASSOCIATE-ID-20 with your actual Amazon Associates ID

export const AMAZON_CONFIG = {
  associateId: 'northernscrip-20',
  marketplace: 'amazon.com', // or amazon.co.jp, amazon.co.uk, etc.
  
  // Book database
  books: {
    'devotion-of-suspect-x': {
      title: 'The Devotion of Suspect X',
      author: 'Keigo Higashino',
      translator: 'Alexander O. Smith',
      asin: '1250002699',
      imageUrl: '/images/books/devotion-of-suspect-x.jpg',
      priceFrom: '$12.99',
      formats: ['Kindle', 'Paperback', 'Hardcover'],
      pages: 298,
      publisher: 'Minotaur Books',
      publishDate: '2011-02-01',
      rating: 4.3,
      reviews: 2847
    },
    'journey-under-midnight-sun': {
      title: 'Journey Under the Midnight Sun',
      author: 'Keigo Higashino',
      translator: 'Alexander O. Smith',
      asin: '0349142815',
      imageUrl: '/images/books/journey-under-midnight-sun.jpg',
      priceFrom: '$14.99',
      formats: ['Kindle', 'Paperback'],
      pages: 576,
      publisher: 'Abacus',
      publishDate: '2016-11-01',
      rating: 4.2,
      reviews: 1543
    },
    'malice': {
      title: 'Malice',
      author: 'Keigo Higashino',
      translator: 'Alexander O. Smith with Elye J. Alexander',
      asin: '1250035600',
      imageUrl: '/images/books/malice.jpg',
      priceFrom: '$13.99',
      formats: ['Kindle', 'Paperback', 'Hardcover'],
      pages: 304,
      publisher: 'Minotaur Books',
      publishDate: '2014-10-14',
      rating: 4.1,
      reviews: 1829
    },
    'puppet-master': {
      title: 'Puppet Master',
      author: 'Miyuki Miyabe',
      translator: 'Alfred Birnbaum',
      asin: '0316666378',
      imageUrl: '/images/books/puppet-master.jpg',
      priceFrom: '$16.99',
      formats: ['Kindle', 'Paperback'],
      pages: 512,
      publisher: 'Back Bay Books',
      publishDate: '2007-05-01',
      rating: 4.2,
      reviews: 856
    },
    'tokyo-zodiac-murders': {
      title: 'The Tokyo Zodiac Murders',
      author: 'Soji Shimada',
      translator: 'Ross MacKenzie & Shika MacKenzie',
      asin: '1782271430',
      imageUrl: '/images/books/tokyo-zodiac-murders.jpg',
      priceFrom: '$13.99',
      formats: ['Kindle', 'Paperback'],
      pages: 352,
      publisher: 'Pushkin Vertigo',
      publishDate: '2015-12-03',
      rating: 4.0,
      reviews: 945
    },
    'decagon-house-murders': {
      title: 'The Decagon House Murders',
      author: 'Yukito Ayatsuji',
      translator: 'Ho-Ling Wong',
      asin: '1782276343',
      imageUrl: '/images/books/decagon-house-murders.jpg',
      priceFrom: '$15.99',
      formats: ['Kindle', 'Paperback'],
      pages: 256,
      publisher: 'Pushkin Vertigo',
      publishDate: '2020-12-03',
      rating: 4.4,
      reviews: 672
    },
    'six-four': {
      title: 'Six Four',
      author: 'Hideo Yokoyama',
      translator: 'Jonathan Lloyd-Davies',
      asin: '0374536557',
      imageUrl: '/images/books/six-four.jpg',
      priceFrom: '$17.99',
      formats: ['Kindle', 'Paperback', 'Hardcover'],
      pages: 656,
      publisher: 'Farrar, Straus and Giroux',
      publishDate: '2016-11-08',
      rating: 4.2,
      reviews: 1234
    },
    'all-becomes-f': {
      title: 'The Perfect Insider',
      author: 'Hiroshi Mori',
      translator: 'Alexander O. Smith',
      asin: '1421598086',
      imageUrl: '/images/books/all-becomes-f.jpg',
      priceFrom: '$14.99',
      formats: ['Kindle', 'Paperback'],
      pages: 320,
      publisher: 'Vertical Comics',
      publishDate: '2014-10-21',
      rating: 4.0,
      reviews: 892
    }
  }
};

// Generate Amazon affiliate URL
export function generateAmazonURL(asin, associateId = AMAZON_CONFIG.associateId) {
  return `https://www.${AMAZON_CONFIG.marketplace}/dp/${asin}?tag=${associateId}`;
}

// Get book data by key
export function getBook(bookKey) {
  return AMAZON_CONFIG.books[bookKey] || null;
}