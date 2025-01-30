const endpoints = {
    auth: {
      login: "/auth/login",
      register: "/auth/signup",
    },
    owner:{
      info:"/owner/getownerinfo"
    },
    restaurant: {
      create: "/restaurant/create-restro",
    },
    table:{
      getTables:"/table/get-table",
      addTable:"/table/create-table"
    },
    menu: {
      getMenu: "/menu/get-menu",
      addMenu: "/menu/add-menu",
      updateMenu: "/menu/update-menu"
    },
    category: {
      getCategories:"/category/get-categories",
      addCategory:"/category/create-category"
    },
    orders: {
      getOrders: "/order/get-order",
      updateOrder: "/order/update-order",
    },
  };
  
  export default endpoints;
  