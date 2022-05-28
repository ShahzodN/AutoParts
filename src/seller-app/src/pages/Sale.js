import { React, useState } from "react";
import { IoAdd, IoRemove } from "react-icons/io5";
import saleService from "../services/saleService.service";
import { Button } from "react-bootstrap";
import "../css/Sale.css";

export function Sale() {
  const IMAGE_SRC = `${window.location.protocol}//localhost:5000/images/Product`;

  const [products, setProducts] = useState([]);

  document.onkeyup = (e) => {
    if (e.key === "f")
      finishSale();
  }

  function beep() {
    var context = new AudioContext();
    var oscillator = context.createOscillator();
    oscillator.type = "sine";
    oscillator.frequency.value = 900;
    oscillator.connect(context.destination);
    oscillator.start();
    // Beep for 500 milliseconds
    setTimeout(function () {
      oscillator.stop();
    }, 100);
  }

  function onScanner(input) {
    beep();
    if (input.value.length) {
      saleService.getProduct(input.value).then(result => {
        let index = products.findIndex(x => x.id === result.data.id);

        if (index !== -1) {
          products[index].quantity += 1;
          setProducts([...products]);
        }
        else {
          console.log(result.data);
          setProducts([...products, { id: result.data.id, price: result.data.price, quantity: 1, name: result.data.name, ean: result.data.ean }]);
        }

        input.value = "";
      });
    }

    focusOnInput();
  }

  function finishSale() {
    if (products.length === 0)
      return;

    const model = {
      products: products.map(p => ({ id: p.id, quantity: p.quantity })),
      seller: JSON.parse(localStorage.getItem("credentials")).user
    };

    saleService.create(model).then(result => {
      setProducts([]);
    });

    focusOnInput();
  }

  function decrementQuantity(e) {
    const ean = e.target.parentElement.attributes["data-ean"].value;

    const productsCopy = [...products];
    const product = productsCopy.find(p => p.ean === ean);

    if (product.quantity === 1) {
      setProducts(products.filter(p => p.ean !== ean));
    }
    else {
      product.quantity -= 1;
      setProducts(productsCopy);
    }

    focusOnInput();
  }

  function incrementQuantity(e) {
    const ean = e.target.parentElement.attributes["data-ean"].value;

    const productsCopy = [...products];
    const product = productsCopy.find(p => p.ean === ean);

    product.quantity += 1;
    setProducts(productsCopy);

    focusOnInput();
  }

  function focusOnInput() {
    document.getElementById("ean-input").focus();
  }

  return (
    <div className="container">
      <embed src="../sound/beep.mp3" hidden id="beeper"></embed>
      <div className="row mt-3">
        <div className="col-3">
          <input
            autoFocus
            type="text"
            className="form-control"
            id="ean-input"
            onChange={e => onScanner(e.target)}
            placeholder="Артикул товара"
          />
        </div>
      </div>
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Артикул</th>
              <th className="px-2">Продукт</th>
              <th>Количество</th>
              <th>Цена</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => {
              return (
                <tr key={p.id}>
                  <td>{p.ean}</td>
                  <td style={{ wordWrap: "break-word" }}>{p.name}</td>
                  <td>
                    <div data-ean={p.ean} style={{ userSelect: "none" }}>
                      <IoRemove
                        size={28}
                        className="me-1"
                        onClick={e => decrementQuantity(e)}
                      />
                      {p.quantity}
                      <IoAdd
                        size={28}
                        className="ms-1"
                        onClick={e => incrementQuantity(e)}
                      />
                    </div>
                  </td>
                  <td>{p.price}&#8381;</td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <span id="sale-sum">Сумма: <strong>{products.map(p => (p.quantity * p.price))}&#8381;</strong></span>
      </div>
      <Button
        onClick={_ => finishSale()}
        disabled={products.length === 0}
      >
        Завершить
      </Button>
    </div>
  )
}