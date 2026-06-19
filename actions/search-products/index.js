/**
 * search_products action handler
 * 
 * Searches the Patagonia outdoor clothing and gear catalog with optional filters for category and gender, returning an array of products with name, price, category, and image.
 */

// synthetic fixture — no sample data available from Action Planner
const MOCK_DATA = [
  {
    name: "Men's Nano Puff Jacket",
    price: "$249.00",
    category: "Jackets & Vests",
    image_url: "https://www.patagonia.com/product/mens-nano-puff-jacket/84212.html",
    gender: "Men's"
  },
  {
    name: "Women's Better Sweater Fleece Jacket",
    price: "$139.00",
    category: "Fleece",
    image_url: "https://www.patagonia.com/product/womens-better-sweater-fleece-jacket/25542.html",
    gender: "Women's"
  },
  {
    name: "Men's Quandary Pants",
    price: "$89.00",
    category: "Pants",
    image_url: "https://www.patagonia.com/product/mens-quandary-pants/55186.html",
    gender: "Men's"
  },
  {
    name: "Women's Capilene Cool Daily Shirt",
    price: "$45.00",
    category: "Shirts",
    image_url: "https://www.patagonia.com/product/womens-capilene-cool-daily-shirt/45235.html",
    gender: "Women's"
  },
  {
    name: "Kids' Retro Pile Fleece Jacket",
    price: "$99.00",
    category: "Fleece",
    image_url: "https://www.patagonia.com/product/kids-retro-pile-fleece-jacket/65411.html",
    gender: "Kids'"
  }
];

module.exports = async (args) => {
  // Destructure input parameters with defaults
  const { category, gender } = args || {};

  // TODO: Replace mock data with real Patagonia API call
  // Example:
  // const response = await fetch(`${process.env.PATAGONIA_API_BASE_URL}/products?category=${encodeURIComponent(category)}&gender=${encodeURIComponent(gender)}`, {
  //   headers: { 'Authorization': `Bearer ${process.env.PATAGONIA_API_KEY}` }
  // });
  // const data = await response.json();
  // let products = data.products || [];

  // Apply filters to mock data
  let products = MOCK_DATA;

  if (category) {
    products = products.filter(p => p.category === category);
  }

  if (gender) {
    products = products.filter(p => p.gender === gender);
  }

  // Generate text summary
  const summary = products.length > 0
    ? `Found ${products.length} product${products.length === 1 ? '' : 's'}${category ? ` in ${category}` : ''}${gender ? ` for ${gender}` : ''}.`
    : `No products found${category ? ` in ${category}` : ''}${gender ? ` for ${gender}` : ''}.`;

  return {
    content: [{ type: 'text', text: summary }],
    // structuredContent.products — bare array outputSchema; key derived from actionName "search_products"
    structuredContent: { products }
  };
};
