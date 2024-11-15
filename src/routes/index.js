import { createBrowserRouter } from "react-router-dom";
import ForgotPassword from "../pages/signin/ForgotPassword";
import ResetPassword from "../pages/signin/ResetPassword";
import LogIn from "../pages/signin/LogIn";
import RootLayout from "../components/layout/RootLayout";
import Indexdashboard from "../pages/dashboarddefault/Indexdashboard";
import AllMember from "../pages/MembersManagement/AllMember";
import ProfileDetails from "../pages/profile/ProfileDetails";
import ProfileUpdate from "../pages/profile/ProfileUpdate";
import ProfilePassword from "../pages/profile/ProfilePassword";
import ErrorPage from "../pages/ErrorPage";
import ProtectedRoutes from "../components/general/ProtectedRoutes";
import Newsletter from "../pages/SiteManagement/Newsletter";
import BlogsComponent from "../pages/SiteManagement/blogs/BlogsComponent";
import AddBlogs from "../pages/SiteManagement/blogs/AddBlogs";
import EditBlogs from "../pages/SiteManagement/blogs/EditBlogs";
import Products from "../pages/ecommerce/products/Products";
import AddProduct from "../pages/ecommerce/products/AddProduct";
import EditProducts from "../pages/ecommerce/products/EditProducts";
import Categories from "../pages/ecommerce/Categories/Categories";
import AddCategories from "../pages/ecommerce/Categories/AddCategories";
import EditCategory from "../pages/ecommerce/Categories/EditCategory";
import AllReviews from "../pages/ecommerce/reviews/AllReviews";
import EditReviews from "../pages/ecommerce/reviews/EditReviews";
import CustomProduct from "../pages/ecommerce/custom-product/CustomProduct";
import EditCustomProduct from "../pages/ecommerce/custom-product/EditCustomProduct";
import AddCustomFlavor from "../pages/ecommerce/custom-product/AddCustomFlavor";
import AllOrders from "../pages/ecommerce/order/AllOrders";
import EditOrders from "../pages/ecommerce/order/EditOrder";
import AllCustomOrder from "../pages/ecommerce/custom-order/AllCustomOrder";
import EditCustomOrder from "../pages/ecommerce/custom-order/EditCustomOrder";
import EditMember from "../pages/MembersManagement/EditMember";
import AddRecipes from "../pages/SiteManagement/recipes/AddRecipes";
import AllRecipes from "../pages/SiteManagement/recipes/AllRecipes";
import EditRecipes from "../pages/SiteManagement/recipes/EditRecipes";
import PromoComponent from "../pages/ecommerce/promo/PromoComponent";
import AddPromo from "../pages/ecommerce/promo/AddPromo";
import EditPromo from "../pages/ecommerce/promo/EditPromo";
import TickerComponent from "../pages/SiteManagement/ticker/TickerComponent";
import AddTicker from "../pages/SiteManagement/ticker/AddTicker";
import EditTicker from "../pages/SiteManagement/ticker/EditTicker";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LogIn />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/confirm-password",
    element: <ResetPassword />,
  },

  {
    path: "/dashboard",
    element: (
      <ProtectedRoutes>
        <RootLayout />
      </ProtectedRoutes>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "store",
        children: [
          {
            path: "products",
            children: [
              {
                path: "",
                element: <Products />,
              },
              {
                path: "add",
                element: <AddProduct />,
              },
              {
                path: "edit",
                element: <EditProducts />,
              },
            ],
          },
          {
            path: "custom-product",
            children: [
              {
                path: "",
                element: <CustomProduct />,
              },
              {
                path: "add-flavor",
                element: <AddCustomFlavor />,
              },
              {
                path: "edit-flavor",
                element: <EditCustomProduct />,
              },
            ],
          },

          {
            path: "reviews",
            children: [
              {
                path: "",
                element: <AllReviews />,
              },
              {
                path: "edit",
                element: <EditReviews />,
              },
            ],
          },
          {
            path: "order",
            children: [
              {
                path: "",
                element: <AllOrders />,
              },
              {
                path: "edit",
                element: <EditOrders />,
              },
            ],
          },
          {
            path: "custom-order",
            children: [
              {
                path: "",
                element: <AllCustomOrder />,
              },
              {
                path: "edit",
                element: <EditCustomOrder />,
              },
            ],
          },
          {
            path: "categories",
            children: [
              {
                path: "",
                element: <Categories />,
              },
              {
                path: "add-category",
                element: <AddCategories />,
              },
              {
                path: "edit-category",
                element: <EditCategory />,
              },
            ],
          },
          {
            path: "promo",
            children: [
              {
                path: "",
                element: <PromoComponent />,
              },
              {
                path: "add-promo",
                element: <AddPromo />,
              },
              {
                path: "edit-promo",
                element: <EditPromo />,
              },
            ],
          },
          {
            path: "members",
            children: [
              {
                path: "",
                element: <AllMember />,
              },
              {
                path: "edit",
                element: <EditMember />,
              },
            ],
          },
        ],
      },

      {
        path: "management",
        children: [
          {
            path: "blogs",
            children: [
              {
                path: "",
                element: <BlogsComponent />,
              },
              {
                path: "add",
                element: <AddBlogs />,
              },
              {
                path: "edit",
                element: <EditBlogs />,
              },
            ],
          },
          {
            path: "recipes",
            children: [
              {
                path: "",
                element: <AllRecipes />,
              },
              {
                path: "add",
                element: <AddRecipes />,
              },
              {
                path: "edit",
                element: <EditRecipes />,
              },
            ],
          },
          {
            path: "ticker",
            children: [
              {
                path: "",
                element: <TickerComponent />,
              },
              {
                path: "add",
                element: <AddTicker />,
              },
              {
                path: "edit",
                element: <EditTicker />,
              },
            ],
          },
        ],
      },
      {
        path: "",
        element: <Indexdashboard />,
      },

      {
        path: "profile",
        children: [
          {
            path: "details",
            element: <ProfileDetails />,
          },
          {
            path: "update",
            element: <ProfileUpdate />,
          },
          {
            path: "password",
            element: <ProfilePassword />,
          },
        ],
      },

      {
        path: "newsletter",
        element: <Newsletter />,
      },
    ],
  },
]);

export { router };
