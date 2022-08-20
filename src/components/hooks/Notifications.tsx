import { useEffect } from 'preact/hooks'

export function useNotifications({ pocketBaseClient }) {
  const checkNotifications = async () => {
    let previousSale
    if (!localStorage.get('previousSale'))
      previousSale = { id: 0, starting: 0, duration: 0 }
    else previousSale = JSON.parse(localStorage.get('previousSale'))

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
      localStorage.set('previousSale', JSON.stringify(latestSale))
      new Notification(latestSale.title, {
        body: latestSale.content,
        renotify: true,
        requireInteraction: true,
        vibrate: [200, 100, 200]
      })
    }
  }

  useEffect(() => {
    // watch the 'sales' table for changes and then trigger checkNotifications
    pocketBaseClient.realtime.subscribe('sales', (e) => {
      if (e.action === 'create' || e.action === 'update') checkNotifications()
    })
    checkNotifications()
    return () => {
      pocketBaseClient.realtime.unsubscribe('sales')
    }
  }, [])

  return {
    async requestPermission() {
      if (Notification.permission !== 'granted') {
        const permission = await Notification.requestPermission()
        if (permission === 'denied')
          alert(
            "Notifications disabled! You won't get updates on upcoming sales"
          )
      }
    }
  }
}
