import FetchGet from "../../../../utils/request/get";

export default async function handler(req, res) {

  const defaultMessage = { status: false,message: 'Unauthorized.'}
  if(req.method === "POST"){
    try {
      const getData = await FetchGet('v2/countries/'+req.body.id+'/states')
      const resData = await getData.json();
      res.status(200).json(resData)
    } catch (error) {
      res.status(200).json(defaultMessage)  
    }
  }else{
    res.status(200).json(defaultMessage)  
  }
}
  