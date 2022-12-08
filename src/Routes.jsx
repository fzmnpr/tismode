import 'react-toastify/dist/ReactToastify.css'

import { Route, Routes } from 'react-router-dom'
import Cart from 'components/Cart'
import Categories from 'containers/Categories'
import CategoryPage from 'containers/CategoryPage'
import Home from 'containers/Home'
import Login from 'components/forms/Login'
import ProductPage from 'containers/ProductPage'
import UserProfile from 'containers/UserProfile'
import CheckoutPage from 'containers/CheckoutPage'
import SearchResultsPage from 'components/SearchResults/SearchResultsPage'
import DisCountedProducts from 'components/DiscountedProducts'
import ContactUs from 'containers/ContactUs'
import Layout from 'Layout'
import Addresses from 'containers/Addresses'
import { PrivateRoute } from 'components/PrivateRoute'
import NotFound from 'containers/NotFound'
import Products from 'containers/Products'
import Orders from './containers/Orders'

export const ROUTE_PATHS = {
  home: '/',
  product: '/product/:productId',
  cart: '/cart',
  login: '/login',
  shop: '/shop',
  checkout: '/checkout',
  discounted: '/discounted',
  profile: '/profile',
  search: '/search',
  category: '/category-list/:categoryId',
  categories: '/category-list',
  contactUs: '/contact-us',
  addresses: '/addresses',
  productCategory: '/products/:productCategoryId/:productCategoryName',
  products: '/products',
  addAddress: '/addresses/add',
  orders: '/orders/:userId/:status',
}
export const navigateTo = {
  categoryDetails: (categoryId) => `${ROUTE_PATHS.category}`.replace(':categoryId', categoryId),
  productDetails: (productId) => `${ROUTE_PATHS.product}`.replace(':productId', productId),
  orders: (userId, status) => `${ROUTE_PATHS.orders}`.replace(':userId', userId).replace(':status', status),
  ProductCategory: (categoryId, categoryName) =>
    `${ROUTE_PATHS.productCategory}`
      .replace(':productCategoryId', categoryId)
      .replace(':productCategoryName', categoryName),
}

function AppRoutes({ size }) {
  return (
    <>
      <Layout size={size}>
        <Routes>
          <Route path={ROUTE_PATHS.home} element={<Home size={size} />} />
          <Route path={ROUTE_PATHS.product} element={<ProductPage size={size} />} />
          <Route path={ROUTE_PATHS.cart} element={<Cart />} />
          <Route path={ROUTE_PATHS.login} element={<Login />} />
          <Route path={ROUTE_PATHS.shop} element={<Categories />} />
          <Route
            path={ROUTE_PATHS.checkout}
            element={
              <PrivateRoute>
                <CheckoutPage />
              </PrivateRoute>
            }
          />
          <Route path={ROUTE_PATHS.discounted} element={<DisCountedProducts />} />
          {/* <Route path={ROUTE_PATHS.contactUs} element={<ContactUs />} /> */}
          <Route
            path={ROUTE_PATHS.profile}
            element={
              <PrivateRoute>
                <UserProfile />
              </PrivateRoute>
            }
          />
          <Route
            path={ROUTE_PATHS.orders}
            element={
              <PrivateRoute>
                <Orders />
              </PrivateRoute>
            }
          />
          <Route path={ROUTE_PATHS.login} element={<Login />} />
          <Route path={ROUTE_PATHS.category} element={<CategoryPage />} />
          <Route path={ROUTE_PATHS.categories} element={<CategoryPage />} />
          <Route exact path={ROUTE_PATHS.search} element={<SearchResultsPage />} />
          <Route exact path={ROUTE_PATHS.productCategory} element={<Products />} />
          <Route exact path={ROUTE_PATHS.products} element={<Products />} />
          <Route
            path={ROUTE_PATHS.addresses}
            element={
              <PrivateRoute>
                <Addresses />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </>
  )
}

export default AppRoutes
