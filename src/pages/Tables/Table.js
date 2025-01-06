import React, { useEffect, useState } from "react";
import Header from "../../component/Header/Header";
import "./Table.scss";
import SingleTableComponent from "./singleTableComponent/SingleTableComponent";
import { axiosClient } from "../../utils/axiosCLient";
import TableDetail from "./TableDetail/TableDetail";
function Table() {
  const [tableList, setTableList] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);

  useEffect(() => {
    getTableList();
  }, []);

  const id = "6766eecdfae318648d9368ee";

  async function getTableList() {
    try {
      const response = await axiosClient.get("/table/get-table", {
        params: { restaurantId: "6766eecdfae318648d9368ee" },
      });
      console.log(response?.data?.result?.tables);
      setTableList(response?.data?.result?.tables);
      setSelectedTable(response?.data?.result?.tables[0]);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="table">
      <div className="top-section">
        <Header title={"Table"} />
      </div>
      <div className="bottom-section">
        <div className="listing-section">
          <div className="table-section">
            {tableList?.map((item, index) => (
              <SingleTableComponent
                key={index}
                data={item}
                onSelect={setSelectedTable}
              />
            ))}
          </div>
        </div>
        <div className="detail-view">
          <TableDetail data={selectedTable} />
        </div>
      </div>
    </div>
  );
}

export default Table;
