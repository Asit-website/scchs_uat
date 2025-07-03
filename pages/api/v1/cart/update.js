import FetchPut from "../../../../utils/request/put";

export default async function handler(req, res) {

  const defaultMessage = { status: false,message: 'Unauthorized.'}
  
  if(req.method === "POST"){
    if(req.body.cart_id != ""){
        const cart_id = req.body.cart_id;
        const item_id = req.body.item_id;
        const product_id = req.body.product_id;
        const quantity = req.body.quantity;
        
        const cartData = {
          "line_item": {
            "quantity": quantity,
            "product_id": product_id
          }
        }
        const createCart = await FetchPut('v3/carts/'+cart_id+'/items/'+item_id, JSON.stringify(cartData))
        const resCart = await createCart.json();
        res.status(200).json(resCart)
    }else{
      res.status(200).json(defaultMessage)  
    }
  }else{
    res.status(200).json(defaultMessage)  
  }
}
  