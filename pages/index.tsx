import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import MainLayout from '../components/layouts/main/Layout'
import { Store } from '../types/Store'

const Home: NextPage = ({ store }: { store: Store }) => {
  return (
    <MainLayout store={store}>
      <div className="flex min-h-screen flex-col items-center justify-center py-2">
        <Head>
          <title>Estore</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
          <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full">
            <h1 className="text-3xl font-bold">Estore</h1>
          </div>
        </main>
      </div>
    </MainLayout>
  )
}

export default Home
