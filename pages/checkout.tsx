import Footer from "@/components/Footer";
import { ProductContext } from "@/components/ProductContext";
import { useContext, useEffect, useState } from "react";
import { ProductType } from "@/type/ProductType";
import Image from "next/image";

export default function CheckoutPage(){
    const {selectedProduct, setSelectedProduct} = useContext(ProductContext)
    const[productsInfo,setProductsInfo]=useState<ProductType[]>([])
    const[name,setName]=useState('')
    const[province,setProvince]=useState('')
    const[address,setAddress]=useState('')
    const[phone,setPhone]=useState('')
    const[country,setCountry]=useState('')


    const addMoreProduct = (id:string) => {
        setSelectedProduct(prev => [...prev,id])
    }

    const reduceLessProduct = (id:string) =>{
        const currentIndex = selectedProduct.indexOf(id)
        if(currentIndex!== -1){
            setSelectedProduct(prev => {
                return prev.filter((value,index)=> index !== currentIndex
                )
            })
        }
    }
    let delivery = 5
    let subtotal = 0
    if(selectedProduct?.length){
        for(let id of selectedProduct){
            const itemPrice = productsInfo.find(product => product._id === id)?.price ?? "0"
            subtotal += parseInt(itemPrice)
        }
    }

    const total = subtotal + delivery

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
            {productsInfo.length && productsInfo.map(product=>{
                const amount = selectedProduct.filter(id => id === product._id).length
                if(amount === 0)return
                return(
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
                                <button onClick={()=>reduceLessProduct(product._id)} className="rounded-xl py-2 px-4 bg-red-400 text-white">-</button>
                                <span className="px-2">{selectedProduct.filter(id => id === product._id).length}</span>
                                
                                <button onClick={()=>addMoreProduct(product._id)}className="rounded-xl py-2 px-4 bg-emerald-400 text-white">+</button>
                            </div>
                         </div>
                     </div>
                 </div>
               
            )})}
                <form action="/api/checkout_sessions" method="POST">

                <div className ="flex flex-col gap-2 mb-6">
                <input value={name}type="text" name="name"placeholder ="Name" onChange={(e)=>setName(e.target.value)} className="bg-gray-200 w-full rounded-lg p-3 font-bold" />

                    <input value={address} type="text" name="address" onChange={(e)=>setAddress(e.target.value)} placeholder="Address" className="bg-gray-200 w-full rounded-lg p-3 " />
                    <input type="text" value={province} name="province" onChange={(e)=>setProvince(e.target.value)} placeholder="City, Province, Postal Code" className="bg-gray-200 w-full rounded-lg p-3 " />
                    <input type="text" value={country} name="country" placeholder ="Country " onChange={(e)=>setCountry(e.target.value)} className="bg-gray-200 w-full rounded-lg p-3"/>

                    <input type="text" value={phone} name="phone"placeholder="Phone Number"  onChange={(e)=>setPhone(e.target.value)}className="bg-gray-200 w-full rounded-lg p-3 " />


                </div>
                <div className="flex flex-col border-solid border-2 p-2 border-gray-500 gap-2">
                    <div>
                        <h3 className="font-bold text-2xl">Order Summary</h3>
                    </div>
                    <div className='flex'>
                    <h3 className="grow">Items:</h3>
                    <h3 className="font-bold">${subtotal}</h3>
                    </div>
                    <div className='flex'>
                    <h3 className="grow">Shipping & Handling</h3>
                    <h3 className="font-bold">${delivery}</h3>
                    </div>
                    <hr className="max-h-px my-4 border-gray-700 "/>
                    <div className='flex'>
                    <h3 className="grow text-2xl text-red-600 font-bold">Order Total</h3>
                    <h3 className="text-2xl text-red-600 font-bold">${total}</h3>
                    </div>
                  
                </div>
                <input type="hidden" name="products" value={selectedProduct.join(',')} />
                <button className="bg-emerald-500 text-white w-full p-4 font-bold rounded-lg my-6 shadow-lg shadow-emerald-200" type="submit">Pay ${total}</button>
                </form>
               
            <Footer/>
        </div>
    )
}