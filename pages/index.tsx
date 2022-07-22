import { NextPage } from "next"
import { FormEvent, useState } from "react"
import { SearchResults } from "../components/SearchResults"

type ProductsProps = {
    id: number
    price: number
    priceFormatted: string
    title: string
}

type Results = {
  data: ProductsProps[]
  totalPrice: number
}

const Home: NextPage = () => {
  const [search, setSearch] = useState('')
  const [results, setResults] = useState<Results>({ data: [], totalPrice: 0 } as Results)

  async function handleSearch(event: FormEvent){
    event.preventDefault()

    if(!search.trim()) return

    const response = await fetch(`http://localhost:3333/products?q=${search}`)
    const data = await response.json() as Array<ProductsProps>

    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })

    const totalPrice = data.reduce((total, product) => total + product.price, 0)
    const products = data.map(product => ({
      id: product.id,
      title: product.title,
      price: product.price,
      priceFormatted: formatter.format(product.price)
    }))

    setResults({ totalPrice, data: products })
  }

  async function addToWishList(id: number) {
    console.log(id)
  }

  return (
    <div>
      <h1>Search</h1>
      <form onSubmit={handleSearch}>
        <input type="text" value={search} onChange={e => setSearch(e.target.value)}/>
      </form>
      <SearchResults results={results.data} totalPrice={results?.totalPrice} onAddToWishList={addToWishList} />
    </div>
  )
}

export default Home
