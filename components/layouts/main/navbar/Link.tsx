import Link from 'next/link'
import { useRouter } from 'next/router'

export default ({ to, children }) => {
  const router = useRouter()

  let className = 'nav-link py-4 relative'

  if (router.pathname === to) {
    className += ' active'
  }

  return (
    <div className={className}>
      <Link href={to}>
        <a>{children}</a>
      </Link>
      <span className="nav-link-indicator duration-100 absolute bg-indigo-500 bottom-0 left-0 w-0 h-[3px]"></span>
    </div>
  )
}
