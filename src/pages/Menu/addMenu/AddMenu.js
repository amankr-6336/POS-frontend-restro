import React, { useEffect, useState } from "react";
import Dialog from "../../../component/common/dialog/Dialog";
import CustomDropdown from "../../../component/common/DropDownButton/DropDownButton";
import Input from "../../../component/common/input/Input";
import { axiosClient } from "../../../utils/axiosCLient";
import RadioButton from "../../../component/common/RadioButton/RadioButton";

function AddMenu({ open, setToggle ,update}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [categoryOption, setCategoryOption] = useState(null);
  const [type, setType] = useState();
  const [selectedCategory,setSelectedCategory]=useState("");

  const RadioOptions = [
    { label: "Veg", value: "true" },
    { label: "Non-Veg", value: "false" },
  ];

  useEffect(() => {
    GetCategory();
  }, []);

   async function HandleaddMenu() {
    console.log(name);
    console.log(description);
    console.log(price);
    console.log(type);
    console.log(selectedCategory)
    try {
      const response=await axiosClient.post('/menu/add-menu',{
        restroId:"6766eecdfae318648d9368ee",
      name:name,
      description:description,
      price:price,
      categoryId:selectedCategory._id,
      isVeg:type,
      isStock:true
      })
      console.log(response);

      setName("");
      setDescription("");
      setPrice("");
      setSelectedCategory("");
      setType("");
      setToggle();

      update({category:selectedCategory,menuId:response.data.result.savedMenu._id})
    } catch (error) {
      console.log(error);
    }
  }

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

  const handleChange = (value) => {
    console.log("Selected Value:", value);
    setType(value);
  };
  return (
    <div className="add-menu">
      <Dialog
        title="Add Menu"
        isOpen={open}
        onClose={setToggle}
        confirm={{ text: "Add Menu", onConfirm: HandleaddMenu }}
      >
        <Input label="Menu Name" name="name" value={name} onChange={setName} />
        <RadioButton
          options={RadioOptions}
          name="radio"
          selectedValue={type}
          onChange={handleChange}
        />

        <CustomDropdown
          options={categoryOption}
          placeholder="Choose a category"
          displayKey="name" // Key to display in the dropdown
          selectedValue={selectedCategory}
          // onSelect={(selected) => setSelectedCategory(selected)}
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

export default AddMenu;
