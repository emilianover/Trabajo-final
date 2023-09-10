import { useEffect, useState } from "react";
import { Card } from "./Card";
import { Cart } from "./Cart";
import { Button, Drawer } from "antd";
import { peek } from "../utils/peek";
import { useCartStore } from "../app/useCartStore";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [nombreFilter, setNombreFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState(0);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [isSortedFilter, setIsSortedFilter] = useState(false);
  const [count, setCount] = useState(0);
  const productsGlobal = useCartStore((state) => state.products);

  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  const categories = products.map((product) => product.category);
  const uniqueCategories = [...new Set(categories)];

  return (
    <>
      <h3>Buscar por:</h3>
      <>
        <Button type="primary" onClick={showDrawer}>
          Open
        </Button>
        <Drawer
          title="Tus productos"
          placement="right"
          onClose={onClose}
          open={open}
        >
          {" "}
          <Cart></Cart>
        </Drawer>
      </>
      <div className="filters-container">
        <label htmlFor="nombre">Nombre:</label>
        <input
          onChange={(e) => setNombreFilter(e.target.value)}
          type="text"
          name="nombre"
          id="nombre"
          defaultValue={nombreFilter}
        />

        <label htmlFor="precio-min">Precio mínimo:</label>
        <input
          onChange={(e) => setPriceFilter(e.target.value)}
          type="number"
          name="precio-min"
          id="precio-min"
          defaultValue={priceFilter}
        />

        <label htmlFor="categoria">Categoría:</label>
        <select
          name="categoria"
          id="categoria"
          onChange={(e) => setCategoryFilter(peek(e.target.value))}
        >
          <option value="-">-</option>

          {uniqueCategories.map((category, i) => (
            <option key={`key-option-${category}${i}`} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <label htmlFor="ordenar">Ordenar:</label>
      <input
        onChange={(e) => setIsSortedFilter(e.target.checked)}
        type="checkbox"
        name="ordenar"
        id="ordenar"
        checked={isSortedFilter}
      />
      <section className="productos">
        {products
          .filter((product) =>
            product.title.toLowerCase().includes(nombreFilter.toLowerCase())
          )
          .filter((product) => product.price > priceFilter)
          .filter((product) =>
            categoryFilter === "-" ? true : product.category === categoryFilter
          )
          .slice()
          .sort((a, b) => (isSortedFilter ? a.price - b.price : 0))
          .map((product) => (
            <Card
              product={product}
              key={`key-${product.title}-${product.price}`}
              title={product.title}
              image={product.image}
              price={product.price}
              description={product.description}
            />
          ))}
      </section>
    </>
  );
};
export { Product };
