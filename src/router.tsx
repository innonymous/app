import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import NoChatSelected from './pages/chat/NoChatSelected';
import Login from './pages/login/Login';
import LoginForm from './pages/login/components/LoginForm';
import NewAccountForm from './pages/login/components/NewAccountForm';
import logIn from './actions/logIn';
import createAccount from './actions/createAccount';
import ResolveAlias from './pages/ResolveAlias';

export const authRoutes = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <NoChatSelected />,
      },
      {
        path: ':alias',
        element: <ResolveAlias />,
      },
    ],
  },
]);

export const noAuthRoutes = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
    action: logIn,
    children: [
      {
        index: true,
        element: <LoginForm newAccountUrl="/join" actionUrl=".." />,
      },
      {
        path: 'join',
        element: <NewAccountForm loginUrl="/" loginActionUrl=".." />,
        action: createAccount,
      },
      {
        path: '*',
        element: <Navigate to="/" />,
      },
    ],
  },
]);
