import React, { useEffect, useState } from "react";
import Header from "../../component/Header/Header";
import "./Table.scss";
import SingleTableComponent from "./singleTableComponent/SingleTableComponent";
import { axiosClient } from "../../utils/axiosCLient";
import TableDetail from "./TableDetail/TableDetail";
import AddTable from "./AddTable/AddTable";
import { useSelector } from "react-redux";
function Table() {
  const [tableList, setTableList] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [tableDialog,setTableDialog]=useState(false);
  
  const userInfo = useSelector((state) => state.UserReducer.owner);

  useEffect(() => {
    getTableList();
  }, []);

  const id = "6766eecdfae318648d9368ee";

  async function getTableList() {
    try {
      const response = await axiosClient.get("/table/get-table", {
        params: { restaurantId: userInfo.restaurant._id },
      });
      console.log(response);
      setTableList(response?.result?.tables);
      setSelectedTable(response?.result?.tables[0]);
    } catch (error) {
      console.log(error);
    }
  }
  
  function HandleToggleTableDialog(){
      setTableDialog(!tableDialog)
  }
  return (
    <div className="table">
      <div className="top-section">
        <Header title={"Table"}
          open={tableDialog}
          setToggle={setTableDialog}
          dialogContent={
            tableDialog && (
              <AddTable
                open={tableDialog}
                setToggle={HandleToggleTableDialog}
                update={getTableList}
              />
            )
          } />
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
