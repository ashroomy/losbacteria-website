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


const POST_QUERY = `*[_type == "product" && slug.current == $slug][0]{_id, descripcion, imagen, precio, titulo}`;

const POSTS_QUERY_PRODUCTOS = `*[
  _type == "product"
  && defined(slug.current)
]|order(publicado asc)[0...12]{_id, descripcion, imagen, precio,  titulo, slug, publicado, thumbnail }`;


export async function loader({ params }: LoaderFunctionArgs) {
  return {
    post: await client.fetch<SanityDocument>(POST_QUERY, params),
    products: await client.fetch<SanityDocument[]>(POSTS_QUERY_PRODUCTOS)

  };
}

const builder = imageUrlBuilder(client)
function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

export default function PostPage() {

  const { post, products } = useLoaderData<typeof loader>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  useEffect(() => {

    console.log('status', isModalOpen)
  });

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
    <Layout back>
      <main className="container mx-auto min-h-screen max-w-3xl">
        <div className="xs:block md:hidden my-[24px] mx-[45px]">
          <div className="relative flex justify-center">
          <div className="absolute bottom-[8%] left-[0%]">
          <Precio isMobile={false}  precio={post.precio} />
          </div>
          <div>
          {post && (
              <img
                src={urlFor(post?.imagen)?.height(280).quality(100).url().toString()}
                alt={post.titulo}
                className=""
              />
            )}
          </div>

          </div>
          <div > 
          <h1 className="mt-[50px] text-[40px] m-r-[15px] font-kiffoB mb-3 break-words">{titulo.toUpperCase()}</h1>
            <div className="prose uppercase font-kiffoR  text-[28px] text-white break-words">
              {Array.isArray(post.descripcion) && <PortableText value={post.descripcion} />}
            </div>
            <button className="font-kiffoB text-primary text-[30px] underline"
            onClick={handleOpenModal}>
              LO QUIERO
            </button>
          </div>

        </div>
        <div className=" xs:hidden md:flex  my-[16px]">
          <div className="w-1/2">
          <div className="pr-[40px]">
          <Precio isMobile={false} precio={post.precio} />
            <h1 className="mt-[20px] text-[34px] m-r-[15px] font-kiffoB mb-[15px] ">{titulo.toUpperCase()}</h1>
            <div className="prose uppercase font-kiffoR font-extralight	 text-[25px] text-white">
              {Array.isArray(post.descripcion) && <PortableText value={post.descripcion} />}
            </div>
            <button className="font-kiffoB text-primary text-[30px] underline"
            onClick={handleOpenModal}>
              LO QUIERO
            </button>
          </div>

          </div>
          <div className="w-1/2 md:min-w-[240px]  flex justify-end">
            {post && (
              <img
                src={urlFor(post?.imagen)?.height(300).quality(100).url().toString()}
                alt={post.titulo}
                className=""
              />
            )}
          </div>
          <div>
            <div>

            </div>

          </div>

        </div>
        {products && <ul className="grid xs:grid-cols-2 md:grid-cols-4 gap-[68px] max-w-3xl m-auto md:pt-[120px] xs:pt-[124px] xs:mx-[50px] md:mx-[0px]">

          {products.map((product) => (
            <li className="flex justify-center" key={product._id} >
              <Link className="pointer pb-5" to={`/${product.slug.current}`}>
                {product.thumbnail && <img src={urlFor(product.thumbnail).fit('scale').height(120).quality(100).url().toString()} />}
              </Link>
            </li>
          ))}
        </ul>}

        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
      </Modal>
      </main>
    </Layout>
  );
}