import FetchGet from "../../../../utils/request/get";

export default async function handler(req, res) {

  const defaultMessage = { status: false,message: 'Unauthorized.'}
  if(req.method === "GET"){
    const getCountries = await FetchGet('v2/countries?limit=250')
    const resCountries = await getCountries.json();
    res.status(200).json(resCountries)
  }else{
    res.status(200).json(defaultMessage)  
  }
}
  