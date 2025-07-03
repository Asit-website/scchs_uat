import FetchPut from "../../../../utils/request/put";

export default async function handler(req, res) {
  const defaultMessage = { status: false,message: 'Unauthorized.'}
  if(req.method === "POST"){
    if(req.body.id > 0){
      try {
        const createAddress = await FetchPut(`v3/customers/addresses`, JSON.stringify([req.body]))
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
  