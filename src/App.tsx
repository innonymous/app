import { RouterProvider } from 'react-router-dom';
import { initialState as authInitialState, setTokens } from './pages/login/authSlice';
import useReduxLocalStorage from './store/hooks';
import { RootState } from './store/store';
import { authRoutes, noAuthRoutes } from './router';
import './index.css';

const App = () => {
  const auth = useReduxLocalStorage(
    (state: RootState) => state.auth,
    setTokens,
    'auth',
    authInitialState,
  );

  const noAuth = auth.token === '';

  return <RouterProvider router={noAuth ? noAuthRoutes : authRoutes} />;
};

export default App;
