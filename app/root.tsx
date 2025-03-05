import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import { useLocation } from "@remix-run/react";

import styles from "./tailwind.css?url";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  {
    rel: "preload",
    as: "font",
    href: "fonts/BacteriaBT.woff2", // must be the same with url above
    type: "font/woff2",
    crossOrigin: "anonymous",
  },
  {
    rel: "preload",
    as: "font",
    href: "fonts/Kiffo-BT-Regular.woff", // must be the same with url above
    type: "font/woff",
    crossOrigin: "anonymous",
  },
  {
    rel: "preload",
    as: "font",
    href: "fonts/Kiffo-BT-Medium.woff", // must be the same with url above
    type: "font/woff",
    crossOrigin: "anonymous",
  },

  {
    rel:"preload",
    as:"font",
    href:"fonts/Kiffo-BT-ExtraLight.woff", 
    type: "font/woff",
    crossOrigin: "anonymous",
  }
];

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const cssBG = location.pathname === "/" ? "bg-grid":""
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        
        <Links />
      </head>
      <body className={`${cssBG}`}>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
