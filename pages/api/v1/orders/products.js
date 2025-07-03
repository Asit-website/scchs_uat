import FetchGet from "../../../../utils/request/get";

export default async function handler(req, res) {

  const defaultMessage = { status: false,message: 'Unauthorized.'}
  
  if(req.method === "POST"){
    const productObj = [];
    
    if(req.body.id != ""){
        const getData = await FetchGet('v2/orders/'+req.body.id+'/products?include=image')
        const resData = await getData.json();
        if(resData.length > 0){
          
          await Promise.all(
            resData.map(async (ls) =>{
              const getProductImage = await FetchGet('v3/catalog/products/'+ls.product_id+'/images?limit=250')
              const resImgData = await getProductImage.json();
              productObj.push({"product":ls, "image":resImgData});
            })
          );
            
        }
        res.status(200).json(productObj)
    }else{
      res.status(200).json(defaultMessage)  
    }
  }else{
    res.status(200).json(defaultMessage)  
  }
  
}
  