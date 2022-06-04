import { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { BalanceReport } from "../components/BalanceReport";
import { SalesReport } from "../components/SalesReport";

export function Reports() {

  const [key, setKey] = useState("sales");

  return (
    <div className="container">
      <Tabs
        activeKey={key}
        onSelect={k => setKey(k)}
      >
        <Tab eventKey="sales" title="Отчёт по продажам">
          <SalesReport />
        </Tab>
        <Tab eventKey="balance" title="Отчёт по остаткам">
          <BalanceReport />
        </Tab>
      </Tabs>
    </div>
  )
}