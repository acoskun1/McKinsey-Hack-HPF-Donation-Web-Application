import React from 'react'
import Head from 'next/head'
import { Container } from '@/components/Container'
import { useRouter } from 'next/router'
import axios from 'axios'

const success = () => {
    const router = useRouter()

  return (
    <>
    <Head>
      <title>{`Title - Their Side`}</title>
    </Head>
    <article className="py-16 lg:py-36" id="article">
        <Container>
            <div class="h-screen">
            <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-md">
                <svg viewBox="0 0 24 24" class="text-green-600 w-16 h-16 mx-auto my-6">
                    <path fill="currentColor"
                        d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
                    </path>
                </svg>
                <div class="text-center">
                    <h3 class="md:text-2xl text-base text-gray-900 font-semibold text-center">Payment Done!</h3>
                    <p class="text-gray-600 my-2">Thank you for completing your secure Donation.</p>
                    <p> Have a great day!  </p>
                    <button className="mt-4 underline text-blue-600 hover:text-blue-800 visited:text-purple-600" onClick={() => {
                        const data = localStorage.getItem('invoicePdf')
                        localStorage.removeItem('invoicePdf')
                        axios.post('http://127.0.0.1:8000/postData', data)
                            .then(res => console.log(res))
                            .catch(err => console.log(err))
                        
                    }}>Download Invoice</button>
                    <div class="py-8 text-center">
                        <button onClick={() => router.push("/")} class="rounded-md border px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3">
                            GO BACK 
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

export default success