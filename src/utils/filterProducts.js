export const filterProducts = (products, { search, category, priceFilter, ratingFilter }) => {
  return products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'All' || product.category.toLowerCase() === category.toLowerCase();
    const matchesPrice =
      priceFilter === 'All' ||
      (priceFilter === '<500' && product.price < 500) ||
      (priceFilter === '500-1000' && product.price >= 500 && product.price <= 1000) ||
      (priceFilter === '>1000' && product.price > 1000);
    const matchesRating = ratingFilter === 'All' || product.rating >= parseFloat(ratingFilter);

    return matchesSearch && matchesCategory && matchesPrice && matchesRating;
  });
};

