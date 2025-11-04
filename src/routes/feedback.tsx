import FeedbackForm from '@/components/custom/feedback-form'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/feedback')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className='feedback-page-container'>
      <FeedbackForm />
    </div>
  )
}
