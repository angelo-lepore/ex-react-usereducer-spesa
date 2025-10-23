import { useState, useReducer } from "react";

const shoppingListReducer = (shoppingList, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      return [...shoppingList, action.payload];
    default:
      return shoppingList;
  }
};

function App() {
  const products = [
    { name: "Mela", price: 0.5 },
    { name: "Pane", price: 1.2 },
    { name: "Latte", price: 1.0 },
    { name: "Pasta", price: 0.7 },
  ];

  const [shoppingList] = useReducer(shoppingListReducer, products);

  const [addedProducts, setAddedProducts] = useState([]);

  const addToCart = (product) => {
    const isAlreadyAdded = addedProducts.some((p) => p.name === product.name);

    if (!isAlreadyAdded) {
      setAddedProducts([...addedProducts, { ...product, quantity: 1 }]);
    }
  };

  return (
    <>
      <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
        <h1>Lista dei prodotti</h1>
        <ul>
          {shoppingList.map((product) => (
            <li key={product.name} style={{ marginBottom: "10px" }}>
              <p>Nome: {product.name}</p>
              <p>Prezzo: {product.price}€</p>
              <button onClick={() => addToCart(product)}>
                Aggiungi al carrello
              </button>
            </li>
          ))}
        </ul>

        {addedProducts.length > 0 && (
          <>
            <h2>Carrello</h2>
            <ul>
              {addedProducts.map((item) => (
                <li key={item.name}>
                  <p>Nome: {item.name}</p>
                  <p>Prezzo: {item.price}€</p>
                  <p>Quantità: {item.quantity}</p>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
}

export default App;
