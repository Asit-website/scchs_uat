import { get_token } from "../../config";

export default async function handler(req, res) {

  const per_page_recode = 9;
  const { route, sort, page } = req.body;

  let page_after = "";
  if(typeof page != "undefined"){
    page_after = `, after:"${page}"`;
  }


    try {

      //sortBy
      ////A_TO_Z
      ////BEST_REVIEWED
      ////BEST_SELLING
      ////DEFAULT
      ////FEATURED
      ////HIGHEST_PRICE
      ////BEST_REVIEWED
      ////LOWEST_PRICE
      ////NEWEST
      ////Z_TO_A
      
      //get token
      const store_token = await get_token();

      const get_query = `query LookUpUrl {
        site {
          route(path: "/${route}/") {
            node {
              ... on Category {
                name
                description
                defaultImage{ urlOriginal }
                seo{
                  pageTitle
                  metaDescription
                }
                products(sortBy:${sort.toUpperCase()}, first:${per_page_recode} ${page_after}){
                  collectionInfo{ totalItems }
                  pageInfo{
                    hasNextPage
                    hasPreviousPage
                    startCursor
                    endCursor
                  }
                  edges{
                    node{
                      entityId
                      sku
                      path
                      name
                      availabilityV2{
                        status
                        description
                      }
                      prices{
                        priceRange{ min { currencyCode value } max { currencyCode value } }
                        basePrice{ currencyCode value }
                        salePrice{ currencyCode value }
                      }
                      defaultImage{
                       url(width:300, height:300)
                        altText
                        isDefault 
                      }
                    }
                  }
                }
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
        res.status(200).json(getData);
      
    } catch (error) {
      res.status(404).json(error)  
    }
  
}
  