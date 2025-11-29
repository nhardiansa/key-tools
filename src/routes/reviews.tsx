import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
import { Search, Star } from "lucide-react"
import { useEffect, useState } from 'react'
import { COLECTION_ID, type FeedbackData } from '@/components/custom/feedback-form'
import { db } from '@/lib/firebase'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
// import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'

export const Route = createFileRoute('/reviews')({
  component: RouteComponent,
})

type FeedbackResponse = FeedbackData & { id: string }

function RouteComponent() {

  // Fetch feedbacks from Firestore with id
  const [feedbacks, setFeedbacks] = useState<Array<FeedbackResponse>>([]);

  // Filter and Sort states
  // const [sortBy, setSortBy] = useState<"recent" | "oldest" | "rating-high" | "rating-low">("recent")
  const [searchQuery, setSearchQuery] = useState("")
  // const [selectedRating, setSelectedRating] = useState<number | null>(null)

  const getFeedbacks = async () => {

    const q = query(collection(db, COLECTION_ID), orderBy("createdAt"));
    const snapshot = await getDocs(q);

    const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as FeedbackData) } as FeedbackResponse));

    setFeedbacks(docs);
  };

  const searchFeedbacks = (query: string) => {
    return feedbacks.filter((feedback) =>
      feedback.title?.toLowerCase().includes(query.toLowerCase()) ||
      feedback.additionalFeedback?.toLowerCase().includes(query.toLowerCase())
    );
  }

  useEffect(() => {
    getFeedbacks();
  }, []);

  useEffect(() => {

    if (searchQuery) {
      const results = searchFeedbacks(searchQuery);
      setFeedbacks(results);
    } else {
      getFeedbacks();
    }

  }, [searchQuery]);

  return (
    <main className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Feedback KEY 8
              </h1>
            </div>
          </div>
        </div>

        {/*  */}
        <div className="bg-white rounded-lg p-4 shadow-sm mb-6 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search reviews..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Filter and Sort Row */}
          <div className="flex gap-3 flex-wrap">
            {/* Rating Filter */}
            {/* <div className="flex items-center gap-2">
              <Filter size={18} className="text-gray-600" />
              <select
                value={selectedRating ?? ""}
                onChange={(e) => setSelectedRating(e.target.value ? Number.parseInt(e.target.value) : null)}
                className="px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="">All Ratings</option>
                <option value="5">⭐⭐⭐⭐⭐ 5 Bintang</option>
                <option value="4">⭐⭐⭐⭐ 4 Bintang</option>
                <option value="3">⭐⭐⭐ 3 Bintang</option>
                <option value="2">⭐⭐ 2 Bintang</option>
                <option value="1">⭐ 1 Star</option>
              </select>
            </div> */}

            {/* Sort */}
            {/* <div className="flex items-center gap-2">
              <ArrowUpDown size={18} className="text-gray-600" />

              <Select onValueChange={value => setSortBy(value as "recent" | "oldest" | "rating-high" | "rating-low")}>
                <SelectTrigger className='min-w-[150px]'>
                  <SelectValue placeholder="Sortir" defaultValue={sortBy} />
                </SelectTrigger>
                <SelectContent className='test'>
                  <SelectGroup>
                    <SelectLabel>Sortir berdasarkan</SelectLabel>
                    <SelectItem value="recent">Terbaru</SelectItem>
                    <SelectItem value="oldest">Terlama</SelectItem>
                    <SelectItem value="rating-high">Rating Tertinggi</SelectItem>
                    <SelectItem value="rating-low">Rating Terendah</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div> */}
          </div>

          {/* Results count */}
          {/* <p className="text-sm text-gray-600">
            Showing 3 of 3 reviews
          </p> */}
        </div>

        {/* Reviews Section */}
        <div className="space-y-4">
          {feedbacks.map((review, index) => (
            <FeedbackCard
              key={review.id || index}
              feedback={review}
            />
          ))}
        </div>
      </div>
    </main>
  )
}

function FeedbackCard({ feedback }: { feedback: FeedbackData }) {

  // show full content when "show more" is clicked
  const [showFullText, setShowFullText] = useState(false);

  const getDisplayedText = () => {
    if (!feedback.additionalFeedback) {
      return "Tidak ada feedback tambahan.";
    }

    if (showFullText) {
      return feedback.additionalFeedback;
    }

    const truncatedText = feedback.additionalFeedback.slice(0, 250);
    const ellipsis = feedback.additionalFeedback.length > 20 ? '...' : '';
    return truncatedText + ellipsis;
  };

  const displayedText = getDisplayedText();

  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="">
        {/* <h3 className="font-semibold text-gray-900 mb-2">{feedback.title}</h3> */}
        <h3 className="font-semibold text-gray-900 mb-2">
          {feedback.title || "Tanpa Judul"}
        </h3>
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-600">by Anonymous</p>
          <StarRating rating={averageRating([feedback.experienceRating || 0, feedback.hangoutRating || 0, feedback.mentorshipRating || 0, feedback.futureClassRating || 0])} />
        </div>
        <p className="text-sm text-gray-700 leading-relaxed mb-3">
          {
            feedback.additionalFeedback ? (
              displayedText
            ) : (
              <span className="text-gray-400 italic">
                {displayedText}
              </span>
            )
          }
        </p>
        {
          feedback.additionalFeedback && feedback.additionalFeedback.length > 250 && (

            <button onClick={() => setShowFullText(!showFullText)} className="text-blue-600 text-sm font-medium cursor-pointer hover:underline">
              {showFullText ? 'Show Less' : 'Show More'}
            </button>
          )
        }
      </CardContent>
    </Card>
  )
}

function StarRating({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: max }).map((_, i) => (
        <Star key={i} size={16} className={i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} />
      ))}
    </div>
  )
}

function averageRating(ratings: number[]) {

  // convert to scale of 1-4 to 0-1
  const total: number[] = ratings.map(rating => {
    if (rating === 1) return 0;
    if (rating === 2) return 0.33;
    if (rating === 3) return 0.66;
    if (rating === 4) return 1;
    return 0;
  });

  // calculate average
  const sum = total.reduce((acc, curr) => acc + curr, 0);
  const avg = sum / ratings.length;

  // convert back to scale of 1-5
  const result = avg * 5;

  return Math.round(result);
}
