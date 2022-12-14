import 'react-toastify/dist/ReactToastify.css'

import { Route, Routes } from 'react-router-dom'
import Categories from 'containers/Categories'
import CategoryPage from 'containers/CategoryPage'
import Home from 'containers/Home'
import Login from 'components/shared/forms/Login'
import ProductPage from 'containers/ProductPage'
import UserProfile from 'containers/UserProfile'
import CheckoutPage from 'containers/CheckoutPage'
import SearchResultsPage from 'components/shared/SearchResults/SearchResultsPage'
import Layout from 'Layout'
import Addresses from 'containers/Addresses'
import { PrivateRoute } from 'components/shared/PrivateRoute'
import NotFound from 'containers/NotFound'
import Products from 'containers/Products'
import Orders from './containers/Orders'
import { Suspense } from 'react'
import AnimatedLoading from 'components/UI/AnimatedLoading'
import ProductListByHash from 'containers/ProductListByHash'
import ContactUs from 'containers/ContactUs'
import { handlizeName } from 'utils/handlizeName'
import Cart from 'components/shared/Cart'

export const ROUTE_PATHS = {
  home: '/',
  product: '/product/:productId/:productHandle',
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
  hashProductList: '/products/:hash',
  addAddress: '/addresses/add',
  orders: '/orders/:userId/:status',
}
export const navigateTo = {
  categoryDetails: (categoryId) => `${ROUTE_PATHS.category}`.replace(':categoryId', categoryId),
  productDetails: (productId, productHandle) =>
    `${ROUTE_PATHS.product}`.replace(':productId', productId).replace(':productHandle', handlizeName(productHandle)),
  orders: (userId, status) => `${ROUTE_PATHS.orders}`.replace(':userId', userId).replace(':status', status),
  ProductCategory: (categoryId, categoryName) =>
    `${ROUTE_PATHS.productCategory}`
      .replace(':productCategoryId', categoryId)
      .replace(':productCategoryName', handlizeName(categoryName)),
  ProductListByHashtag: (hashtag) => `${ROUTE_PATHS.hashProductList}`.replace(':hash', hashtag),
}

function AppRoutes({ size }) {
  return (
    <>
      <Layout size={size}>
        <Suspense fallback={() => <AnimatedLoading />}>
          <Routes>
            <Route path={ROUTE_PATHS.home} element={<Home />} />
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
            <Route path={ROUTE_PATHS.hashProductList} element={<ProductListByHash />} />
            <Route path={ROUTE_PATHS.contactUs} element={<ContactUs />} />
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
        </Suspense>
      </Layout>
    </>
  )
}

export default AppRoutes
