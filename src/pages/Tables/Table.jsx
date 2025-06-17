import React, { useEffect, useState } from "react";
import Header from "../../component/Header/Header";
import "./Table.scss";
import SingleTableComponent from "./singleTableComponent/SingleTableComponent";
import TableDetail from "./TableDetail/TableDetail";
import AddTable from "./AddTable/AddTable";
import { useSelector } from "react-redux";
import useApi from "../../hooks/useApi.js";
import { getTables } from "../../services/Table.api";
import EmptyState from "../../component/emptystate/EmptyState";
import ClipLoader from "react-spinners/ClipLoader";
function Table() {
  const [tableList, setTableList] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [tableDialog, setTableDialog] = useState(false);

  const userInfo = useSelector((state) => state.UserReducer.owner);

  const getTableApi = useApi(getTables);

  useEffect(() => {
    getTableList();
  }, []);

  // get the list of Tables
  async function getTableList() {
    const { success, data } = await getTableApi.execute({
      restaurantId: userInfo.restaurant._id,
    });
    console.log(success, data);
    if (success) {
      setTableList(data?.result);
      setSelectedTable(data?.result[0]);
    } else {
      alert(getTableApi.error || "Failed to fetch restaurants.");
    }
  }

  // Add Table Dialog
  function HandleToggleTableDialog() {
    setTableDialog(!tableDialog);
  }

  return (
    <div className="table">
    <div className="top-section">
      <Header
        title={"Table"}
        open={tableDialog}
        buttonNeeded={true}
        setToggle={setTableDialog}
        dialogContent={
          tableDialog && (
            <AddTable
              open={tableDialog}
              setToggle={HandleToggleTableDialog}
              update={setTableList}
            />
          )
        }
      />
    </div>

    {getTableApi.loading ? (
      <div style={{width:"100%",height:"100vh",display:"flex",justifyContent:"center",alignItems:"center"}}>
        <ClipLoader color="#4F46E5" size={50} />
      </div>
    ) : getTableApi.data && tableList?.length === 0 ? (
      <EmptyState
        boldtext="No tables have been added yet."
        subtext="Please add tables to manage your restaurant seating."
      />
    ) : (
      <div className="bottom-section">
        <div className="listing-section">
          <div className="table-section">
            {tableList && tableList?.map((item, index) => (
              <SingleTableComponent
                key={index}
                data={item}
                onSelect={setSelectedTable}
              />
            ))}
          </div>
        </div>
        {selectedTable && (
          <div className="detail-view">
            <TableDetail data={selectedTable} />
          </div>
        )}
        <div className="sign">
          <div className="sign-box">
            <span style={{ backgroundColor: "#eeb200" }}></span>
            <p>Occupied</p>
          </div>
          <div className="sign-box">
            <span style={{ backgroundColor: "#e5e5e6" }}></span>
            <p>Vacant</p>
          </div>
        </div>
      </div>
    )}
  </div>
  );
}

export default Table;
