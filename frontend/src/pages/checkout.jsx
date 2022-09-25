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

const paymentMethods = [
  { id: 'credit-card', title: 'Credit card' },
  { id: 'paypal', title: 'PayPal' },
  { id: 'etransfer', title: 'eTransfer' },
]

const currency_code = ["AFA", "ALL", "DZD", "AOA", "ARS", "AMD", "AWG", "AUD", "AZN", "BSD", "BHD", "BDT", "BBD", "BYR", "BEF", "BZD", "BMD", "BTN", "BTC", "BOB", "BAM", "BWP", "BRL", "GBP", "BND", "BGN", "BIF", "KHR", "CAD", "CVE", "KYD", "XOF", "XAF", "XPF", "CLP", "CNY", "COP", "KMF", "CDF", "CRC", "HRK", "CUC", "CZK", "DKK", "DJF", "DOP", "XCD", "EGP", "ERN", "EEK", "ETB", "EUR", "FKP", "FJD", "GMD", "GEL", "DEM", "GHS", "GIP", "GRD", "GTQ", "GNF", "GYD", "HTG", "HNL", "HKD", "HUF", "ISK", "INR", "IDR", "IRR", "IQD", "ILS", "ITL", "JMD", "JPY", "JOD", "KZT", "KES", "KWD", "KGS", "LAK", "LVL", "LBP", "LSL", "LRD", "LYD", "LTL", "MOP", "MKD", "MGA", "MWK", "MYR", "MVR", "MRO", "MUR", "MXN", "MDL", "MNT", "MAD", "MZM", "MMK", "NAD", "NPR", "ANG", "TWD", "NZD", "NIO", "NGN", "KPW", "NOK", "OMR", "PKR", "PAB", "PGK", "PYG", "PEN", "PHP", "PLN", "QAR", "RON", "RUB", "RWF", "SVC", "WST", "SAR", "RSD", "SCR", "SLL", "SGD", "SKK", "SBD", "SOS", "ZAR", "KRW", "XDR", "LKR", "SHP", "SDG", "SRD", "SZL", "SEK", "CHF", "SYP", "STD", "TJS", "TZS", "THB", "TOP", "TTD", "TND", "TRY", "TMT", "UGX", "UAH", "AED", "UYU", "USD", "UZS", "VUV", "VEF", "VND", "YER", "ZMK"];

