import React, { useState } from "react";
import "./AddTable.scss";
import { ImOffice } from "react-icons/im";
import Dialog from "../../../component/common/dialog/Dialog";
import Input from "../../../component/common/input/Input";
import { axiosClient } from "../../../utils/axiosCLient";
import { useSelector } from "react-redux";
import { useApi } from "../../../services/UseApi";

function AddTable({ open, setToggle, update }) {
  const [tableNumber, setTableNumber] = useState("");
  const [tableCapacity,setTableCapacity]=useState("");
  const userInfo = useSelector((state) => state.UserReducer.owner);
  const addTableApi=useApi()
  async function HandleAddTable() {
    try {
      const response = await axiosClient.post("/table/create-table", {
        restroId: userInfo.restaurant._id,
        tableNumber: tableNumber,
        tableCapacity:tableCapacity?tableCapacity:2 
      });
      console.log(response);
      if(response){
        update((prevTables)=>[...prevTables,response.result.savedTable])
      }
      setToggle();
    } catch (error) {
        console.log(error);
    }
  }

  return (
    <div className="add-table">
      <Dialog
        title="Add Table"
        isOpen={open}
        onClose={setToggle}
        confirm={{ text: "Add Table", onConfirm: HandleAddTable }}
      >
        <Input
          label="Table Number"
          name="number"
          value={tableNumber}
          onChange={setTableNumber}
        />
        <Input
          label="Table Capacity"
          name="number"
          value={tableCapacity}
          onChange={setTableCapacity}
        />
      </Dialog>
    </div>
  );
}

export default AddTable;
