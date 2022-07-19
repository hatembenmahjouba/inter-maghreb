import React, { lazy, Suspense } from 'react';

import { Switch, Route, useLocation } from 'react-router-dom';

import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Spiner from './components/Spiner';

import AdminRoute from './routes/AdminRoute';
import UserRoute from './routes/UserRoute';

import CategoryAdminPage from './pages/AdminPages/Category/CategoryPage';
import CategoryUpdatePage from './pages/AdminPages/Category/CategoryUpdatePage';
import AdminSubCategoryPage from './pages/AdminPages/SubCategory/SubCategoryPage';
import SubCategoryUpdatePage from './pages/AdminPages/SubCategory/SubCategoryUpdatePage';
import UserEditPage from './pages/AdminPages/User/UserEditPage';

import ForgotPasswordPage from './pages/Authentification/ForgotPasswordPage';
import LoginPage from './pages/Authentification/LoginPage';
import RegisterPage from './pages/Authentification/RegisterPage';
import ResetPasswordPage from './pages/Authentification/ResetPasswordPage';

import OrdersMyPage from './pages/ProfilePages/OrdersMyPage';
import ReviewsMyPage from './pages/ProfilePages/ReviewsMyPage';
import UpdatePasswordPage from './pages/ProfilePages/UpdatePasswordPage';
import UpdateProfilePage from './pages/ProfilePages/UpdateProfilePage';
import UpdateReviewMyPage from './pages/ProfilePages/UpdateReviewMyPage';
import WishlistPage from './pages/ProfilePages/WishlistPage';

import PlaceOrderPage from './pages/PlaceOrderPage';
import ShippingPage from './pages/ShippingPage';
import ProductImage from './components/Products/ProductImage';

import './assets/scss/main.scss';
import ErrorBoundary from './components/ErrorBoundary';
import NotFoundPage from './pages/NotFoundPage';

const CreateProductPage = lazy(() =>
  import('./pages/AdminPages/Product/CreateProductPage')
);
const ProductUpdatePage = lazy(() =>
  import('./pages/AdminPages/Product/ProductUpdatePage')
);
const UserListPage = lazy(() => import('./pages/AdminPages/User/UserListPage'));
const OrderListPage = lazy(() => import('./pages/AdminPages/OrderListPage'));
const ReviewsListPage = lazy(() =>
  import('./pages/AdminPages/ReviewsListPage')
);
const CategoryPage = lazy(() => import('./pages/CategoryPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const HomePage = lazy(() => import('./pages/HomePage'));
const OrderPage = lazy(() => import('./pages/OrderPage'));
const ProductPage = lazy(() => import('./pages/ProductPage'));
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const ProductsListPage = lazy(() =>
  import('./pages/AdminPages/Product/ProductListPage')
);
const SubCategoryPage = lazy(() => import('./pages/SubCategoryPage'));

const App = () => {
  const location = useLocation();
  const background = location.state && location.state.background;
  return (
    <div className='container'>
      <Header />
      <ErrorBoundary>
        <Suspense
          fallback={
            <section className='section-content flex flex-ai-c flex-dc'>
              <Spiner isLoading={true} />
            </section>
          }
        >
          <Switch location={background || location}>
            <Route path='/register'>
              <RegisterPage />
            </Route>
            <Route path='/login'>
              <LoginPage />
            </Route>
            <Route path='/forgotpassword'>
              <ForgotPasswordPage />
            </Route>
            <Route path='/resetpassword/:token'>
              <ResetPasswordPage />
            </Route>
            <Route exact path='/'>
              <HomePage />
            </Route>
            <Route exact path='/products'>
              <ProductsPage />
            </Route>
            <Route exact path='/products/:slug'>
              <ProductPage />
            </Route>
            <Route exact path='/categories/:slug'>
              <CategoryPage />
            </Route>
            <Route exact path='/categories/:slugCat/subs/:slugSub'>
              <SubCategoryPage />
            </Route>
            <Route path='/cart/:slug?'>
              <CheckoutPage />
            </Route>
            <UserRoute path='/updateprofile'>
              <UpdateProfilePage />
            </UserRoute>
            <UserRoute path='/updatepassword'>
              <UpdatePasswordPage />
            </UserRoute>
            <UserRoute path='/shipping'>
              <ShippingPage />
            </UserRoute>
            <UserRoute path='/orderplace'>
              <PlaceOrderPage />
            </UserRoute>
            <UserRoute path='/order/:id'>
              <OrderPage />
            </UserRoute>
            <UserRoute path='/myorders'>
              <OrdersMyPage />
            </UserRoute>
            <UserRoute exact path='/myreviews'>
              <ReviewsMyPage />
            </UserRoute>
            <UserRoute path='/myreviews/:id'>
              <UpdateReviewMyPage />
            </UserRoute>
            <UserRoute path='/wishlist'>
              <WishlistPage />
            </UserRoute>
            <AdminRoute exact path='/admin/users'>
              <UserListPage />
            </AdminRoute>
            <AdminRoute path='/admin/users/:id'>
              <UserEditPage />
            </AdminRoute>
            <AdminRoute exact path='/admin/categories'>
              <CategoryAdminPage />
            </AdminRoute>
            <AdminRoute exact path='/admin/categories/:slug'>
              <CategoryUpdatePage />
            </AdminRoute>
            <AdminRoute exact path='/admin/subcategories'>
              <AdminSubCategoryPage />
            </AdminRoute>
            <AdminRoute exact path='/admin/subcategories/:slug'>
              <SubCategoryUpdatePage />
            </AdminRoute>
            <AdminRoute exact path='/admin/products/create'>
              <CreateProductPage />
            </AdminRoute>
            <AdminRoute exact path='/admin/products'>
              <ProductsListPage />
            </AdminRoute>
            <AdminRoute exact path='/admin/products/:slug'>
              <ProductUpdatePage />
            </AdminRoute>
            <AdminRoute exact path='/admin/orders'>
              <OrderListPage />
            </AdminRoute>
            <AdminRoute exact path='/admin/reviews'>
              <ReviewsListPage />
            </AdminRoute>
            <Route path='*'>
              <NotFoundPage />
            </Route>
          </Switch>
          {background && (
            <Route path={`/products/img/:slug`}>
              <ProductImage />
            </Route>
          )}
        </Suspense>
      </ErrorBoundary>
      <Footer />
    </div>
  );
};

export default App;
