import { useMemo } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { parse } from 'rss-to-json'
import Image from 'next/future/image'

import { useAudioPlayer } from '@/components/AudioProvider'
import { Container } from '@/components/Container'
import { FormattedDate } from '@/components/FormattedDate'
import playground1Img from '@/images/playground1.jpeg'


const availablePlaygrounds = [
  {
      "id": "1b09c89c-8cdb-4a94-ab9e-ecaa9903d2f8",
      "title": "IT Equipment",
      "desc": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      "amount": 3000,
      "target": 8000,
      "imgSrc": "https://media.istockphoto.com/photos/african-children-using-a-laptop-inside-classroom-kenya-picture-id610137520?k=20&m=610137520&s=612x612&w=0&h=UjLF6BAfY7qktWhJvApZkIUyh0-5rfb-gLtVVCQilkA=",
      "percentage": "40%",
  },
  {
      "id": "d5216217-d370-4410-aca7-e07607e2d483",
      "title": "Building Playgrounds",
      "desc": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      "amount": 6000,
      "target": 9000,
      "imgSrc": "https://media.istockphoto.com/photos/african-children-soccer-feet-at-sunset-picture-id824273054?k=20&m=824273054&s=612x612&w=0&h=vaM4l5u0b0JoA6XMGnvy9sj0L_cy5Wl2sFJ70JdIynY=",
      "percentage": "60%",
  },
  {
      "id": "3fdd1243-bfcb-4cc8-99e0-6caf48445ca5",
      "title": "Toilet Reparation",
      "desc": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      "amount": 2000,
      "target": 3000,
      "imgSrc": "https://media.istockphoto.com/photos/latrine-in-the-savannah-masai-mara-kenya-picture-id1309376236?k=20&m=1309376236&s=612x612&w=0&h=qdtt7KGyhCPxa5oYJ8LM3iNuuH4Igna8wfsZW9uITZ4=",
      "percentage": "70%",
  },
  {
      "id": "265ef33e-7514-4396-be3c-1ba8b99f557f",
      "title": "Class Equipments",
      "desc": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      "amount": 2000,
      "target": 2000,
      "imgSrc": "https://media.istockphoto.com/photos/empty-classroom-picture-id1340516763?k=20&m=1340516763&s=612x612&w=0&h=22l9AkZsQUpraGocsAKcTPJLVGie4EIKbgXGuHgFfo8=",
      "percentage": "100%",
  },
  {
      "id": "b6348678-5a89-453c-89fe-37e2bcd234c4",
      "title": "Roof Maintenances",
      "desc": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      "amount": 4500,
      "target": 4500,
      "imgSrc": "https://images.unsplash.com/photo-1611843513285-53451152bc9f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHJvb2YlMjBicm9rZW58ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
  }
// More products...
]

