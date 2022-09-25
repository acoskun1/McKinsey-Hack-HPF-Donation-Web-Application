/* This example requires Tailwind CSS v2.0+ */

import { Container } from '@/components/Container'
import Head from 'next/head'
import { useRouter } from 'next/router'

const transaction = () => {
    const router = useRouter()
    
  return (
    <>
    <Head>
      <title>{`Title - Their Side`}</title>
    </Head>
    <article className="py-16 lg:py-36" id="article">
        <Container>
        <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-md ">
          <div className="mx-auto max-w-7xl py-12 px-4 text-center sm:px-6 lg:py-16 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-3xl block">Insert Your Card</h2>
            <p className="text-2xl font-bold tracking-tight text-gray-500 sm:text-2xl block py-3">or</p>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-3xl block">Pay by Contactless</h2>
            <div className="mt-8 flex justify-center">
              <div className="inline-flex rounded-md shadow">
                <button
                    onClick={() => router.push("/")}
                  className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-5 py-3 text-base font-medium text-white hover:bg-indigo-700"
                >
                    Cancel
                </button>
              </div>
              <div className="ml-3 inline-flex">
                <button
                  onClick={() => router.push("/checkout/success#article")}
                  className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-100 px-5 py-3 text-base font-medium text-indigo-700 hover:bg-indigo-200"
                >
                    OK
                </button>
              </div>
            </div>
          </div>
        </div>
        </Container>
    </article>
    </>
  )
}

export default transaction