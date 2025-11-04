import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (<div>
    Go to <Link to="/feedback">Feedback</Link>
  </div>)
}
