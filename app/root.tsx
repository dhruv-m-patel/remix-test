import { Outlet } from "@remix-run/react";

export { Layout } from './components/Layout';

export default function App() {
  return <Outlet />;
}
