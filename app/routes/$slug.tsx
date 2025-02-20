import imageUrlBuilder from "@sanity/image-url";
import { LoaderFunctionArgs } from "@remix-run/node";
import { Link, Outlet, useLoaderData, useNavigate } from "@remix-run/react";
import { SanityDocument } from "@sanity/client";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { PortableText } from "@portabletext/react";
import { client } from "~/sanity/client";
import { Layout } from "~/components/Layout";
import Precio from "~/components/Precio";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { cssHovers } from "~/utils";
import ModalProduct from "~/components/ModalProduct";

const POST_QUERY = `*[_type == "product" && slug.current == $slug][0]{_id, descripcion, imagen, precio, titulo}`;

const POSTS_QUERY_PRODUCTOS = `*[
  _type == "product"
  && defined(slug.current)
]|order(publicado asc)[0...12]{_id, descripcion, imagen, precio,  titulo, slug, publicado, thumbnail }`;

export async function loader({ params }: LoaderFunctionArgs) {
  return {
    post: await client.fetch<SanityDocument>(POST_QUERY, params),
    products: await client.fetch<SanityDocument[]>(POSTS_QUERY_PRODUCTOS),
  };
}

const builder = imageUrlBuilder(client);
function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

export default function PostPage() {
  const { post, products } = useLoaderData<typeof loader>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  useEffect(() => {});



  const titulo: string = post.titulo;

  return (
    <Layout>
      <main className="container mx-auto min-h-screen max-w-3xl">
        <div className="xs:block md:hidden my-[24px] mx-[74px]">
        <div className="flex justify-center">
          <div className="relative w-fit h-fit">
   
              
            <div className="absolute bottom-[5%] left-[-24%] z-10">
              <Precio precio={post.precio} />
            </div>
              {post && (
                <div>
                  <img
                    src={urlFor(post?.imagen)?.fit("min").url().toString()}
                    alt={post.titulo}
                    className="h-[280px] z-1"
                  />
                </div>
              )}
          </div>
          </div>

          <div>
            <h1 className="mt-[50px] text-[34px] m-r-[15px] font-kiffoB mb-3 break-words">
              {titulo.toUpperCase()}
            </h1>
            <div className="prose uppercase font-kiffoL  text-[25px] text-white break-words mb-[14px]">
              {Array.isArray(post.descripcion) && (
                <PortableText value={post.descripcion} />
              )}
            </div>
            <button
              className="font-kiffoB text-primary hover:text-red text-[30px] underline"
              onClick={handleOpenModal}
            >
              LO QUIERO
            </button>
          </div>
        </div>
        <div className=" xs:hidden md:flex  my-[16px]">
          <div className="w-1/2">
            <div className="pr-[40px]">
              <Precio  precio={post.precio} />
              <h1 className="mt-[20px] text-[34px] m-r-[15px] font-kiffoB mb-[15px] ">
                {titulo.toUpperCase()}
              </h1>
              <div className="prose uppercase font-kiffoL text-[25px] text-white leading-none">
                {Array.isArray(post.descripcion) && (
                  <PortableText value={post.descripcion} />
                )}
              </div>
              <button
                className="font-kiffoB text-primary  pt-[15px] text-[30px] underline"
                onClick={handleOpenModal}
              >
                LO QUIERO
              </button>
            </div>
          </div>
          <div className="w-1/2 flex justify-end">
            {post && (
              <div >
                <img
                className="h-[300px] z-1"
                  src={urlFor(post?.imagen)?.fit("max").url().toString()}
                  alt={post.titulo}
                />
              </div>
            )}
          </div>
          <div>
            <div></div>
          </div>
        </div>
        {products && (
          <ul className="grid xs:grid-cols-2 md:grid-cols-4 max-w-3xl m-auto md:pt-[120px] xs:pt-[106px] xs:mx-[50px] md:mx-[0px] md:gap-[50px] xs:gap-[0px] xs:px-[30px]">
            {products.map((product, index) => {
              const cssStyle = cssHovers[index % cssHovers.length]
              
              return (
          <li className={`flex justify-center  w-full ${cssStyle} md:mb-[0] xs:mb-[50px]`} key={product._id} >
           
           <div className="xs:block md:hidden ">
           <Link className="pointer min-h-[250px]"  to={`/${product.slug.current}`}>
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
              );
            })}
          </ul>
        )}
        <ModalProduct isOpen={isModalOpen} onClose={handleCloseModal}></ModalProduct>

      </main>

    </Layout>
  );
}
