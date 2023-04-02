import Footer from "@/components/Footer";
import { ProductContext } from "@/components/ProductContext";
import { useContext, useEffect, useState } from "react";
import { ProductType } from "@/type/ProductType";
import Image from "next/image";

export default function CheckoutPage(){
    const {selectedProduct, setSelectedProduct} = useContext(ProductContext)
    const[productsInfo,setProductsInfo]=useState<ProductType[]>([])

    const addMoreProduct = (id:string) => {
        setSelectedProduct(prev => [...prev,id])
    }

    const reduceLessProduct = (id:string) =>{
        const currentIndex = selectedProduct.indexOf(id)
    }

    useEffect(()=>{
        const uniqueIds = [...new Set(selectedProduct)]
        fetch('/api/products?ids='+uniqueIds.join(','))
        .then(response => response.json())
        .then(json => setProductsInfo(json))
    },[selectedProduct])
    return(
        <div className = "p-4">

            {!productsInfo.length && (
                <div>No product in your cart  </div>
            )}
            {productsInfo.length && productsInfo.map(product=>
                     <div key={product._id} className="flex gap-4 mb-5">
                     <div className="bg-gray-200 p-4 rounded-xl shrink-0">
                         <Image src={product.picture} alt={product.name as string} width={200} height={500} />
                     </div>
                     <div className='pl-4'>
                         <p className="text-lg font-bold">{product.name}</p>
                         <p className="text-sm leading-4 overflow-hidden">{product.description} </p>
                         <div className ="flex gap-3">
                            <div className="grow">${product.price}</div>
                            <div>
                                <button className="rounded-xl py-2 px-4 bg-red-400 text-white">-</button>
                                <span className="px-2">{selectedProduct.filter(id => id === product._id).length}</span>
                                
                                <button onClick={()=>addMoreProduct(product._id)}className="rounded-xl py-2 px-4 bg-emerald-400 text-white">+</button>
                            </div>
                         </div>
                     </div>
                 </div>
               
                )}
            <Footer/>
        </div>
    )
}