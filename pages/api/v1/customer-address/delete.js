import FetchDelete from "../../../../utils/request/delete";

export default async function handler(req, res) {

  const defaultMessage = { status: false,message: 'Unauthorized.'}
  
  if(req.method === "POST"){
    if(req.body.id != ""){
        const id = req.body.id;
        try {
          const deleteData = await FetchDelete('v3/customers/addresses?id:in='+id)
          const resDelete = await deleteData.json();
          console.log('resDelete')
          console.log(resDelete)
          res.status(200).json(resDelete);
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
  