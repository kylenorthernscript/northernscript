# Amazon Book Cover Image Collection Guide

## Steps to Get Correct Book Cover Images

### Method 1: Manual Collection from Amazon Product Page

1. **Visit Product Page**: Go to your affiliate link (e.g., https://amzn.to/4mkR1XL)
2. **Right-click on Book Cover**: Select "Copy Image Address" or "Copy Image URL"
3. **Test the URL**: Paste in browser to verify it loads
4. **Update Code**: Replace the image URL in your markdown file

### Method 2: Amazon Product Advertising API Setup

1. **Apply for API Access**:
   - Go to Amazon Associates Central
   - Navigate to Tools → Product Advertising API
   - Apply for access (requires existing affiliate account)

2. **Implementation Example**:
```javascript
const amazonAPI = require('amazon-paapi');

const commonParameters = {
  AccessKey: 'YOUR_ACCESS_KEY',
  SecretKey: 'YOUR_SECRET_KEY',
  PartnerTag: 'northernscrip-20',
  PartnerType: 'Associates',
  Marketplace: 'www.amazon.com'
};

async function getBookCover(asin) {
  try {
    const requestParameters = {
      ItemIds: [asin],
      Resources: [
        'Images.Primary.Large',
        'Images.Primary.Medium',
        'ItemInfo.Title'
      ]
    };
    
    const response = await amazonAPI.GetItems(commonParameters, requestParameters);
    return response.ItemsResult.Items[0].Images.Primary.Large.URL;
  } catch (error) {
    console.error('Error fetching book cover:', error);
    return null;
  }
}
```

### Method 3: Fallback Strategy (Current Implementation)

Our current implementation tries multiple image patterns and falls back to placeholder:

```javascript
const imageUrls = [
  'MANUAL_URL_FROM_AMAZON',  // Add manually obtained URL here
  'https://m.media-amazon.com/images/I/PATTERN1.jpg',
  'https://m.media-amazon.com/images/I/PATTERN2.jpg',
  // Fallback to placeholder if all fail
];
```

## Compliance Notes

- ❌ Cannot screenshot/download Amazon images to self-host
- ❌ Cannot modify Amazon product images
- ✅ Can link directly to Amazon-hosted images
- ✅ Must use official API when possible
- ✅ Must maintain affiliate disclosure

## Book Cover URLs to Collect

### The Devotion of Suspect X
- ASIN: 1250002699
- Link: https://amzn.to/4mkR1XL
- Image URL: [TO BE COLLECTED]

### Journey Under the Midnight Sun  
- ASIN: 0349142815
- Link: [TO BE PROVIDED]
- Image URL: [TO BE COLLECTED]

### Malice
- ASIN: 1250035600  
- Link: [TO BE PROVIDED]
- Image URL: [TO BE COLLECTED]

## Update Process

1. Collect correct image URLs manually
2. Update each book page with correct URL
3. Test all images load correctly
4. Consider API implementation for future scalability