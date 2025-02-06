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
import Modal from "~/components/Modal";
import { cssHovers } from "~/utils";

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

  // const { addToCart } = useCart();

  // const handleAddToCart = () => {
  //   addToCart({
  //     id: post._id,
  //     title: post.titulo,
  //     price: post.precio,
  //     quantity: 1,
  //     imgSrc: urlFor(post.imagen).url().toString()
  //   });
  // };
  const titulo: string = post.titulo;

  return (
    <Layout>
      <main className="container mx-auto min-h-screen max-w-3xl">
        <div className="xs:block md:hidden my-[24px] mx-[45px]">
          <div className="relative flex justify-center">
            <div className="absolute bottom-[8%] left-[0%] z-20">
              <Precio isMobile={false} precio={post.precio} />
            </div>
            <div>
              {post && (
                <div className="h-[280px]">
                  <img
                    src={urlFor(post?.imagen)?.fit("min").url().toString()}
                    alt={post.titulo}
                    className=""
                  />
                </div>
              )}
            </div>
          </div>
          <div>
            <h1 className="mt-[50px] text-[40px] m-r-[15px] font-kiffoB mb-3 break-words">
              {titulo.toUpperCase()}
            </h1>
            <div className="prose uppercase font-kiffoR  text-[28px] text-white break-words mb-[14px]">
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
              <Precio isMobile={false} precio={post.precio} />
              <h1 className="mt-[20px] text-[34px] m-r-[15px] font-kiffoB mb-[15px] ">
                {titulo.toUpperCase()}
              </h1>
              <div className="prose uppercase font-kiffoR font-extralight	 text-[25px] text-white">
                {Array.isArray(post.descripcion) && (
                  <PortableText value={post.descripcion} />
                )}
              </div>
              <button
                className="font-kiffoB text-primary text-[30px] underline"
                onClick={handleOpenModal}
              >
                LO QUIERO
              </button>
            </div>
          </div>
          <div className="w-1/2 flex justify-end">
            {post && (
              <div className="h-[300px]">
                <img
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
          <ul className="grid xs:grid-cols-2 md:grid-cols-4 gap-[68px] max-w-3xl m-auto md:pt-[120px] xs:pt-[124px] xs:mx-[50px] md:mx-[0px]">
            {products.map((product, index) => {
              const cssStyle = cssHovers[index % cssHovers.length]
              
              return (
                <li className= {`flex justify-center  ${cssStyle} mb-5`} key={product._id}>
                  <Link
                    className="pointer "
                    to={`/${product.slug.current}`}
                  >
                    {product.thumbnail && (
                      <img
                      className="h-[120px]"
                        src={urlFor(product.thumbnail)
                          .fit("min")

                          .url()
                          .toString()}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}

        <Modal isOpen={isModalOpen} onClose={handleCloseModal}></Modal>
      </main>
    </Layout>
  );
}
