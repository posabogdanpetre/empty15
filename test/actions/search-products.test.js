/**
 * Tests for search_products action handler
 */

const searchProducts = require('../../actions/search-products/index.js');

describe('search_products', () => {
  it('returns all products when no filters are provided', async () => {
    const result = await searchProducts({});
    
    expect(result).toHaveProperty('content');
    expect(result).toHaveProperty('structuredContent');
    expect(result.structuredContent).toHaveProperty('products');
    expect(Array.isArray(result.structuredContent.products)).toBe(true);
    expect(result.structuredContent.products.length).toBeGreaterThan(0);
    
    // Verify product structure
    const product = result.structuredContent.products[0];
    expect(product).toHaveProperty('name');
    expect(product).toHaveProperty('price');
    expect(product).toHaveProperty('category');
    expect(product).toHaveProperty('image_url');
    expect(product).toHaveProperty('gender');
  });

  it('filters products by category', async () => {
    const result = await searchProducts({ category: 'Fleece' });
    
    expect(result.structuredContent.products.length).toBeGreaterThan(0);
    result.structuredContent.products.forEach(product => {
      expect(product.category).toBe('Fleece');
    });
    expect(result.content[0].text).toContain('Fleece');
  });

  it('filters products by gender', async () => {
    const result = await searchProducts({ gender: "Men's" });
    
    expect(result.structuredContent.products.length).toBeGreaterThan(0);
    result.structuredContent.products.forEach(product => {
      expect(product.gender).toBe("Men's");
    });
    expect(result.content[0].text).toContain("Men's");
  });

  it('filters products by both category and gender', async () => {
    const result = await searchProducts({ 
      category: 'Fleece',
      gender: "Women's"
    });
    
    expect(result.structuredContent.products.length).toBeGreaterThan(0);
    result.structuredContent.products.forEach(product => {
      expect(product.category).toBe('Fleece');
      expect(product.gender).toBe("Women's");
    });
  });

  it('returns empty array when no products match filters', async () => {
    const result = await searchProducts({ 
      category: 'Jackets & Vests',
      gender: "Kids'"
    });
    
    expect(result.structuredContent.products).toEqual([]);
    expect(result.content[0].text).toContain('No products found');
  });

  it('handles undefined args gracefully', async () => {
    const result = await searchProducts(undefined);
    
    expect(result).toHaveProperty('content');
    expect(result).toHaveProperty('structuredContent');
    expect(result.structuredContent.products.length).toBeGreaterThan(0);
  });
});