function PlaygroundEntry({ playground }) {
  let date = new Date(playground.published)

  // let audioPlayerData = useMemo(
  //   () => ({
  //     title: playground.title,
  //     audio: {
  //       src: episode.audio.src,
  //       type: episode.audio.type,
  //     },
  //     link: `/${episode.id}`,
  //   }),
  //   [episode]
  // )
  // let player = useAudioPlayer(audioPlayerData)

  return (
    <article
      aria-labelledby={`playground-${playground.id}-title`}
      className="py-10 sm:py-12"
    >
      <Container>
      <div href="#" class="flex flex-col items-center md:flex-row md:max-w-xl ">
          {/* <img class="object-cover w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={playground1Img} alt=""/> */}
          
         
          
          <div className="flex flex-col items-start">
           
          
          {/* <FormattedDate
            date={date}
            className="order-first font-mono text-sm leading-7 text-slate-500"
          /> */}
          <div href="#" class="flex flex-col items-center md:flex-row md:max-w-xl mt-2">
          <div>

          <h2
            id={`playground-${playground.id}-title`}
            className="mt-2 text-lg font-bold text-slate-900"
            >
            <Link href={`/${playground.id}`}>{playground.title}</Link>
          </h2>
          <p className="text-base leading-7 text-slate-700">
            {playground.desc}
          </p>
          </div>
           <Link
            href="/"
            className="relative mr-auto block w-44 overflow-hidden  bg-slate-200 shadow-xl shadow-slate-200 sm:w-36 lg:w-72  rounded-md mt-3 lg:mt-0"
            aria-label="Homepage"
          >
            <img
              // className="w-full"
              src={playground.imgSrc}
              alt=""
              sizes="(min-width: 1024px) 20rem, (min-width: 640px) 16rem, 12rem"
              priority
            />
            <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-black/10 sm:rounded-xl lg:rounded-2xl" />
          </Link>

          {/* <Link
            href="/"
            className="relative mx-auto block w-48 overflow-hidden rounded-lg bg-slate-200 shadow-xl shadow-slate-200 sm:w-64 sm:rounded-xl lg:w-auto lg:rounded-2xl"
            aria-label="Homepage"
          >
            <Image
              className="w-full"
              src={posterImage}
              alt=""
              sizes="(min-width: 1024px) 20rem, (min-width: 640px) 16rem, 12rem"
              priority
            />
          </Link> */}
         

          </div>
          <div class="w-full bg-gray-200 rounded-full h-1.5 mt-4 dark:bg-gray-700">
            <div class="bg-blue-600 h-1.5 rounded-full dark:bg-blue-500" style={{width: playground.percentage}}></div>
          </div>
          <p className="mt-1 text-sm leading-7 text-slate-700">
            <span className="font-extrabold text-lg">£{playground.amount}</span> is raised from <span className="font-bold">£{playground.target} </span> Goals
          </p>
          <div className="mt-4 flex items-center gap-4">
            <Link
              href={`/${playground.id}`}
              className="flex items-center text-sm font-bold leading-6 text-pink-500 hover:text-pink-700 active:text-pink-900"
              aria-label={`Show notes for playground ${playground.title}`}
            >
              See Details
            </Link>
          </div>
        </div>
      </div>

      

        {/* <div className="flex flex-col items-start">
          <h2
            id={`playground-${playground.id}-title`}
            className="mt-2 text-lg font-bold text-slate-900"
          >
            <Link href={`/${playground.id}`}>{playground.title}</Link>
          </h2>
          <p className="mt-1 text-base leading-7 text-slate-700">
            {playground.desc}
          </p>
          <div class="w-full bg-gray-200 rounded-full h-1.5 mt-4 dark:bg-gray-700">
            <div class="bg-blue-600 h-1.5 rounded-full dark:bg-blue-500" style={{width: '45%'}}></div>
          </div>
          <p className="mt-1 text-sm leading-7 text-slate-700">
            <span className="font-extrabold text-lg">£{playground.currentDonation}</span> is raised from <span className="font-bold">£{playground.targetDonation} </span> Goals
          </p>
          <div className="mt-4 flex items-center gap-4">
            <Link
              href={`/${playground.id}`}
              className="flex items-center text-sm font-bold leading-6 text-pink-500 hover:text-pink-700 active:text-pink-900"
              aria-label={`Show notes for playground ${playground.title}`}
            >
              See Details
            </Link>
          </div>
        </div> */}
      </Container>
    </article>
  )
}

export default function Home({ playgrounds }) {
  return (
    <>
      <Head>
        <title>
          Their Side - Conversations with the most tragically misunderstood
          people of our time
        </title>
        <meta
          name="description"
          content="Conversations with the most tragically misunderstood people of our time."
        />
      </Head>
      <div className="pt-16 pb-12 sm:pb-4 lg:pt-12">
        <Container>
          <h1 className="text-2xl font-bold leading-7 text-slate-900">
            Your Donations
          </h1>
        </Container>
        <div className="divide-y divide-slate-100 sm:mt-4 lg:mt-8 lg:border-t lg:border-slate-100">
          {availablePlaygrounds.map((playground) => (
            <PlaygroundEntry key={playground.id} playground={playground} />
          ))}
        </div>
      </div>
    </>
  )
}

export async function getStaticProps() {
  let feed = await parse('https://their-side-feed.vercel.app/api/feed')

  return {
    props: {
      episodes: feed.items.map(
        ({ id, title, description, enclosures, published }) => ({
          id,
          title: `${id}: ${title}`,
          published,
          description,
          audio: enclosures.map((enclosure) => ({
            src: enclosure.url,
            type: enclosure.type,
          }))[0],
        })
      ),
    },
    revalidate: 10,
  }
}
