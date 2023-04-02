import { initMongoose } from "@/lib/mongoose";
import Product from "@/models/Product";

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
     await initMongoose()
 
   
      // Create Checkout Sessions from body params.
      const productsIds = req.body.products.split(',')
      const uniqueIds = [...new Set(productsIds)]
      const products = await Product.find({_id: {$in:uniqueIds}}).exec()
      

      let line_items = []
      for(let productId of uniqueIds) {
        const quantity = productsIds.filter(id => id === productId).length
        const product = products.find(product => product._id.toString() === productId)
        line_items.push({
          quantity,
          price_data:{
          currency: 'CAD',
          product_data: {name: product.name},
          unit_amount: product.price * 100,
        }})
      }

      
      const session = await stripe.checkout.sessions.create({
        line_items: line_items,
        mode: 'payment',
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      });
      res.redirect(303, session.url);

      res.json(req.method)
 
  }