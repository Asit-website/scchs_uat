import FetchPost from "../../../../utils/request/post";

export default async function handler(req, res) {

  const defaultMessage = { status: false,message: 'Unauthorized.'}
  
  if(req.method === "POST"){


    if(req.body.length > 0){

      
      const customer_id = req.body[0].customer_id;
      const nx_cart_id = req.body[0].nx_cart_id;
      let channel_id = req.body[0].channel_id;
      const products = req.body[1].products;

      if(typeof channel_id == "undefined" && channel_id == null){
        channel_id = 1;
      }

      if(products.length > 0){

        const line_items = [];
        products.map(ls=>{
          if(typeof ls.option != "undefined"){
            line_items.push({
              "quantity": ls.quantity,
              "product_id": ls.product_id,
              "option_selections": JSON.parse(ls.option)
              //"list_price": 5
            })
          }else{
            line_items.push({
              "quantity": ls.quantity,
              "product_id": ls.product_id
            })
          }
        });
        

        if(nx_cart_id === 0){

          //Create a Cart
          const cartData = {
            "channel_id": channel_id,
            "customer_id": customer_id,
            "line_items": line_items
          }
          const createCart = await FetchPost('v3/carts', JSON.stringify(cartData))
          const resCart = await createCart.json();

          res.status(200).json(resCart)

        }else{

          //Add Cart Line Items
          const updateCartData = {
            "line_items": line_items
          }
          const createCart = await FetchPost(`v3/carts/${nx_cart_id}/items`, JSON.stringify(updateCartData))
          const resCart = await createCart.json();
          res.status(200).json(resCart)
          
        }
        

      }else{
        res.status(200).json(defaultMessage)    
      }
      
    }else{
      res.status(200).json(defaultMessage)  
    }
  }else{
    res.status(200).json(defaultMessage)  
  }
  
}
  