import Image from "next/image"
import { useContext } from "react"
import { ProductContext } from "./ProductContext"
import { ProductType } from "@/type/ProductType"


export default function Product({_id,name,price,description,picture}:ProductType ){

    const {setSelectedProduct} = useContext(ProductContext)
    function addProduct(){
      setSelectedProduct(prev => [...prev,_id])
    }
    return (

        <div className = "py-8">
        <div className="w-64">
          <div className="bg-blue-100 p-5 rounded-xl ">
          <Image
      
      src={picture}
      alt={name}
      width={500}
      height={500}
                  />  
          </div>
          <div className='mt-2'>
            <h3 className="font-bold text-lg ">{name}</h3>
          </div>
          <p className="text-sm mt-2 leading-4">{description}</p>
            
            <div className="flex mt-2">
              <div className="text-2xl font-bold grow">${price}</div>
              <button onClick={addProduct}className="bg-emerald-400 rounded-md text-white py-1 px-3">Add to Cart</button>
            </div>
            </div>
            </div>

    )
}