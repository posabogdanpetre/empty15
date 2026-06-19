const getCurrentDeals = require('../../actions/get-current-deals/index.js');

describe('get-current-deals', () => {
  test('returns all deals when no category filter provided', async () => {
    const result = await getCurrentDeals({});
    
    expect(result).toHaveProperty('content');
    expect(result).toHaveProperty('structuredContent');
    expect(result.structuredContent).toHaveProperty('deals');
    expect(Array.isArray(result.structuredContent.deals)).toBe(true);
    expect(result.structuredContent.deals.length).toBeGreaterThan(0);
    
    const deal = result.structuredContent.deals[0];
    expect(deal).toHaveProperty('name');
    expect(deal).toHaveProperty('price');
    expect(deal).toHaveProperty('original_price');
    expect(deal).toHaveProperty('discount_percentage');
    expect(deal).toHaveProperty('category');
  });

  test('filters deals by category', async () => {
    const result = await getCurrentDeals({ category: 'Fleece' });
    
    expect(result.structuredContent.deals).toBeDefined();
    expect(result.structuredContent.deals.every(d => d.category === 'Fleece')).toBe(true);
    expect(result.content).toContain('Fleece');
  });

  test('returns empty array when no deals match category', async () => {
    const result = await getCurrentDeals({ category: 'Packs & Bags' });
    
    expect(result.structuredContent.deals).toEqual([]);
    expect(result.content).toContain('No deals found');
  });

  test('includes discount information in structured content', async () => {
    const result = await getCurrentDeals({});
    
    const deal = result.structuredContent.deals[0];
    expect(deal.discount_percentage).toBeDefined();
    expect(typeof deal.discount_percentage).toBe('string');
  });

  test('content includes price and savings information', async () => {
    const result = await getCurrentDeals({});
    
    expect(result.content).toContain('Found');
    expect(result.content).toContain('deal');
    expect(result.content).toMatch(/\$\d+\.\d+/); // price format
  });
});