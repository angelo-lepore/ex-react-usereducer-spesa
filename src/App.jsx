import { useReducer } from "react";

function cartReducer(addedProducts, action) {
  switch (action.type) {
    case "ADD_ITEM":
      // Logica per aggiungere un prodotto
      const addedProduct = addedProducts.find(
        (p) => p.name === action.payload.name
      );
      if (addedProduct) {
        action.payload.quantity = addedProduct.quantity + 1;
      } else {
        return [...addedProducts, { ...action.payload, quantity: 1 }];
      }
    case "UPDATE_QUANTITY":
      // Logica per aggiornare la quantità
      if (action.payload.quantity < 1 || isNaN(action.payload.quantity)) {
        return addedProducts;
      }
      return addedProducts.map((product) =>
        product.name === action.payload.name
          ? { ...product, quantity: action.payload.quantity }
          : product
      );
    case "REMOVE_ITEM":
      // Logica per rimuovere un prodotto
      return addedProducts.filter((p) => p.name !== action.payload);
    default:
      return state;
  }
}

function App() {
  const products = [
    { name: "Mela", price: 0.5 },
    { name: "Pane", price: 1.2 },
    { name: "Latte", price: 1.0 },
    { name: "Pasta", price: 0.7 },
  ];

  const [addedProducts, dispatchCart] = useReducer(cartReducer, []);

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
              <button
                onClick={() =>
                  dispatchCart({ type: "ADD_ITEM", payload: product })
                }
              >
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
                    dispatchCart({
                      type: "UPDATE_QUANTITY",
                      payload: {
                        name: product.name,
                        quantity: parseInt(e.target.value),
                      },
                    })
                  }
                />
                <button
                  onClick={() =>
                    dispatchCart({ type: "REMOVE_ITEM", payload: product.name })
                  }
                >
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
