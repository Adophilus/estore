import AppContext from '../../contexts/App'
import { useContext } from 'preact/hooks'
import '../../assets/notification-widget.css'

export default function () {
  const { notifications } = useContext(AppContext)
  if (!notifications.hasPermission)
	return (<button onClick={() => notifications.requestPermission()} className="notification__widget">
  <i className="fa fa-bell" ariaHidden="true"></i>
</button>)
}