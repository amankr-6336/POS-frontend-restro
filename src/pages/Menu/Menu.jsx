import React, { useEffect, useState } from "react";
import Header from "../../component/Header/Header";
import SingleCategory from "./SingleCategory/SingleCategory";
import { axiosClient } from "../../utils/axiosCLient";
import "./Menu.scss";
import SingleMenu from "./SingleMenu/SingleMenu";
import MenuDetail from "./MenuDetail/MenuDetail";
import Button from "../../component/common/button/Button";
import Dialog from "../../component/common/dialog/Dialog";
import Input from "../../component/common/input/Input";
import AddMenu from "./addMenu/AddMenu";
import { useSelector } from "react-redux";
import EmptyState from "../../component/emptystate/EmptyState";

function Menu() {
  const [categories, setCategories] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [menu, setMenu] = useState(null);
  const [detail, setDetail] = useState(null);
  const [catDialog, setcatDialog] = useState(false);
  const [addCategory, setAddCategory] = useState("");
  const [addcatdescription, setaddcatdescription] = useState("");
  const [menuDialog, setMenuDialog] = useState(false);

  const userInfo = useSelector((state) => state.UserReducer.owner);

  useEffect(() => {
    GetCategory();
  }, []);

  async function GetCategory() {
    try {
      const response = await axiosClient.get("/category/get-categories", {
        params: { restaurantId: userInfo.restaurant._id },
      });
      const categories = response?.result?.categories;

      setCategories(categories);
      if (categories && categories.length > 0) {
        const firstCategory = categories[0];
        setSelectedCategory(firstCategory);
        await getMenuForCategory(firstCategory);
      }
      setSelectedCategory(response?.result?.categories[0]);

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getMenuForCategory({ category: selectedCategory, menuId: null });
  }, [selectedCategory]);

  async function getMenuForCategory({ category, menuId }) {
    console.log(menuId);
    try {
      const response = await axiosClient.get("/menu/get-menu", {
        params: { categoryId: category._id },
      });
      // console.log(response.data.result.menus);

      const menus = response?.result?.menus || [];
      setMenu(menus);
      if (menuId) {
        console.log("inside if else");
        // Find the menu with the matching ID
        const matchedMenu = menus.find((menu) => menu._id === menuId);
        console.log(matchedMenu);
        setDetail(matchedMenu || null); // Set matched menu or null if not found
      } else {
        // Default to the first menu if no ID is provided
        setDetail(menus[0] || null);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleOpen() {
    setcatDialog(!catDialog);
  }

  async function handleAddCategory() {
    try {
      const response = await axiosClient.post("/category/create-category", {
        restaurantId: userInfo.restaurant._id,
        name: addCategory,
        description: addcatdescription,
      });
      console.log(response.result.category);
      if (response) {
        console.log("entered");
        setCategories((prevState) => [...prevState, response.result.category]);
        // GetCategory();
      }
      setAddCategory("");
      setaddcatdescription("");
      handleOpen();
    } catch (error) {
      console.log(error);
    }
  }

  // async function handleCreateMenu() {
  //   try {
  //     const response = await axiosClient.post("/menu/create-menu", {});
  //   } catch (error) {}
  // }
  function HandletoggleMenudialog() {
    setMenuDialog(!menuDialog);
  }
  return (
    <div className="table">
      <div className="top-section">
        <Header
          title={"Menu"}
          open={menuDialog}
          setToggle={setMenuDialog}
          dialogContent={
            menuDialog && (
              <AddMenu
                open={menuDialog}
                setToggle={HandletoggleMenudialog}
                update={getMenuForCategory}
              />
            )
          }
        />
      </div>
      <div className="bottom-section">
        <div className="listing-section">
          <div className="category-section">
            <Dialog
              isOpen={catDialog}
              onClose={handleOpen}
              title="Add Category"
              confirm={{ text: "Add", onConfirm: handleAddCategory }}
            >
              <Input
                label="Category Name"
                name="name"
                value={addCategory}
                onChange={setAddCategory}
              />
              <Input
                label="Category description"
                name="description"
                value={addcatdescription}
                onChange={setaddcatdescription}
              />
            </Dialog>
            <button id="addcat" onClick={handleOpen}>
              <p>Add Category</p>
            </button>
            {categories?.map((item, index) => (
              <SingleCategory
                setSelectedCategory={setSelectedCategory}
                selected={selectedCategory}
                data={item}
                key={index}
              />
            ))}
          </div>
          {categories?.length != 0 ? (
            menu?.length>0 ? (
              <div className="menu-listing">
                {menu?.map((item, index) => (
                  <SingleMenu onSet={setDetail} data={item} key={index} />
                ))}
              </div>
            ) : (
              <EmptyState
                subtext="Add Menu for this category"
              />
            )
          ) : (
            <div className="menu-listing">
              <EmptyState
                boldtext="No Category found"
                subtext="Please create Category to Add Menu"
              />
            </div>
          )}
        </div>
        {selectedCategory && (
          <div className="detail-view">
            <MenuDetail data={detail} update={getMenuForCategory} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Menu;
