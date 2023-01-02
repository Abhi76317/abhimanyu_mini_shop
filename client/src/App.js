import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { useSelector } from 'react-redux';
import Login from './pages/Login';
import ViewCart from './pages/ViewCart';
import Register from './pages/Register';
import ProductContainer from './pages/ProductContainer';
import Navbar from './component/Navbar';
import AddProduct from './pages/AddProduct';
import Container from './component/Container';
import CartView from './pages/CartView';
import CheckoutSuccess from './pages/CheckoutSuccess';
import CheckOutFail from './pages/CheckOutFail';
import Notistack from './component/Notistack';

function App() {
  const localUser = useSelector((state) => state.localUserState.user);

  const ProtectedRoute = (props) => {
    if (!localUser) {
      return <Navigate to="/" replace />;
    }
    return <Outlet />;
  };

  const PublicRoute = () => {
    if (localUser) {
      return <Navigate to="/product" replace />;
    }
    return <Outlet />;
  };

  return (
    <>
      <div className="App">
        <SnackbarProvider maxSnack={5}>
          <BrowserRouter>
            {
              localUser && <Navbar />
            }
            <Routes>
              <Route element={<PublicRoute />}>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Route>
              <Route element={<ProtectedRoute />}>
                <Route path="/product" element={<Container><ProductContainer /></Container>} />
                <Route path="/viewcart" element={<Container><ViewCart /></Container>} />
                <Route path="/add/product" element={<Container><AddProduct /></Container>} />
                <Route path='/cart' element={<Container><CartView /></Container>} />
                <Route path='/check-out-success' element={<Container><CheckoutSuccess /></Container>} />
                <Route path='/check-out-fail' element={<Container><CheckOutFail /></Container>} />
              </Route>
            </Routes>
            <Notistack />
          </BrowserRouter>
        </SnackbarProvider>
      </div>
    </>
  );
}

export default App;
