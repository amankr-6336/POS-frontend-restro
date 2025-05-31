import { axiosClient } from "../utils/axiosCLient";

export const handleAddCategory = async ({
  restaurantId,
  name,
  description,
}) => {
  return axiosClient.post("/category/create-category", {
    restaurantId,
    name,
    description,
  });
};

export const handleGetCategories = async (restaurantId) => {
  return axiosClient.get("/category/get-categories", {
    params: restaurantId,
  });
};

export const handleGetMenuForSingleCategory = async (categoryId) => {
  return axiosClient.get("/menu/get-menu", {
    params: categoryId,
  });
};

export const handleAddMenuForCategory = async ({
  restroId,
  name,
  description,
  price,
  categoryId,
  isVeg,
  isStock,
  image,
}) => {
  return axiosClient.post("/menu/add-menu", {
    restroId,
    name,
    description,
    price,
    categoryId,
    isVeg,
    isStock,
    image,
  });
};

export const handleGenerateDescription = async (dishName) => {
  return axiosClient.post("/generate/description", {
    dishName,
  });
};
