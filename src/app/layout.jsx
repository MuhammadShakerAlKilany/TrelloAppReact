
import "./globals.css";
import Navbar from "../componant/Navbar/Navbar";
import Footer from "../componant/Footer/page";
import TokenContextProvider from '../context/tokenContext';
import UserContextProvider from "../context/userContext";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import store from "../Store/store";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Outlet } from "react-router-dom";



const queryClient = new QueryClient();

export default function Layout({ children }) {

  return (
      <main>
        <TokenContextProvider>
          <UserContextProvider>
            <Navbar/>
            <Provider store={store}>
              <QueryClientProvider client={queryClient}>
                <GoogleOAuthProvider clientId="880761381934-16eu08t3on4omt7mhtpspnds25quusdj.apps.googleusercontent.com" >
                  <main className="min-vh-100"><Outlet /></main>
                </GoogleOAuthProvider  >
              </QueryClientProvider>
              </Provider>
            <Footer />
          </UserContextProvider>
        </TokenContextProvider></main>
    
  );
}
