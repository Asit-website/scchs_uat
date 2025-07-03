import FetchGet from "../../../../utils/request/get";

export default async function handler(req, res) {

  const defaultMessage = { status: false,message: 'Unauthorized.'}
  
  if(req.method === "POST"){
    if(req.body.id != ""){
        const getData = await FetchGet('v2/orders?limit=250&customer_id='+req.body.id+'&sort=id:desc')
        const resData = await getData.json();
        res.status(200).json(resData)
    }else{
      res.status(200).json(defaultMessage)  
    }
  }else{
    res.status(200).json(defaultMessage)  
  }
  
}
  