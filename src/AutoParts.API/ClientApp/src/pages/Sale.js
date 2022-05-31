import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import salesService from "../services/sales.service";
import "../css/Sale.css";

export function Sale() {

  const params = useParams();
  const [sale, setSale] = useState({ products: [] });

  useEffect(() => {
    salesService.getSale(params.id).then(result => {
      setSale(result.data);
      console.log(result.data);
    });
  }, []);

  return (
    <div style={{ height: "100vh", backgroundColor: "white" }}>
      <div className="row justify-content-center">
        <div className="col-4 mt-3" style={{ backgroundColor: "white" }}>
          <div className="d-flex flex-column p-3">
            <span className="m-auto" style={{ fontSize: "1.5rem", fontWeight: "700", letterSpacing: "2px" }}>AUTOPARTS</span>
            {sale.products.map(p => {
              return (
                <>
                  <div className="row">
                    <div className="col"><b>Цена</b></div>
                    <div className="col"><b>Количество</b></div>
                    <div className="col"><b>Итого</b></div>
                  </div>
                  <span className="text-break">{p.ean} {p.name}</span>
                  <div className="row">
                    <div className="col">
                      <span>{p.price}&#8381;</span>
                    </div>
                    <div className="col">
                      <span>{p.quantity}</span>
                    </div>
                    <div className="col">
                      <span>{p.quantity * p.price}&#8381;</span>
                    </div>
                  </div>
                </>
              )
            })}
            <hr style={{ opacity: "1", borderTop: "dotted", backgroundColor: "white", margin: "10px 0" }} />
            <span style={{ fontSize: "1.5rem", }}>ПОДИТОГ: {sale.sum}&#8381;</span>
            <hr style={{ opacity: "1", borderTop: "dotted", backgroundColor: "white", margin: "10px 0" }} />
            <div className="row">
              <div className="col">
                <div className="d-flex justify-content-between">
                  <span>НАЛИЧНЫМИ:</span>
                  <span>{sale.sum}&#8381;</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>ЭЛЕКТРОННЫМИ:</span>
                  <span>{0}&#8381;</span>
                </div>
              </div>
              <div className="col">
                <div className="d-flex justify-content-between">
                  <span>ПРИНЯТО:</span>
                  <span>{sale.taken}&#8381;</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>СДАЧА:</span>
                  <span>{sale.change}&#8381;</span>
                </div>
              </div>
            </div>
            <hr style={{ opacity: "1", borderTop: "dotted", backgroundColor: "white", margin: "10px 0" }} />
            <div className="d-flex justify-content-between">
              <span>Кассир: {sale.seller}</span>
              <span>{sale.dateTime}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}