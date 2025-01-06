import React, { useEffect, useState } from "react";
import "./MenuDetail.scss";
import { FaRegEdit } from "react-icons/fa";
import bg from "../../../asset/henrique-felix-dMFIBmDYaIQ-unsplash.jpg";
import veg from "../../../asset/304248.png";
import nonVeg from "../../../asset/download (1).png";
import Dialog from "../../../component/common/dialog/Dialog";
import Input from "../../../component/common/input/Input";
import CustomDropdown from "../../../component/common/DropDownButton/DropDownButton";
import RadioButton from "../../../component/common/RadioButton/RadioButton";
import { axiosClient } from "../../../utils/axiosCLient";
import StockSwitch from "../../../component/common/Switchbutton/SwitchButton";
function MenuDetail({ data, update }) {
  const [updateMenuDialog, setUpdateMenuDailog] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [categoryOption, setCategoryOption] = useState(null);
  const [type, setType] = useState();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [Stock ,setStock]=useState();

  console.log(data);
  const RadioOptions = [
    { label: "Veg", value: "true" },
    { label: "Non-Veg", value: "false" },
  ];

  useEffect(() => {
    if (data) {
      setName(data.name || "");
      setDescription(data.description || "");
      setPrice(data.price || "");
      setType(data.isVeg);
      setSelectedCategory(data.categoryId);
      setStock(data.isStock);
    }
  }, [data]);

  useEffect(() => {
    GetCategory();
  }, []);

  async function GetCategory() {
    try {
      const response = await axiosClient.get("/category/get-categories", {
        params: { restaurantId: "6766eecdfae318648d9368ee" },
      });
      const categories = response?.data?.result?.categories;

      setCategoryOption(categories);
      console.log(categories);
    } catch (error) {
      console.log(error);
    }
  }

  function handleCloseUpdateMenuDailog() {
    setUpdateMenuDailog(!updateMenuDialog);
  }

  const handleChange = (value) => {
    console.log("Selected Value:", value);
    setType(value);
  };
  useEffect(() => {
    if (Stock !== undefined) {
      console.log("Stock changed to:", Stock); // Logs the updated value
      // handleUpdateMenu(); // Call update when Stock changes
      handleStockChangeMenu();
    }
  }, [Stock]);

  async function handleUpdateMenu() {
    console.log(Stock);
    try {
      const response = await axiosClient.patch("/menu/update-menu", {
        menuId: data._id,
        updates: {
          name: name,
          description: description,
          price: price,
          categoryId: selectedCategory._id,
          isVeg: type,
          isStock:Stock
        },
      });
      handleCloseUpdateMenuDailog();
      update({ category: data.categoryId, menuId: data._id });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
    async function handleStockChangeMenu() {
      console.log(Stock);
      try {
        const response = await axiosClient.patch("/menu/update-menu", {
          menuId: data._id,
          updates: {
            isStock:Stock
          },
        });
        update({ category: data.categoryId, menuId: data._id });
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }

  return (
    <div className="menu-detail">
      <div className="menu-name">
        <div className="name-and-type">
          <p>{data?.name}</p>
          <img src={data?.isVeg === true ? veg : nonVeg} alt="" />
          {/* <span style={{backgroundColor:`${data?.isVeg===true?"#2e8f44":"#c91e24"}`}} ></span> */}
        </div>
        <FaRegEdit onClick={handleCloseUpdateMenuDailog} />
      </div>
      <div className="menu-images">
        <img src={bg} alt="" />
      </div>
      <div className="menu-description">
        <p id="heading">Description</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic fuga
          laudantium illum, iste aliquid recusandae maiores error iusto.
        </p>
      </div>
      <div className="menu-category">
        <p>{data?.categoryId.name}</p>
      </div>
      <div className="menu-nutrition">
        <p id="heading">Nutrition</p>
        <p>Each Serving contains 550 Calories</p>
      </div>
      <div className="menu-price">
        <p id="price">Rs {data?.price}</p>
        <StockSwitch Stock={Stock} setStock={setStock}  update={handleUpdateMenu}/>
      </div>

      <Dialog
        title="Add Menu"
        isOpen={updateMenuDialog}
        onClose={handleCloseUpdateMenuDailog}
        confirm={{ text: "Add Menu", onConfirm: handleUpdateMenu }}
      >
        <Input label="Menu Name" name="name" value={name} onChange={setName} />
        <RadioButton
          options={RadioOptions}
          name="radio"
          selectedValue={type ? "true" : "false"}
          onChange={handleChange}
        />

        <CustomDropdown
          options={categoryOption}
          placeholder="Choose a category"
          displayKey="name" // Key to display in the dropdown
          selectedValue={selectedCategory}
          // onSelect={(selected) =>setSelectedCategory(selected)}
          onSelect={setSelectedCategory}
        />

        <Input
          label="Menu description"
          name="description"
          value={description}
          onChange={setDescription}
        />
        <Input
          label="Menu price"
          name="price"
          value={price}
          onChange={setPrice}
        />
      </Dialog>
    </div>
  );
}

export default MenuDetail;
