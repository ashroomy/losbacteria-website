import type { ActionFunction, MetaFunction } from "@remix-run/node";
import { json, Link, useLoaderData } from "@remix-run/react";
import { SanityDocument } from "@sanity/client";
import  {Layout}  from './components/Layout';
import { client } from "~/sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { motion } from "motion/react";
import { Outlet } from '@remix-run/react';
import {cssHovers} from '../utils'
import { register } from "./utils/auth.server";
import { validateEmail } from "./utils/validator.server";


export const action: ActionFunction = async ({ request }) => {
  
  const form = await request.formData();
  const email = form.get("email");
  // If not all data was passed, error
  if (typeof email !== "string") {
    return Response.json({ error: `El correo que escribiste no es válido. Intentalo de nuevo.` }, { status: 400 });
  }


  // Validate email & password

  const errors = {
    email: validateEmail(email)
  };  

  //  If there were any errors, return them
  if (Object.values(errors).some(Boolean))
    return { errors, fields: { email } };
  const registered = await register({ email });
  return registered;
}
export const meta: MetaFunction = () => {
  return [
    { title: "Los bacteria" },
    { name: "description", content: "Bacteria es un colectivo creativo que utiliza el arte, diseño, mercadeo y publicidad para crear y potenciar marcas que generen impacto cultural y comercial" },
  ];
};


const POSTS_QUERY = `*[
  _type == "product"
  && defined(slug.current)
]|order(publicado asc)[0...12]{_id, descripcion, imagen, precio,  titulo, slug, publicado, thumbnail }`;

export async function loader() {
  return { products: await client.fetch<SanityDocument[]>(POSTS_QUERY) };
}
const builder = imageUrlBuilder(client)
function urlFor(source: SanityImageSource) {
  return builder.image(source)
}




export default function IndexPage() {
  const { products } = useLoaderData<typeof loader>();
  return (
      <Layout>
      <main className="container mx-auto  pb-[32px]">
      <ul className="grid xs:grid-cols-2 md:grid-cols-4  max-w-3xl m-auto md:px-[0] md:gap-[50px] xs:gap-[40px] xs:px-[30px]">
        {products.map((product, index) => {
          const cssStyle = cssHovers[index % cssHovers.length]
          return(
          <li className={`flex justify-center  w-full ${cssStyle} `} key={product._id} >
           
           <div className="xs:block md:hidden ">
           <Link className="pointer"  to={`/${product.slug.current}`}>
            {product.thumbnail &&   <motion.img
                  className="h-[150px]"
                  whileHover={{ scale: 1.1, rotate:'10deg' }}
                  whileTap={{ scale: 1.1, rotate:'10deg' }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
             src={urlFor(product.thumbnail).fit('min').url().toString()}/> }
            </Link>
           </div>
           <div className="md:block xs:hidden">
           <Link className="pointer "   to={`/${product.slug.current}`}>
            {product.thumbnail &&   <motion.img
                  className="h-[120px]"
                  whileHover={{ scale: 1.2, rotate:'10deg' }}
                  whileTap={{ scale: 1.2, rotate:'10deg' }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
             src={urlFor(product.thumbnail).fit('min').url().toString()}/> }
            </Link>
           </div>
           
          </li>
        )})}
      </ul>
      <Outlet />

    </main>
      </Layout>

  );
}

