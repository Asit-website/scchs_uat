import FetchPost from "../../../../utils/request/post";

export default async function handler(req, res) {
  const defaultMessage = { status: false,message: 'Unauthorized.'}
  if(req.method === "POST"){
    if(req.body.customer_id > 0){
      try {
        const createAddress = await FetchPost(`v3/customers/addresses`, JSON.stringify([req.body]))
        const resAddress = await createAddress.json();
        res.status(200).json(resAddress)
      } catch (error) {
        res.status(200).json(defaultMessage)    
      }
    }else{
      res.status(200).json(defaultMessage)  
    }
  }else{
    res.status(200).json(defaultMessage)  
  }
}
  