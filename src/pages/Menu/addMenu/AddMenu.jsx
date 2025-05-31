import React, { useEffect, useState } from "react";
import Dialog from "../../../component/common/dialog/Dialog";
import CustomDropdown from "../../../component/common/DropDownButton/DropDownButton";
import Input from "../../../component/common/input/Input";
import { axiosClient } from "../../../utils/axiosCLient";
import RadioButton from "../../../component/common/RadioButton/RadioButton";
import { useSelector } from "react-redux";
import { BsCardImage } from "react-icons/bs";
import "./AddMenu.scss";
import { IoSparklesSharp } from "react-icons/io5";
import Button from "../../../component/common/button/Button";
import useApi from "../../../hooks/useApi";
import {
  handleAddMenuForCategory,
  handleGenerateDescription,
  handleGetCategories,
} from "../../../services/Menu.api";

function AddMenu({ open, setToggle, update }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [categoryOption, setCategoryOption] = useState(null);
  const [type, setType] = useState();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [image, setImage] = useState("");

  const userInfo = useSelector((state) => state.UserReducer.owner);

  const addMenuApi = useApi(handleAddMenuForCategory);
  const getCategoriesApi = useApi(handleGetCategories);
  const generateDescriptionApi=useApi(handleGenerateDescription);

  const RadioOptions = [
    { label: "Veg", value: "true" },
    { label: "Non-Veg", value: "false" },
  ];

  useEffect(() => {
    GetCategory();
  }, []);

  async function HandleaddMenu() {
    try {
      const { data } = await addMenuApi.execute({
        restroId: userInfo.restaurant._id,
        name: name,
        description: description,
        price: price,
        categoryId: selectedCategory._id,
        isVeg: type,
        isStock: true,
        image: image,
      });
      setName("");
      setDescription("");
      setPrice("");
      setSelectedCategory("");
      setType("");
      setToggle();

      update({
        category: selectedCategory,
        menuId: data.result.savedMenu._id,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function GetCategory() {
    try {
      const { data } = await getCategoriesApi.execute({
        restaurantId: userInfo.restaurant._id,
      });
      const categories = data?.result?.categories;
      setCategoryOption(categories);
    } catch (error) {
      console.log(error);
    }
  }

  const handleChange = (value) => {
    console.log("Selected Value:", value);
    setType(value);
  };

  const handleImageChange = (e) => {
    console.log(e.target.value);
    const file = e.target.files[0];
    console.log(file);
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      if (fileReader.readyState === fileReader.DONE) {
        setImage(fileReader.result);
        console.log("img data", fileReader.result);
      }
    };
  };

  async function handledescriptionGeneration() {
    try {
      const {data}=await generateDescriptionApi.execute({dishName: name,})
      setDescription(data?.result);
    } catch (error) {
      console.log(error);
    }
  }

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
        <div className="description-generation">
          <Input
            label="Menu description"
            name="description"
            value={description}
            textArea={true}
            button={true}
            buttoninfo={{
              title: "Generate",
              icon: <IoSparklesSharp />,
              onsubmit: handledescriptionGeneration,
            }}
            onChange={setDescription}
          />
          <Button
            icon={<IoSparklesSharp />}
            type="magic"
            size="small"
            title="Generate description"
            onClick={handledescriptionGeneration}
          >
            Auto generate
          </Button>
        </div>

        <Input
          label="Menu price"
          name="price"
          value={price}
          onChange={setPrice}
        />
        <div style={{ width: "100%", margin: "5px 0px" }}>
          {/* <label htmlFor="inputImg" className="labelImg">
            <BsCardImage />
          </label> */}
          <input
            style={{ color: "#575764" }}
            id="inputImg"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
      </Dialog>
    </div>
  );
}

export default AddMenu;
