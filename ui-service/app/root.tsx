import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from "react-router";

import { Header } from "./components/Header.js";
import { BottomNav } from "./components/BottomNav.js";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className='min-h-screen'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <Meta />
        <Links />
      </head>
      <body className='min-h-screen bg-gray-50 text-gray-800'>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <>
      <Header />
      <main className='container mx-auto p-4'>
        <Outlet />
      </main>
      <BottomNav />
    </>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  return (
    <Layout>
      <div className='container mx-auto p-4 text-center'>
        <h1 className='text-2xl font-bold'>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        {isRouteErrorResponse(error) && (
          <p className='text-red-500'>
            <i>
              {error.status} {error.statusText}
            </i>
          </p>
        )}
      </div>
    </Layout>
  );
}