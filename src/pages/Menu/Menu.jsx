import React, { useEffect, useState } from "react";
import Header from "../../component/Header/Header";
import SingleCategory from "./SingleCategory/SingleCategory";
import "./Menu.scss";
import SingleMenu from "./SingleMenu/SingleMenu";
import MenuDetail from "./MenuDetail/MenuDetail";
import Dialog from "../../component/common/dialog/Dialog";
import Input from "../../component/common/input/Input";
import AddMenu from "./addMenu/AddMenu";
import { useSelector } from "react-redux";
import EmptyState from "../../component/emptystate/EmptyState";
import useApi from "../../hooks/useApi.js";
import {
  handleAddCategory,
  handleGetCategories,
  handleGetMenuForSingleCategory,
} from "../../services/Menu.api.js";

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

  const addCategoryApi = useApi(handleAddCategory);
  const getCategoriesApi = useApi(handleGetCategories);
  const getMenuForCategoryApi = useApi(handleGetMenuForSingleCategory);

  useEffect(() => {
    GetCategory();
  }, []);

  useEffect(() => {
    if (selectedCategory != null) {
      getMenuForCategory({ category: selectedCategory, menuId: null });
    }
  }, [selectedCategory]);

  async function GetCategory() {
    try {
      const { data } = await getCategoriesApi.execute({
        restaurantId: userInfo.restaurant._id,
      });
      const categories = data?.result?.categories;
      setCategories(categories);
      if (categories && categories.length > 0) {
        const firstCategory = categories[0];
        setSelectedCategory(firstCategory);
        await getMenuForCategory(firstCategory);
      }
      setSelectedCategory(data?.result?.categories[0]);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getMenuForCategory({ category, menuId }) {
    try {
      const { data } = await getMenuForCategoryApi.execute({
        categoryId: category?._id,
      });
      const menus = data?.result?.menus || [];
      setMenu(menus);
      if (menuId) {
        const matchedMenu = menus.find((menu) => menu._id === menuId);
        console.log(matchedMenu);
        setDetail(matchedMenu || null);
      } else {
        setDetail(menus[0] || null);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleOpen() {
    setcatDialog(!catDialog);
  }

  async function handleAddCategoryfunc() {
    try {
      const { success, data } = await addCategoryApi.execute({
        restaurantId: userInfo.restaurant._id,
        name: addCategory,
        description: addcatdescription,
      });
      if (success) {
        setCategories((prevState) => [...prevState, data.result.category]);
      }
      setAddCategory("");
      setaddcatdescription("");
      handleOpen();
    } catch (error) {
      console.log(error);
    }
  }

  function HandletoggleMenudialog() {
    setMenuDialog(!menuDialog);
  }

  return (
    <div className="table">
      <div className="top-section">
        <Header
          title={"Menu"}
          open={menuDialog}
          buttonNeeded={true}
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
              confirm={{ text: "Add", onConfirm: handleAddCategoryfunc }}
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
            menu?.length > 0 ? (
              <div className="menu-listing">
                {menu?.map((item, index) => (
                  <SingleMenu onSet={setDetail} data={item} key={index} />
                ))}
              </div>
            ) : (
              <EmptyState subtext="Add Menu for this category" />
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
