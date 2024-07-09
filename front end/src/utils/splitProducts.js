function splitProducts(productString) {
    const productsArray = productString.split(',').map(product => product.trim());
  

    const productCount = {};
  

    for (const product of productsArray) {
      if (productCount[product]) {
        productCount[product] += 1;
      } else {
        productCount[product] = 1;
      }
    }
  
    const resultArray = Object.keys(productCount).map(product => ({
      name: product,
      quantity: productCount[product]
    }));
  
    return resultArray;
  }
  
  const objeto = {
    id: 2,
    products: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops, John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
    userId: 4
  };
  
  const productsList = splitProducts(objeto.products);
  console.log(productsList);

  export default splitProducts
  
