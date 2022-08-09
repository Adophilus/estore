import { useEffect, useState } from 'preact/hooks'

export function useFavourites({ pocketBaseClient }) {
  const [init, setInit] = useState()
  const [favourites, setFavourites] = useState([])

  const loadFavourites = async () => {
    setFavourites(await pocketBaseClient.Records.getFullList('favourites', 100))
  }

  useEffect(() => {
    loadFavourites()
  }, [])

  return {
    async addProduct(product) {
      if (this.hasProduct(product)) return

      const favourite = await pocketBaseClient.Records.create('favourites', {
        product: product.id,
        owner: pocketBaseClient.AuthStore.model.profile.id
      })
      setFavourites([...favourites, favourite])
    },
    async removeProduct(product) {
      const favourite = this.hasProduct(product)

      if (!favourite) return

      await pocketBaseClient.Records.delete('favourites', favourite.id)
      setFavourites(favourites.filter((_favourite) => _favourite !== favourite))
    },
    hasProduct(product) {
      return favourites.filter(
        (_favourite) => _favourite.product === product.id
      )[0]
    }
  }
}
