import { get_token } from "../../config";

export default async function handler(req, res) {
    const { id } = req.body;
    const finalId = id?.split(",");
    var innerQuery = "";
    finalId?.length > 0 && finalId?.map((ls,i)=>{
      innerQuery += `
        item_${i} : category(entityId: ${ls}) {
          entityId
          name
          path
          defaultImage {
            urlOriginal
          }
          description
          seo{
            pageTitle
            metaDescription
          }
          products(first:8) {
            edges {
              node {
                entityId
                name
                sku
                path
                defaultImage {
                  url(width: 300, height: 300)
                }
                prices {
                  basePrice {
                    currencyCode
                    value
                  }
                  priceRange {
                    min {
                      currencyCode
                      value
                    }
                    max {
                      currencyCode
                      value
                    }
                  }
                  salePrice {
                    currencyCode
                    value
                  }
                  retailPrice {
                    currencyCode
                    value
                  }
                  saved {
                    currencyCode
                    value
                  }
                }
              }
            }
          }
        }
      `;

    })

    try {

      //get token
      const store_token = await get_token();

      const get_query = `
        query LookUpgetproducts {
          site { ${innerQuery} }
        }
      `;
    
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
