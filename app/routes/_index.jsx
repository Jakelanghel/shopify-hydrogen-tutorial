import {Link, useLoaderData} from '@remix-run/react';
// this json function will always be imported from the runtime that you are deployed to (oxygen, cloudflare, vercel, node )
import {json} from '@shopify/remix-oxygen';

// to get data for our page we need to define a loader
// your loader will only ever run on the server ( wont go to client )
export async function loader({context}) {
  // context object is passed into every loader through remix
  // query store data with context.storefront.query method
  // to configure a new store front by changing PUBLIC_STOREFRONT_API_TOKEN in .env file
  const {products} = await context.storefront.query(ALL_PRODUCTS_QUERY);
  console.log(products);
  return json({
    products: products.nodes,
  });
}

export default function Index() {
  // you can access whatever data you return from you loader with the useLoaderData hook
  const {products} = useLoaderData();
  return products.map((prod) => (
    <Link to={`/products/${prod.handle}`} key={prod.handle}>
      {prod.title}
    </Link>
  ));
}

// define a query
// the store front API (shopify API) is a graphQL API so we need to defile a graphQL query
const ALL_PRODUCTS_QUERY = `#graphql
  query AllProducts {
    products(first: 10) {
      nodes {
        title
        id
        handle
      }
    }
  }
`;

// we can auto generate routes with command npm run g route
// if command does not work add this to package.json
// "g": "shopify hydrogen generate"
