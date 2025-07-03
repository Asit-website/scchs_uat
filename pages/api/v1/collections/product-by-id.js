import { get_token_default } from "../../config";

export default async function handler(req, res) {

  const { id } = req.body;

    try {

      //get token
      const store_token = await get_token_default();

      const get_query = `query productById {
        site {
          product(entityId:${id}) {
            entityId
            name
            sku
            path
            productOptions(first: 50) {
              edges {
                node {
                  entityId
                  displayName
                  isRequired
                  isVariantOption
                  __typename
                  ... on CheckboxOption {
                    checkedByDefault
                    label
                    checkedOptionValueEntityId
                    uncheckedOptionValueEntityId
                    entityId
                    displayName
                    isVariantOption
                    isRequired
                  }
                  ... on DateFieldOption {
                    defaultValue
                    earliest
                    latest
                    limitDateBy
                    entityId
                    displayName
                    isRequired
                  }
                  ... on FileUploadFieldOption {
                    maxFileSize
                    fileTypes
                    entityId
                    displayName
                    isRequired
                    isVariantOption
                    __typename
                  }
                  ... on MultiLineTextFieldOption {
                    newName: defaultValue
                    minLength
                    maxLength
                    maxLines
                    entityId
                    displayName
                    isRequired
                  }
                  ... on MultipleChoiceOption {
                    displayStyle
                    entityId
                    displayName
                    isRequired
                    isVariantOption
                    values(first: 50) {
                      edges {
                        node {
                          entityId
                          label
                          isDefault
                          isSelected
                          ... on SwatchOptionValue {
                            hexColors
                            imageUrl(width: 200)
                          }
                        }
                      }
                    }
                  }
                  ... on NumberFieldOption {
                    newNumber: defaultValue
                    lowest
                    highest
                    isIntegerOnly
                    limitNumberBy
                    entityId
                    displayName
                    isRequired
                    isVariantOption
                    __typename
                  }
                  ... on TextFieldOption {
                    newText: defaultValue
                    minLength
                    maxLength
                    entityId
                    displayName
                    isRequired
                    isVariantOption
                    __typename
                  }
                }
              }
            }
            description
            images {
              edges {
                node {
                  url960wide: url(width: 960)
                  altText
                  isDefault
                }
              }
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
            customFields {
              edges {
                node {
                  entityId
                  name
                  value
                }
              }
            }
            brand {
              name
            }
            relatedProducts {
              edges {
                node {
                  id
                  sku
                  path
                  name
                  defaultImage {
                    url(width: 300, height: 300)
                  }
                  prices {
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
                    basePrice {
                      currencyCode
                      value
                    }
                    salePrice {
                      currencyCode
                      value
                    }
                  }
                }
              }
            }
            seo {
              pageTitle
              metaDescription
            }
          }
        }
      }`;

      const end_point = process.env.bc.store_url+'graphql';
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
  



// variants(first: 250) {
//   pageInfo {
//     startCursor
//     endCursor
//     hasNextPage
//     hasPreviousPage
//   }
//   edges {
//     node {
//       sku
//       isPurchasable
//       inventory {
//         isInStock
//       }
//       defaultImage {
//         urlOriginal
//       }
//       prices {
//         price {
//           currencyCode
//           value
//         }
//       }
//     }
//   }
// }