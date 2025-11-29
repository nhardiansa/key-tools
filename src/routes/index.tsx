import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className='flex flex-col items-center justify-center h-screen gap-4'>
      <h1 className='font-bold text-3xl'>
        Hayo lo mau ngapain ke sini?
      </h1>

      {/* It wil show just in development mode */}

      {import.meta.env.DEV && (

        <div className="links flex flex-col gap-2 text-blue-600 underline align-center text-center">
          <Link to="/reviews">
            Reviews Page
          </Link>

          <Link to="/feedback">
            KEY 8 Feedback Form
          </Link>
        </div>
      )}

    </div>
  )
}
