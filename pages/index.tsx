import { useEffect, useState } from 'react';
import Product from '@/components/Product';
import { initMongoose } from '@/lib/mongoose';
import { findAllProducts } from './api/products';

type Product = {
  _id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  picture: string;
}; 

export default function Home({ products }: { products: Product[] }) {
  const [searchName, setSearchName] = useState("");


  const categoriesNames = [...new Set(products.map(product => product.category))];

  if (searchName) {
    products = products.filter(product => product.name.toLowerCase().includes(searchName));
  }

  return (
    <div className=" p-5">
      <input
        type="text"
        placeholder="Search for products ...."
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
        className="bg-slate-300 w-full p-4 rounded-lg"
      />
      <div>
        {categoriesNames.map(category => (
          <div key={category}>
            {products.find(p => p.category === category) && (
              <div>
                <h2 className="text-2xl font-bold capitalize py-4">{category}</h2>
                <div className="flex gap-4 justify-between">
                  {products.filter(p => p.category === category).map(product =>
                    <div key={product._id}>
                      <Product {...product} />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  await initMongoose();
  const products = await findAllProducts();
  return {
    props: {
      products: JSON.parse(JSON.stringify(products))
    }
  };
}
