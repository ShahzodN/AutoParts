import React, { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { Consignment } from "./Consignment";
import consignmentService from "../services/consignment.service";
import { Button, Spinner } from "react-bootstrap";
import { NewConsignment } from "./NewConsignment";
import { BsXLg } from "react-icons/bs";

export function DeliveryOfGoods() {

    const [consignments, setConsignments] = useState([]);
    const [downloaded, setDownloaded] = useState(false);

    useEffect(() => {
        consignmentService.getAll().then(res => {
            setConsignments(res);
            setDownloaded(true);
        });
    }, [])

    function deleteConsignment(e) {
        const id = parseInt(e.target.attributes['data-id'].value);

        consignmentService.remove(id).then(response => {
            if (response.ok) {
                let copy = consignments.filter(s => s.id !== id);
                setConsignments(copy);
            }
        });
    }

    return downloaded ? (
        <div className="container-fluid">
            <div className="consignments">
                <h3>Поставка товаров</h3>
                <Link to="/admin/delivery-of-goods/new" className="btn btn-primary">Новая поставка</Link>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Дата</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {consignments.map((v, i) => {
                            return (
                                <tr key={v.id}>
                                    <th scope="row">{i + 1}</th>
                                    <td>{v.date}</td>
                                    <td><Link to={`/admin/delivery-of-goods/${v.id}`}>Подробнее</Link></td>
                                    <td>
                                        <Button onClick={deleteConsignment} data-id={v.id}>
                                            <BsXLg pointerEvents={'none'} />
                                        </Button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <Routes>
                <Route exact path="/:id" element={<Consignment />} />
                <Route exact path="/new" element={<NewConsignment />} />
            </Routes>
        </div>
    ) : <div className="container d-flex justify-content-center align-items-center">
        <Spinner animation="border"></Spinner>
    </div>
}