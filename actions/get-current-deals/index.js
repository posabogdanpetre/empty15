// synthetic fixture — no sample data available from Action Planner
const MOCK_DATA = [
  {
    name: "Alpine Ridge Down Jacket",
    price: "$149.99",
    original_price: "$249.99",
    discount_percentage: "40%",
    category: "Jackets & Vests",
    image_url: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400"
  },
  {
    name: "Trail Performance Fleece",
    price: "$59.99",
    original_price: "$99.99",
    discount_percentage: "40%",
    category: "Fleece",
    image_url: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400"
  },
  {
    name: "Summit Tech T-Shirt",
    price: "$19.99",
    original_price: "$34.99",
    discount_percentage: "43%",
    category: "T-Shirts",
    image_url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400"
  }
];

module.exports = async (args) => {
  const { category } = args;

  // TODO: Replace with real API call
  // const response = await fetch(`${process.env.API_BASE_URL}/deals?category=${encodeURIComponent(category || '')}`);
  // const data = await response.json();

  let deals = MOCK_DATA;

  // Filter by category if provided
  if (category) {
    deals = deals.filter(deal => deal.category === category);
  }

  const content = deals.length > 0
    ? `Found ${deals.length} deal${deals.length === 1 ? '' : 's'}${category ? ` in ${category}` : ''}: ${deals.map(d => `${d.name} - ${d.price} (was ${d.original_price}, save ${d.discount_percentage})`).join(', ')}.`
    : `No deals found${category ? ` in ${category}` : ''}.`;

  return {
    content,
    structuredContent: { deals }
  };
};