// length 164
const currency_list = {
    "AFA": {"name":"Afghan Afghani","symbol":"؋"},
    "ALL": {"name":"Albanian Lek","symbol":"Lek"},
    "DZD": {"name":"Algerian Dinar","symbol":"دج"},
    "AOA": {"name":"Angolan Kwanza","symbol":"Kz"},
    "ARS": {"name":"Argentine Peso","symbol":"$"},
    "AMD": {"name":"Armenian Dram","symbol":"֏"},
    "AWG": {"name":"Aruban Florin","symbol":"ƒ"},
    "AUD": {"name":"Australian Dollar","symbol":"$"},
    "AZN": {"name":"Azerbaijani Manat","symbol":"m"},
    "BSD": {"name":"Bahamian Dollar","symbol":"B$"},
    "BHD": {"name":"Bahraini Dinar","symbol":".د.ب"},
    "BDT": {"name":"Bangladeshi Taka","symbol":"৳"},
    "BBD": {"name":"Barbadian Dollar","symbol":"Bds$"},
    "BYR": {"name":"Belarusian Ruble","symbol":"Br"},
    "BEF": {"name":"Belgian Franc","symbol":"fr"},
    "BZD": {"name":"Belize Dollar","symbol":"$"},
    "BMD": {"name":"Bermudan Dollar","symbol":"$"},
    "BTN": {"name":"Bhutanese Ngultrum","symbol":"Nu."},
    "BTC": {"name":"Bitcoin","symbol":"฿"},
    "BOB": {"name":"Bolivian Boliviano","symbol":"Bs."},
    "BAM": {"name":"Bosnia-Herzegovina Convertible Mark","symbol":"KM"},
    "BWP": {"name":"Botswanan Pula","symbol":"P"},
    "BRL": {"name":"Brazilian Real","symbol":"R$"},
    "GBP": {"name":"British Pound Sterling","symbol":"£"},
    "BND": {"name":"Brunei Dollar","symbol":"B$"},
    "BGN": {"name":"Bulgarian Lev","symbol":"Лв."},
    "BIF": {"name":"Burundian Franc","symbol":"FBu"},
    "KHR": {"name":"Cambodian Riel","symbol":"KHR"},
    "CAD": {"name":"Canadian Dollar","symbol":"$"},
    "CVE": {"name":"Cape Verdean Escudo","symbol":"$"},
    "KYD": {"name":"Cayman Islands Dollar","symbol":"$"},
    "XOF": {"name":"CFA Franc BCEAO","symbol":"CFA"},
    "XAF": {"name":"CFA Franc BEAC","symbol":"FCFA"},
    "XPF": {"name":"CFP Franc","symbol":"₣"},
    "CLP": {"name":"Chilean Peso","symbol":"$"},
    "CNY": {"name":"Chinese Yuan","symbol":"¥"},
    "COP": {"name":"Colombian Peso","symbol":"$"},
    "KMF": {"name":"Comorian Franc","symbol":"CF"},
    "CDF": {"name":"Congolese Franc","symbol":"FC"},
    "CRC": {"name":"Costa Rican ColÃ³n","symbol":"₡"},
    "HRK": {"name":"Croatian Kuna","symbol":"kn"},
    "CUC": {"name":"Cuban Convertible Peso","symbol":"$, CUC"},
    "CZK": {"name":"Czech Republic Koruna","symbol":"Kč"},
    "DKK": {"name":"Danish Krone","symbol":"Kr."},
    "DJF": {"name":"Djiboutian Franc","symbol":"Fdj"},
    "DOP": {"name":"Dominican Peso","symbol":"$"},
    "XCD": {"name":"East Caribbean Dollar","symbol":"$"},
    "EGP": {"name":"Egyptian Pound","symbol":"ج.م"},
    "ERN": {"name":"Eritrean Nakfa","symbol":"Nfk"},
    "EEK": {"name":"Estonian Kroon","symbol":"kr"},
    "ETB": {"name":"Ethiopian Birr","symbol":"Nkf"},
    "EUR": {"name":"Euro","symbol":"€"},
    "FKP": {"name":"Falkland Islands Pound","symbol":"£"},
    "FJD": {"name":"Fijian Dollar","symbol":"FJ$"},
    "GMD": {"name":"Gambian Dalasi","symbol":"D"},
    "GEL": {"name":"Georgian Lari","symbol":"ლ"},
    "DEM": {"name":"German Mark","symbol":"DM"},
    "GHS": {"name":"Ghanaian Cedi","symbol":"GH₵"},
    "GIP": {"name":"Gibraltar Pound","symbol":"£"},
    "GRD": {"name":"Greek Drachma","symbol":"₯, Δρχ, Δρ"},
    "GTQ": {"name":"Guatemalan Quetzal","symbol":"Q"},
    "GNF": {"name":"Guinean Franc","symbol":"FG"},
    "GYD": {"name":"Guyanaese Dollar","symbol":"$"},
    "HTG": {"name":"Haitian Gourde","symbol":"G"},
    "HNL": {"name":"Honduran Lempira","symbol":"L"},
    "HKD": {"name":"Hong Kong Dollar","symbol":"$"},
    "HUF": {"name":"Hungarian Forint","symbol":"Ft"},
    "ISK": {"name":"Icelandic KrÃ³na","symbol":"kr"},
    "INR": {"name":"Indian Rupee","symbol":"₹"},
    "IDR": {"name":"Indonesian Rupiah","symbol":"Rp"},
    "IRR": {"name":"Iranian Rial","symbol":"﷼"},
    "IQD": {"name":"Iraqi Dinar","symbol":"د.ع"},
    "ILS": {"name":"Israeli New Sheqel","symbol":"₪"},
    "ITL": {"name":"Italian Lira","symbol":"L,£"},
    "JMD": {"name":"Jamaican Dollar","symbol":"J$"},
    "JPY": {"name":"Japanese Yen","symbol":"¥"},
    "JOD": {"name":"Jordanian Dinar","symbol":"ا.د"},
    "KZT": {"name":"Kazakhstani Tenge","symbol":"лв"},
    "KES": {"name":"Kenyan Shilling","symbol":"KSh"},
    "KWD": {"name":"Kuwaiti Dinar","symbol":"ك.د"},
    "KGS": {"name":"Kyrgystani Som","symbol":"лв"},
    "LAK": {"name":"Laotian Kip","symbol":"₭"},
    "LVL": {"name":"Latvian Lats","symbol":"Ls"},
    "LBP": {"name":"Lebanese Pound","symbol":"£"},
    "LSL": {"name":"Lesotho Loti","symbol":"L"},
    "LRD": {"name":"Liberian Dollar","symbol":"$"},
    "LYD": {"name":"Libyan Dinar","symbol":"د.ل"},
    "LTL": {"name":"Lithuanian Litas","symbol":"Lt"},
    "MOP": {"name":"Macanese Pataca","symbol":"$"},
    "MKD": {"name":"Macedonian Denar","symbol":"ден"},
    "MGA": {"name":"Malagasy Ariary","symbol":"Ar"},
    "MWK": {"name":"Malawian Kwacha","symbol":"MK"},
    "MYR": {"name":"Malaysian Ringgit","symbol":"RM"},
    "MVR": {"name":"Maldivian Rufiyaa","symbol":"Rf"},
    "MRO": {"name":"Mauritanian Ouguiya","symbol":"MRU"},
    "MUR": {"name":"Mauritian Rupee","symbol":"₨"},
    "MXN": {"name":"Mexican Peso","symbol":"$"},
    "MDL": {"name":"Moldovan Leu","symbol":"L"},
    "MNT": {"name":"Mongolian Tugrik","symbol":"₮"},
    "MAD": {"name":"Moroccan Dirham","symbol":"MAD"},
    "MZM": {"name":"Mozambican Metical","symbol":"MT"},
    "MMK": {"name":"Myanmar Kyat","symbol":"K"},
    "NAD": {"name":"Namibian Dollar","symbol":"$"},
    "NPR": {"name":"Nepalese Rupee","symbol":"₨"},
    "ANG": {"name":"Netherlands Antillean Guilder","symbol":"ƒ"},
    "TWD": {"name":"New Taiwan Dollar","symbol":"$"},
    "NZD": {"name":"New Zealand Dollar","symbol":"$"},
    "NIO": {"name":"Nicaraguan CÃ³rdoba","symbol":"C$"},
    "NGN": {"name":"Nigerian Naira","symbol":"₦"},
    "KPW": {"name":"North Korean Won","symbol":"₩"},
    "NOK": {"name":"Norwegian Krone","symbol":"kr"},
    "OMR": {"name":"Omani Rial","symbol":".ع.ر"},
    "PKR": {"name":"Pakistani Rupee","symbol":"₨"},
    "PAB": {"name":"Panamanian Balboa","symbol":"B/."},
    "PGK": {"name":"Papua New Guinean Kina","symbol":"K"},
    "PYG": {"name":"Paraguayan Guarani","symbol":"₲"},
    "PEN": {"name":"Peruvian Nuevo Sol","symbol":"S/."},
    "PHP": {"name":"Philippine Peso","symbol":"₱"},
    "PLN": {"name":"Polish Zloty","symbol":"zł"},
    "QAR": {"name":"Qatari Rial","symbol":"ق.ر"},
    "RON": {"name":"Romanian Leu","symbol":"lei"},
    "RUB": {"name":"Russian Ruble","symbol":"₽"},
    "RWF": {"name":"Rwandan Franc","symbol":"FRw"},
    "SVC": {"name":"Salvadoran ColÃ³n","symbol":"₡"},
    "WST": {"name":"Samoan Tala","symbol":"SAT"},
    "SAR": {"name":"Saudi Riyal","symbol":"﷼"},
    "RSD": {"name":"Serbian Dinar","symbol":"din"},
    "SCR": {"name":"Seychellois Rupee","symbol":"SRe"},
    "SLL": {"name":"Sierra Leonean Leone","symbol":"Le"},
    "SGD": {"name":"Singapore Dollar","symbol":"$"},
    "SKK": {"name":"Slovak Koruna","symbol":"Sk"},
    "SBD": {"name":"Solomon Islands Dollar","symbol":"Si$"},
    "SOS": {"name":"Somali Shilling","symbol":"Sh.so."},
    "ZAR": {"name":"South African Rand","symbol":"R"},
    "KRW": {"name":"South Korean Won","symbol":"₩"},
    "XDR": {"name":"Special Drawing Rights","symbol":"SDR"},
    "LKR": {"name":"Sri Lankan Rupee","symbol":"Rs"},
    "SHP": {"name":"St. Helena Pound","symbol":"£"},
    "SDG": {"name":"Sudanese Pound","symbol":".س.ج"},
    "SRD": {"name":"Surinamese Dollar","symbol":"$"},
    "SZL": {"name":"Swazi Lilangeni","symbol":"E"},
    "SEK": {"name":"Swedish Krona","symbol":"kr"},
    "CHF": {"name":"Swiss Franc","symbol":"CHf"},
    "SYP": {"name":"Syrian Pound","symbol":"LS"},
    "STD": {"name":"São Tomé and Príncipe Dobra","symbol":"Db"},
    "TJS": {"name":"Tajikistani Somoni","symbol":"SM"},
    "TZS": {"name":"Tanzanian Shilling","symbol":"TSh"},
    "THB": {"name":"Thai Baht","symbol":"฿"},
    "TOP": {"name":"Tongan Pa'anga","symbol":"$"},
    "TTD": {"name":"Trinidad & Tobago Dollar","symbol":"$"},
    "TND": {"name":"Tunisian Dinar","symbol":"ت.د"},
    "TRY": {"name":"Turkish Lira","symbol":"₺"},
    "TMT": {"name":"Turkmenistani Manat","symbol":"T"},
    "UGX": {"name":"Ugandan Shilling","symbol":"USh"},
    "UAH": {"name":"Ukrainian Hryvnia","symbol":"₴"},
    "AED": {"name":"United Arab Emirates Dirham","symbol":"إ.د"},
    "UYU": {"name":"Uruguayan Peso","symbol":"$"},
    "USD": {"name":"US Dollar","symbol":"$"},
    "UZS": {"name":"Uzbekistan Som","symbol":"лв"},
    "VUV": {"name":"Vanuatu Vatu","symbol":"VT"},
    "VEF": {"name":"Venezuelan BolÃvar","symbol":"Bs"},
    "VND": {"name":"Vietnamese Dong","symbol":"₫"},
    "YER": {"name":"Yemeni Rial","symbol":"﷼"},
    "ZMK": {"name":"Zambian Kwacha","symbol":"ZK"}
};

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Checkout = (props) => {
    
    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [company, setCompany] = useState('')
    const [phone, setPhone] = useState('')
    const [currency, setCurrency] = useState('USD')
    // const [paymentPlaygrounds, setPaymentPlaygrounds] = useState({})
    const router = useRouter()

    let [cart, setCart] = useState([])

    const handleSubmit = e => {  
        e.preventDefault();
        const data = {
            email,
            firstName,
            lastName,
            company,
            phone,
            currency,
            cart
        }
        // TODO: Give to API
        axios.post('http://127.0.0.1:8000/postData', data).then(res => console.log(res))
        setCart([])
        localStorage.setItem('cart', JSON.stringify([]))
        router.push("/checkout/transaction");
        // props.history.push('/checkout/transaction')
        // navigate('/checkout/transaction');

    }

    const handleTotal = () => {  
        // Grab all inputs that start with ID 'comp'
        let inputs = document.querySelectorAll('[id^="amount"]');
    
        // Trying to loop through the values and get the sum of all inputs
        let totalVal=0
        for (var i = 0; i < inputs.length; i++) {
            totalVal += parseInt(inputs[i].value)
        }
        console.log(totalVal);
    
        //Trying to grab total values of all inputs and put in element 
        document.getElementById('totalAmount').innerHTML = totalVal;
    }



    const addCart = (item) => {
        //create a copy of our cart state, avoid overwritting existing state
        let cartCopy = [...cart];
        
        //assuming we have an ID field in our item
        let {id} = item;
        
        //look for item in cart array
        let existingItem = cartCopy.find(cartItem => cartItem.id == id);

        //if item already exists
        if (existingItem) {
            // existingItem.quantity += item.quantity //update item
            return
        }
        item.amount = 0
        cartCopy.push(item)
        
        //update app state
        setCart(cartCopy)
        
        //make cart a string and store in local space
        let stringCart = JSON.stringify(cartCopy);
        localStorage.setItem("cart", stringCart)
        
      }

    const editCart = (itemID, amount) => {
  
        let cartCopy = [...cart]
        
        //find if item exists, just in case
        let existentItem = cartCopy.find(item => item.id == itemID);
        
        //if it doesnt exist simply return
        if (!existentItem) return
        
        //continue and update quantity
        if ('amount' in existentItem) {
            existentItem.amount = amount;
        }
        
        //validate result
        // if (existentItem.quantity <= 0) {
        //   //remove item  by filtering it from cart array
        //   cartCopy = cartCopy.filter(item => item.ID != itemID)
        // }
        
        //again, update state and localState
        setCart(cartCopy);
        
        let cartString = JSON.stringify(cartCopy);
        localStorage.setItem('cart', cartString);
      }

    const removeCart = (itemID) => {
  
        //create cartCopy
        let cartCopy = [...cart]
        
        cartCopy = cartCopy.filter(item => item.id != itemID);
        
        //update state and local
        setCart(cartCopy);

        
        let cartString = JSON.stringify(cartCopy)
        localStorage.setItem('cart', cartString)

        handleTotal()
      }

     //this is called on component mount
        useEffect(() => {
            let localCart = typeof window !== 'undefined' ? localStorage.getItem('cart') : null

            if (!localCart){
                return
            }
            //turn it into js
            localCart = JSON.parse(localCart);
            //load persisted cart into state if it exists
            console.log(localCart)
            if (localCart) setCart(localCart)

            let totalVal=0
            for (var i = 0; i < localCart.length; i++) {
                totalVal += parseInt(localCart[i].amount)
            }
            console.log(totalVal);
        
            //Trying to grab total values of all inputs and put in element 
            document.getElementById('totalAmount').innerHTML = totalVal;
            
        }, []) //the empty array ensures useEffect only runs once

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
                    {/* Contact Info */}
                    <div>
                    <h2 className="text-lg font-medium text-gray-900">Contact information</h2>

                    <div className="mt-4">
                        <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                        Email address
                        </label>
                        <div className="mt-1">
                        <input
                            type="email"
                            id="email-address"
                            name="email-address"
                            autoComplete="email"
                            onChange={(e)=> setEmail(e.target.value)}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        </div>
                    </div>
                    </div>

                    {/* Donor Info */}
                    <div className="mt-10 border-t border-gray-200 pt-10">
                    <h2 className="text-lg font-medium text-gray-900">Donor information</h2>

                    <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                        <div>
                        <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                            First name
                        </label>
                        <div className="mt-1">
                            <input
                            type="text"
                            id="first-name"
                            name="first-name"
                            autoComplete="given-name"
                            onChange={(e)=> setFirstName(e.target.value)}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                        </div>

                        <div>
                        <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                            Last name
                        </label>
                        <div className="mt-1">
                            <input
                            type="text"
                            id="last-name"
                            name="last-name"
                            autoComplete="family-name"
                            onChange={(e)=> setLastName(e.target.value)}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                        </div>

                        <div className="sm:col-span-2">
                        <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                            Company
                        </label>
                        <div className="mt-1">
                            <input
                            type="text"
                            name="company"
                            id="company"
                            onChange={(e)=> setCompany(e.target.value)}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                        </div>

                        <div className="sm:col-span-2">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                            Phone
                        </label>
                        <div className="mt-1">
                            <input
                            type="text"
                            name="phone"
                            id="phone"
                            autoComplete="tel"
                            onChange={(e)=> setPhone(e.target.value)}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                        </div>
                    </div>
                    </div>

                    {/* Payment */}
                    <div className="mt-10 border-t border-gray-200 pt-10">
                    <h2 className="text-lg font-medium text-gray-900">Currency</h2>


                    <div className="mt-3 grid grid-cols-4 gap-y-6 gap-x-4">
                        <div className="col-span-4">
                        {/* <label htmlFor="card-number" className="block text-sm font-medium text-gray-700">
                            Currency
                        </label> */}
                        <div className="mt-1">
                              <select
                                    id="currency"
                                    name="currency"
                                    className="rounded-md border border-gray-300 text-left text-base font-medium text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                                    onChange={(e) =>setCurrency(e.target.value)}
                                >
                                    {currency_code.map((code)=> <option value={code}>{code}</option>)}
                                    
                                </select>
                        </div>
                        </div>

{/* 
                        <div className="col-span-4">
                        <label htmlFor="card-number" className="block text-sm font-medium text-gray-700">
                            Card number
                        </label>
                        <div className="mt-1">
                            <input
                            type="text"
                            id="card-number"
                            name="card-number"
                            autoComplete="cc-number"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                        </div>

                       

                        <div className="col-span-4">
                        <label htmlFor="name-on-card" className="block text-sm font-medium text-gray-700">
                            Name on card
                        </label>
                        <div className="mt-1">
                            <input
                            type="text"
                            id="name-on-card"
                            name="name-on-card"
                            autoComplete="cc-name"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                        </div>

                        <div className="col-span-3">
                        <label htmlFor="expiration-date" className="block text-sm font-medium text-gray-700">
                            Expiration date (MM/YY)
                        </label>
                        <div className="mt-1">
                            <input
                            type="text"
                            name="expiration-date"
                            id="expiration-date"
                            autoComplete="cc-exp"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                        </div>

                        <div>
                        <label htmlFor="cvc" className="block text-sm font-medium text-gray-700">
                            CVC
                        </label>
                        <div className="mt-1">
                            <input
                            type="text"
                            name="cvc"
                            id="cvc"
                            autoComplete="csc"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                        </div> */}
                    </div>
                    </div>
                </div>

                {/* Order summary */}
                <div className="mt-10 lg:mt-0">
                    <h2 className="text-lg font-medium text-gray-900">Payment</h2>

                    <div className="mt-1">
                        <select
                            id="addItem"
                            name="addItem"
                            className="rounded-md border border-gray-300 text-left text-base font-medium text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                            onChange={(e) => addCart(availablePlaygrounds.find(x => x.title == e.target.value))}
                        >
                            <option value="" selected disabled>Choose here</option>
                            {availablePlaygrounds.map((code)=> <option value={code.title}>{code.title}</option>)}
                            
                        </select>
                    </div>

                    <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
                    <h3 className="sr-only">Items in your cart</h3>
                    {/* Playgrounds */}
                    <ul role="list" className="divide-y divide-gray-200">

                        {cart.map((playground) => (
                        <li key={playground.id} className="flex py-6 px-4 sm:px-6">
                             <div className="flex-shrink-0">
                            <img src={playground.imageSrc} alt={playground.imageAlt} className="w-20 rounded-md" />
                            </div>

                            <div className="ml-6 flex flex-1 flex-col">
                            <div className="flex">
                                <div className="min-w-0 flex-1">
                                <h4 className="text-sm">
                                    <a href={playground.href} className="font-medium text-gray-700 hover:text-gray-800">
                                    {playground.title}
                                    </a>
                                </h4>
                                {/* <p className="mt-1 text-sm text-gray-500">{playground.desc}</p> */}
                                </div>

                                <div className="ml-4 flow-root flex-shrink-0">
                                <button
                                    type="button"
                                    className="-m-2.5 flex items-center justify-center bg-white p-2.5 text-gray-400 hover:text-gray-500"
                                >
                                    <span className="sr-only">Remove</span>
                                    <TrashIcon className="h-5 w-5" aria-hidden="true" onClick={(e) => removeCart(playground.id)}/>
                                </button>
                                </div>
                            </div>

                            <div>
                                <div className="relative mt-5 rounded-md shadow-sm">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <span className="text-gray-500 sm:text-sm">{currency_list[currency]['symbol']}</span>
                                    </div>
                                    <input
                                    type="number"
                                    name="amount"
                                    id={"amount" + playground.id}
                                    className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    placeholder="0.00"
                                    value = {playground.amount}
                                    aria-describedby="price-currency"
                                    onChange={(e) => {
                                        editCart(playground.id, e.target.value)
                                        handleTotal()
                                    }}
                                    />
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                    <span className="text-gray-500 sm:text-sm" id="price-currency">
                                    {currency_list[currency]['symbol']}
                                    </span>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </li>
                        ))}

                    </ul>
                    <dl className="space-y-6 border-t border-gray-200 py-6 px-4 sm:px-6">
                        {/* <div className="flex items-center justify-between">
                        <dt className="text-sm">Subtotal</dt>
                        <dd className="text-sm font-medium text-gray-900">{currency_list[currency]['symbol']} 64.00</dd>
                        </div>
                        <div className="flex items-center justify-between">
                        <dt className="text-sm">Shipping</dt>
                        <dd className="text-sm font-medium text-gray-900">{currency_list[currency]['symbol']} 5.00</dd>
                        </div>
                        <div className="flex items-center justify-between">
                        <dt className="text-sm">Taxes</dt>
                        <dd className="text-sm font-medium text-gray-900">{currency_list[currency]['symbol']} 5.52</dd>
                        </div> */}
                        {/* <div className="flex items-center justify-between border-t border-gray-200 pt-6"> */}
                        <div className="flex items-center justify-between border-gray-200">
                        <dt className="text-base font-medium">Total</dt>
                        <dd className="text-base font-medium text-gray-900" >{currency_list[currency]['symbol']} <span id="totalAmount">0</span></dd>
                        </div>
                    </dl>

                    <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                        <button
                        onClick={handleSubmit}
                        className="w-full rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                        >
                        Donate
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