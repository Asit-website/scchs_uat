const jwt = require('jsonwebtoken');
const {v4: uuidv4} = require('uuid');

export default async function handler(req, res) {  
    if(req.method === "POST" && req.body.bcType > 0){
        let return_array = { 'status':false, 'message':'Authentication failed.' };
        const customer_id = req.body.bcType;
        function getLoginUrl(customerId) {
            const dateCreated_eu = Math. round((new Date()). getTime() / 1000);
            const  payload = {
                "iss": process.env.bc.client_id,
                "iat": dateCreated_eu,
                "jti": uuidv4(),
                "operation": "customer_login",
                "store_hash": process.env.bc.store_hash,
                "customer_id": customerId,
                "redirect_to" : process.env.bc.store_url+"checkout"
            }
            let token = jwt.sign(payload, process.env.bc.client_secret, {algorithm:'HS256'});
            return `${process.env.bc.store_url}login/token/${token}`;
        };
        //Customer login jwt
        const login_url = getLoginUrl(customer_id);
        return_array = {'status':true,'verfy_url':login_url};
        res.status(200).json(return_array);
    }else{
        res.status(404).json({'status':false,'verfy_url':null})
    }
}