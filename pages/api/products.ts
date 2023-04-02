import { initMongoose } from '@/lib/mongoose';
import Product from '@/models/Product';
import { NextApiRequest, NextApiResponse } from 'next';


export async function findAllProducts(){
    return Product.find().exec()
}

export default async function handle(req: NextApiRequest, res: NextApiResponse){
    await initMongoose()
    const {ids}= req.query
    if(ids){
        const idsArray = Array.isArray(ids) ? ids : ids.split(",") //id array method to add unique id items to an array and find it then return
        res.json(await Product.find({'_id':{$in:idsArray}}).exec()) //$in: meaning find _id in the array
    }else{res.json( await findAllProducts())}
    

}