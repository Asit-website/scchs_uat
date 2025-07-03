import { get_token } from "../../config";

export default async function handler(req, res) {

    try {
      
      //get token
      const store_token = await get_token();

      const get_query = `query CategoryTree3LevelsDeep {
          site {
            categoryTree {
              name
              path
              entityId
              children {
                name
                path
                entityId
                children {
                  name
                  path
                  entityId
                }
              }
            }
          }
        }`;
      
        const end_point = process.env.bc.store_url_ecommerce+'graphql';
        var options = {
            'method': 'POST',
            'headers': { 'Authorization': `Bearer ${store_token}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ query: get_query, variables: {} })
        };
        
        const getData = await fetch(end_point,options).then((response) => response.json())
        res.status(200).json(getData.data.site.categoryTree);
      
    } catch (error) {
      res.status(404).json(error)  
    }
  
}
  