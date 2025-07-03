import FetchGet from "../../../../utils/request/get";

export default async function handler(req, res) {

  const defaultMessage = { status: false,message: 'Unauthorized.'}
  
  if(req.method === "POST"){
    const customer_id = req.body.customer_id;
    const address_id = req.body.address_id;
    let address_str = "";
    if(typeof address_id != "undefined" && address_id > 0){
      address_str ="&id:in="+address_id;
    }

    if(customer_id > 0){
        const getData = await FetchGet(`v3/customers/addresses?customer_id:in=${customer_id}${address_str}&limit=250`)
        const resData = await getData.json();
        res.status(200).json(resData)
    }else{
      res.status(200).json(defaultMessage)  
    }
  }else{
    res.status(200).json(defaultMessage)  
  }
  
}
  