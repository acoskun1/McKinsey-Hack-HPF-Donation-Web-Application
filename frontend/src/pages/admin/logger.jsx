/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { useState, useEffect } from 'react'
import { RadioGroup } from '@headlessui/react'
import { CheckCircleIcon, TrashIcon } from '@heroicons/react/20/solid'
import Head from 'next/head'
import { useRouter } from 'next/router'
import axios from 'axios'

const availablePlaygrounds = [
  {
    id: 1,
    title: 'Toilets',
    href: '#',
    desc: 'Some random ass descriptions',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/checkout-page-02-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
  },
  {
    id: 2,
    title: 'Roof',
    href: '#',
    desc: 'Some random ass descriptions',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/checkout-page-02-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
  },
  // More products...
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Checkout = (props) => {
    
    const [projectName, setProjectName] = useState("Fundrising for building school")
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [subProject, setSubProject] = useState('')

    const router = useRouter()


    const handleSubmit = e => {  
        e.preventDefault();
        const data = {
            projectName,
            title,
            desc,
            subProject
        }
        console.log(data)
        // TODO: Give to API
        axios.post('http://127.0.0.1:8000/logData', data).then(res => console.log(res))

    }

  return (
    <>
    <Head>
      <title>{`Title - Their Side`}</title>
    </Head>
    <article className="py-16 lg:py-36">
    {/* <div className="lg:max-w-4xl">
        <div className="mx-auto px-4 sm:px-6 md:max-w-2xl md:px-4 lg:px-0">
          {children} */}
        
      <div className="lg:max-w-4xl">
        <div className="mx-auto px-4 sm:px-6 md:max-w-3xl md:px-4 lg:px-0">
            <div>
                <h2 className="sr-only">Checkout</h2>

                <form className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
                <div>
                <h2 className="text-lg font-medium text-gray-900">Project Logger</h2>
                    {/* Donor Info */}
                    <div className="border-gray-200">

                    <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                        <div>
                        <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                            Project Name
                        </label>
                        <div className="mt-1">
                            <input
                            type="text"
                            id="first-name"
                            name="first-name"
                            autoComplete="given-name"
                            onChange={(e)=> setProjectName(e.target.value)}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                        </div>

                        <div>
                        <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                            Title
                        </label>
                        <div className="mt-1">
                            <input
                            type="text"
                            id="last-name"
                            name="last-name"
                            autoComplete="family-name"
                            onChange={(e)=> setTitle(e.target.value)}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                        </div>

                        <div className="sm:col-span-2">
                        <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                            Description
                        </label>
                        <div className="mt-1">
                            <textarea
                            type="text"
                            name="company"
                            id="company"
                            onChange={(e)=> setDesc(e.target.value)}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                        </div>

                        <div className="sm:col-span-2">
                        <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                            SubProject
                        </label>
                        <div className="mt-1">
                                <select
                                    id="currency"
                                    name="currency"
                                    className="rounded-md border border-gray-300 text-left text-base font-medium text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                                    onChange={(e) =>setSubProject(e.target.value)}
                                >
                                    {availablePlaygrounds.map((code)=> <option value={code.title}>{code.title}</option>)}
                                </select>
                        </div>
                        </div>

                    </div>
                    </div>
                </div>

                {/* Order summary */}
                <div className="mt-10 lg:mt-0">
                    <h2 className="text-lg font-medium text-gray-900">Submit</h2>

                    <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
                    <h3 className="sr-only">Items in your cart</h3>

                    <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                        <button
                        onClick={handleSubmit}
                        className="w-full rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                        >
                        Log It
                        </button>
                    </div>
                    </div>
                </div>
                </form>
            </div>
      </div>
      </div>


    </article>
  </>
  )
}

export default Checkout