import { useState } from "react";

function App() {
  const products = [
    { name: "Mela", price: 0.5 },
    { name: "Pane", price: 1.2 },
    { name: "Latte", price: 1.0 },
    { name: "Pasta", price: 0.7 },
  ];

  const [addedProducts, setAddedProducts] = useState([]);

  const updateProductQuantity = (name, quantity) => {
    if (quantity < 1 || isNaN(quantity)) {
      return;
    }
    setAddedProducts((curr) =>
      curr.map((product) =>
        product.name === name ? { ...product, quantity } : product
      )
    );
  };

  const addToCart = (product) => {
    const addedProduct = addedProducts.find((p) => p.name === product.name);
    if (addedProduct) {
      updateProductQuantity(addedProduct.name, addedProduct.quantity + 1);
      return;
    }
    setAddedProducts((curr) => [...curr, { ...product, quantity: 1 }]);
  };

  const removeFromCart = (product) => {
    setAddedProducts((curr) => curr.filter((p) => p.name !== product.name));
  };

  const totalToPay = addedProducts.reduce(
    (acc, p) => acc + p.price * p.quantity,
    0
  );

  return (
    <>
      <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
        <h1>Lista dei prodotti</h1>
        <ul>
          {products.map((product) => (
            <li key={product.name} style={{ marginBottom: "10px" }}>
              <p>Nome: {product.name}</p>
              <p>Prezzo: {product.price.toFixed(2)}€</p>
              <button onClick={() => addToCart(product)}>
                Aggiungi al carrello
              </button>
            </li>
          ))}
        </ul>
      </div>
      {addedProducts.length > 0 && (
        <div>
          <h2>Carrello</h2>
          <ul>
            {addedProducts.map((product, i) => (
              <li key={i}>
                <p>Nome: {product.name}</p>
                <p>Prezzo: {product.price.toFixed(2)}€</p>
                <p>Quantità: {product.quantity}</p>
                <input
                  type="number"
                  value={product.quantity}
                  onChange={(e) =>
                    updateProductQuantity(
                      product.name,
                      parseInt(e.target.value)
                    )
                  }
                />
                <button onClick={() => removeFromCart(product)}>
                  Rimuovi dal carrello
                </button>
              </li>
            ))}
          </ul>
          <h3>Totale da pagare: {totalToPay.toFixed(2)}€</h3>
        </div>
      )}
    </>
  );
}

export default App;
