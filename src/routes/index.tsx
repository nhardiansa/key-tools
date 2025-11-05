import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className='flex flex-col items-center justify-center h-screen gap-4'>
      <h1 className='font-bold text-3xl'>
        Hayo lo mau ngapain ke sini?
      </h1>
    </div>)
}
