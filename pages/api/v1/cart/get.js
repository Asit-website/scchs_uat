import FetchGet from "../../../../utils/request/get";

export default async function handler(req, res) {

  const defaultMessage = { status: false,message: 'Unauthorized.'}
  
  if(req.method === "POST"){
    if(req.body.cart_id != ""){
        const getCart = await FetchGet('v3/carts/'+req.body.cart_id+"?include=redirect_urls,line_items.physical_items.options,lineItems.digital_items.options")
        const resCart = await getCart.json();
        console.log('resCart')
        console.log(resCart)
        res.status(200).json(resCart)
        //res.status(200).json({ name: 'John Doe' })
    }else{
      res.status(200).json(defaultMessage)  
    }
  }else{
    res.status(200).json(defaultMessage)  
  }
  
}
  