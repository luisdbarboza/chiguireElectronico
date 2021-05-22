import React, { useEffect, lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import AuthContextProvider from "./context/AuthContext";
import SidebarContextProvider from "./context/SidebarContext";
import "./styles/css/style.min.css";
const Home = lazy(() => import("./pages/Home/Home"));
const Category = lazy(() => import("./pages/Category"));
const Confirmation = lazy(() => import("./pages/Confirmation"));
const PasswordChange = lazy(() => import("./pages/PasswordChange"));
const Post = lazy(() => import("./pages/Post/Post"));
const NotFound = lazy(() => import("./pages/NotFound"));


const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname])

  return null;
}

const App = () => {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <AuthContextProvider>
          <SidebarContextProvider>
            <Navbar />
            <Suspense fallback={<div>Cargando...</div>}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/posts/:id" component={Post} />
              <Route exact path="/category/:category" component={Category} />
              <Route exact path="/changePassword/:urlToken" component={PasswordChange} />
              <Route exact path="/confirmation/:urlToken" component={Confirmation} />
              <Route path="/" component={NotFound} />
            </Switch>
            </Suspense>
          </SidebarContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
