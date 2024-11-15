import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = process.env.REACT_APP_BASE_URL_SERVER;

const API = axios.create({
  baseURL: BASE_URL,
});

API.interceptors.request.use(
  function (config) {
    let token;
    if (Cookies.get("token")) {
      token = Cookies.get("token");
    }
    config.headers.authorization = `${token}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

//adminlogin
API.adminLogin = (data) => {
  return API.post("admin/login", data);
};

API.changePassword = (data) => {
  return API.patch("admin/change-password", data);
};

API.updateProfile = (data) => {
  return API.patch(`admin/`, data);
};

 

//Category

API.getAllCategories = () => {
  return API.get("category");
};

API.getSingleCategorey = (id, data) => {
  return API.patch(`category/${id}`, data);
};

API.createCategory = (data) => {
  return API.post("category", data);
};

API.updateCategory = (id, data) => {
  return API.patch(`category/${id}`, data);
};

// blogs

API.getBlogHeading = () => {
  return API.get("/blog-heading");
};

API.updateBlogHeading = (id, data) => {
  return API.patch(`/blog-heading/${id}`, data);
};

API.getAllBlogs = () => {
  return API.get("blog");
};

API.getSingleBlog = (id) => {
  return API.get(`/blog/id/${id}`);
};

API.createBlogs = (data) => {
  return API.post("blog", data);
};

API.updateBlogs = (id, data) => {
  return API.patch(`blog/${id}`, data);
};

API.deleteBlogs = (id) => {
  return API.delete(`blog/${id}`);
};

// Recipes

API.getRecipeHeading = () => {
  return API.get("/recipe-heading");
};

API.updateRecipeHeading = (id, data) => {
  return API.patch(`/recipe-heading/${id}`, data);
};

API.getAllRecipes = () => {
  return API.get("recipe");
};

API.getSingleRecipe = (id) => {
  return API.get(`/recipe/id/${id}`);
};

API.createRecipe = (data) => {
  return API.post("recipe", data);
};

API.updateRecipe = (id, data) => {
  return API.patch(`recipe/${id}`, data);
};

API.deleteRecipe = (id) => {
  return API.delete(`recipe/${id}`);
};

 

 
 
 
 
 
 //MembersManagement
API.getAllUsers = () => {
  return API.get("user");
};

API.getSingleUsers = (id) => {
  return API.get(`user/${id}`);
};

API.getAllSubscribedMembers = () => {
  return API.get("user/subscription");
};
API.registerUserSubscription = (data) => {
  return API.post("user/subscription", data);
};
API.getSingleSubscribedMembers = (id) => {
  return API.get(`user/subscription/${id}`);
};
API.updateUserSubscription = (id, data) => {
  return API.patch(`user/subscription/${id}`, data);
};

API.createuser = (data) => {
  return API.post("user/by-admin", data);
};

API.updateUser = (id, data) => {
  return API.patch(`user/by-admin/${id}`, data);
};


//product

API.uploadProduct = (data) => {
  return API.post("/product", data);
};

API.getProducts = () => {
  return API.get("/product/admin");
};

API.getSingleProduct = (id) => {
  return API.get(`/product/id/${id}`);
};

API.updateProduct = (id, data) => {
  return API.patch(`/product/${id}`, data);
};

// productReviews
API.getAllProductReviews = () => {
  return API.get("productReview");
};

API.getSingleReview = (id) => {
  return API.get(`/productReview/single/${id}`);
};

API.updateProductReview = (id, data) => {
  return API.patch(`productReview/${id}`, data);
};
//newsletter
API.getAllNewsletter = () => {
  return API.get("/newsletter");
};

API.uploadImages = (data) => {
  return API.post("/image", data);
};

API.uploadVideo = (data) => {
  return API.post("/video", data);
};

//order

API.getAllOrders = () => {
  return API.get("/order");
};

API.getSingleOrder = (id) => {
  return API.get(`/order/${id}`);
};

API.orderUpdateStatus = (id, data) => {
  return API.patch(`/order/${id}`, data);
};

//custom order

API.getAllCustomOrders = () => {
  return API.get("/custom-order");
};

API.getSingleCustomOrder = (id) => {
  return API.get(`/custom-order/${id}`);
};

API.updateCustomOrder = (id, data) => {
  return API.patch(`/custom-order/${id}`, data);
};

//statistics

API.getStatistics = () => {
  return API.get("/statistics");
};

// custom product
API.getAllFlavor = () => {
  return API.get("flavor");
};
API.createFlavor = (data) => {
  return API.post("flavor", data);
};
API.updateFlavor = (id, data) => {
  return API.patch(`flavor/${id}`, data);
};
API.getAllSize = () => {
  return API.get("size");
};
API.updateSize = (id, data) => {
  return API.patch(`size/${id}`, data);
};

// promo code

API.registerPromo = (data) => {
  return API.post("/promo", data);
};

API.getPromo = () => {
  return API.get("/promo");
};

API.updatePromo = (id, data) => {
  return API.patch(`/promo/${id}`, data);
};

//ticker

API.registerTicker = (data) => {
  return API.post("/ticker", data);
};

API.getTickers = () => {
  return API.get("/ticker");
};

API.updateTicker = (id, data) => {
  return API.patch(`/ticker/${id}`, data);
};

API.deleteTicker = (id) => {
  return API.delete(`/ticker/${id}`);
};

export { API };
