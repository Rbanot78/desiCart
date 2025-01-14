import { CompareProvider } from "@/context/CompareContext";
import { AppProvider } from "../context/AppContext";
import { SearchProvider } from "../context/SearchContext";
import "../styles/globals.css";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }) {
  return (
    <>
    
    <AppProvider>
      <CompareProvider>
        <SearchProvider>
        <Toaster />
        
          <Component {...pageProps} />
        </SearchProvider>
      </CompareProvider>
    </AppProvider>
    
    
    </>
  );
}

export default MyApp;
