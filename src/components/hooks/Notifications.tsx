import { useEffect, useState } from 'preact/hooks'

export function useNotifications({ pocketBaseClient }) {
  const [hasPermission, setHasPermission] = useState(
    Notification.permission === 'granted'
  )

  const checkNotifications = async () => {
    let previousSale
    if (!localStorage.getItem('previousSale'))
      previousSale = { id: 0, starting: 0, duration: 0 }
    else previousSale = JSON.parse(localStorage.getItem('previousSale'))

    const latestSale = (
      await pocketBaseClient.Records.getList('sales', 1, 1, {
        sort: '-starting'
      })
    ).items[0]

    if (!latestSale) return

    if (
      latestSale.id !== previousSale.id &&
      Date.now() >= latestSale.starting &&
      Date.now() <= latestSale.starting + latestSale.duration
    ) {
      localStorage.setItem('previousSale', JSON.stringify(latestSale))
      new Notification(latestSale.title, {
        body: latestSale.content,
        renotify: true,
        tag: 'renotify',
        icon: `${window.location.origin}/favicon.ico`,
        requireInteraction: true,
        vibrate: [200, 100, 200]
      })
    }
  }

  useEffect(() => {
    // watch the 'sales' table for changes and then trigger checkNotifications
    pocketBaseClient.realtime.subscribe('sales', (e) => {
      console.log(e)
      if (e.action === 'create' || e.action === 'update') checkNotifications()
    })
    checkNotifications()
    return () => {
      pocketBaseClient.realtime.unsubscribe('sales')
    }
  }, [])

  return {
    hasPermission,
    async requestPermission() {
      if (Notification.permission !== 'granted') {
        const permission = await Notification.requestPermission()
        if (permission === 'denied')
          alert(
            "Notifications disabled! You won't get updates on upcoming sales"
          )
        else setHasPermission(true)
      }
    }
  }
}
