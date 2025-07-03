import FetchDelete from "../../../../utils/request/delete";

export default async function handler(req, res) {

  const defaultMessage = { status: false,message: 'Unauthorized.'}
  
  if(req.method === "POST"){
    if(req.body.cart_id != ""){
        const cart_id = req.body.cart_id;
        const item_id = req.body.item_id;
        const total_item = req.body.total_item;
        if(total_item === 1){
          await FetchDelete('v3/carts/'+cart_id)
          res.status(200).json({status:404});
        }else{
          const deleteCartItems = await FetchDelete('v3/carts/'+cart_id+"/items/"+item_id)
          const resCart = await deleteCartItems.json();
          res.status(200).json(resCart);
        }
    }else{
      res.status(200).json(defaultMessage)  
    }
  }else{
    res.status(200).json(defaultMessage)  
  }
  
  
}
  