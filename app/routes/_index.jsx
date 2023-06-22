import {useLoaderData} from '@remix-run/react';
import {json} from '@shopify/remix-oxygen';

export async function loader() {
  return json({
    message: 'Hello world from server!!',
  });
}

export default function Index() {
  const {message} = useLoaderData();
  return <h1>{message}</h1>;
}
