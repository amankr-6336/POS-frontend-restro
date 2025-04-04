import React, { useEffect, useState } from "react";
import Header from "../../component/Header/Header";
import "./Table.scss";
import SingleTableComponent from "./singleTableComponent/SingleTableComponent";
import TableDetail from "./TableDetail/TableDetail";
import AddTable from "./AddTable/AddTable";
import { useSelector } from "react-redux";
import {useApi} from '../../services/UseApi'
import { getTables } from "../../services/Table.api";
function Table() {
  const [tableList, setTableList] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [tableDialog,setTableDialog]=useState(false);
  const getTableApi = useApi(getTables);
  const userInfo = useSelector((state) => state.UserReducer.owner);

  useEffect(() => {
    getTableList();
    // getTables()
    // getTables({restaurantId: userInfo.restaurant._id,setTableList})
  }, []);

  // getTables({restaurantId: userInfo.restaurant._id})
  

  // get the list of Tables
  async function getTableList() {
    const {success,data}=await getTableApi.execute({restaurantId: userInfo.restaurant._id})
    console.log(success,data);
    if(success){
      setTableList(data?.result?.tables);
      setSelectedTable(data?.result?.tables[0]);
    }
    else{
      alert(getTableApi.error || "Failed to fetch restaurants.");
    }
  }
  
  // Add Table Dialog
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
                update={setTableList}
              />
            )
          } />
      </div>
      <div className="bottom-section">
        <div className="listing-section">
        {/* {getTableApi.loading ? "Creating..." : "Create Restaurant"} */}
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
        {selectedTable && <div className="detail-view">
          <TableDetail data={selectedTable} />
        </div>}
        <div className="sign">
            <div className="sign-box">
              <span style={{backgroundColor:"#eeb200"}} ></span>
               <p>Occupied</p>
            </div>
            <div className="sign-box">
              <span style={{backgroundColor:"#e5e5e6"}} ></span>
               <p>Vacant</p>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Table;
