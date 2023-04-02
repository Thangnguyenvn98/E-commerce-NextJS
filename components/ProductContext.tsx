import React, { ReactNode, createContext } from "react";
import useLocalStorageState from "use-local-storage-state";

interface ProductContextProps {
  children: ReactNode;
}


export const ProductContext = createContext({});

export function ProductContextProvider({ children }:ProductContextProps) {
  const [selectedProduct, setSelectedProduct] = useLocalStorageState('cart',{defaultValue:[]});
  //localStorageState is installed and import, provide the key, it value the format is {defaultValue: }
  return (
    <ProductContext.Provider value={{ selectedProduct, setSelectedProduct }}>
      {children}
    </ProductContext.Provider>
  );
}
