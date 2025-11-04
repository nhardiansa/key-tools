"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"

type RatingValue = 1 | 2 | 3 | 4

const emojis = ["😢", "😐", "😊", "😍"]
const emojiLabels = ["Very Bad", "Okay", "Good", "Excellent"]

export default function FeedbackForm() {
  const [frontPageRating, setFrontPageRating] = useState<RatingValue | null>(null)
  const [productRating, setProductRating] = useState<RatingValue | null>(null)
  const [serviceRating, setServiceRating] = useState<RatingValue | null>(null)
  const [additionalFeedback, setAdditionalFeedback] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log({
      frontPageRating,
      productRating,
      serviceRating,
      additionalFeedback,
    })
    setIsSubmitted(true)
    // Reset form after 2 seconds
    setTimeout(() => {
      setFrontPageRating(null)
      setProductRating(null)
      setServiceRating(null)
      setAdditionalFeedback("")
      setIsSubmitted(false)
    }, 2000)
  }

  const RatingQuestion = ({
    question,
    value,
    onChange,
    isOptional = false,
  }: {
    question: string
    value: RatingValue | null
    onChange: (val: RatingValue) => void
    isOptional?: boolean
  }) => (
    <div className="mb-8">
      <p className="text-sm font-medium text-foreground mb-4">
        {question} <span className="text-muted-foreground">
          {isOptional && "(Opsional)"}
        </span>
      </p>
      <div className="flex gap-4">
        {emojis.map((emoji, index) => {
          const rating = (index + 1) as RatingValue
          return (
            <button
              key={index}
              onClick={() => onChange(rating)}
              className={`text-5xl transition-transform duration-200 hover:cursor-pointer ${value === rating ? "scale-125" : "hover:scale-110"
                }`}
              title={emojiLabels[index]}
              type="button"
            >
              {emoji}
            </button>
          )
        })}
      </div>
    </div>
  )

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 font-jakarta">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-8 relative">

        {/* Title and subtitle */}
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Berikan Kami Feedback Mu!
        </h1>
        <p className="text-sm text-muted-foreground mb-8">
          Feedback dari kamu untuk KEY sangat berarti bagi kami agar bisa terus memberikan pengalaman yang lebih baik kedepannya. Terima kasih banyak atas partisipasinya! 😊😊
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <RatingQuestion
            question="Bagaimana pengalamanmu selama mengikuti kelas ini?"
            value={frontPageRating}
            onChange={setFrontPageRating}
          />

          <RatingQuestion
            question="Apakah hangout membuatmu lebih dekat dengan orang lain?"
            value={productRating}
            onChange={setProductRating}
          />

          <RatingQuestion
            question="Bagaimana pendampingan kelompokmu selama kegiatan berlangsung?"
            value={serviceRating}
            onChange={setServiceRating}
          />

          <RatingQuestion
            question="Bagaimana menurutmu jika kelas ini diadakan lagi nanti?"
            value={serviceRating}
            onChange={setServiceRating}
          />

          {/* Text area */}
          <div className="mb-8">
            <label className="text-sm font-medium text-foreground mb-3 block">
              Hal yang paling berkesan atau ingin kamu sampaikan untuk kelas ini <span className="text-muted-foreground">(Optional)</span>
            </label>
            <textarea
              value={additionalFeedback}
              onChange={(e) => setAdditionalFeedback(e.target.value)}
              placeholder="Bagi saya kelas ini..."
              className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-0 resize-none bg-white text-foreground"
              rows={5}
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            {/* <Button type="button" variant="outline" className="px-6 bg-transparent">
              Go back
            </Button> */}
            <Button type="submit" className="px-6 bg-purple-600 hover:bg-purple-700 text-white cursor-pointer">
              {isSubmitted ? "Thank you!" : "Kirim Feedback"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
