import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="container py-12">
      {/* Hero section */}
      <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden mb-12">
        <Image src="/placeholder.svg?height=400&width=1200" alt="About FashionHub" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center p-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">About FashionHub</h1>
          <p className="text-white/90 max-w-2xl">
            Your ultimate destination for fashion. We bring you the latest trends and styles from around the world.
          </p>
        </div>
      </div>

      {/* Our Story */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-2xl font-bold mb-4">Our Story</h2>
          <p className="text-muted-foreground mb-4">
            Founded in 2015, FashionHub began with a simple mission: to make quality fashion accessible to everyone.
            What started as a small boutique in New York has grown into a global online destination for fashion
            enthusiasts.
          </p>
          <p className="text-muted-foreground mb-4">
            Our journey has been driven by our passion for style and our commitment to customer satisfaction. We believe
            that fashion is not just about clothes; it's about self-expression, confidence, and feeling good in what you
            wear.
          </p>
          <p className="text-muted-foreground">
            Today, we serve customers worldwide, offering a curated selection of the latest trends, timeless classics,
            and unique pieces that help you express your individual style.
          </p>
        </div>
        <div className="relative h-[300px] rounded-lg overflow-hidden">
          <Image src="/placeholder.svg?height=300&width=500" alt="Our Story" fill className="object-cover" />
        </div>
      </div>

      {/* Our Values */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Our Values</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="bg-primary/10 w-12 h-12 flex items-center justify-center rounded-full mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Quality</h3>
            <p className="text-muted-foreground">
              We are committed to offering products of the highest quality. Each item in our collection is carefully
              selected to ensure durability, comfort, and style.
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="bg-primary/10 w-12 h-12 flex items-center justify-center rounded-full mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <path d="m15 9-6 6"></path>
                <path d="m9 9 6 6"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Sustainability</h3>
            <p className="text-muted-foreground">
              We believe in fashion that doesn't cost the earth. We're continuously working to reduce our environmental
              impact and promote sustainable practices.
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="bg-primary/10 w-12 h-12 flex items-center justify-center rounded-full mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Inclusivity</h3>
            <p className="text-muted-foreground">
              Fashion is for everyone. We celebrate diversity and strive to offer styles that cater to different tastes,
              sizes, and preferences.
            </p>
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Meet Our Team</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((member) => (
            <div key={member} className="text-center">
              <div className="relative h-[200px] rounded-lg overflow-hidden mb-4">
                <Image
                  src={`/placeholder.svg?height=200&width=200&text=Team Member ${member}`}
                  alt={`Team Member ${member}`}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-semibold">Team Member {member}</h3>
              <p className="text-sm text-muted-foreground">Position</p>
            </div>
          ))}
        </div>
      </div>

      {/* Join Us CTA */}
      <div className="bg-primary/10 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Join the FashionHub Community</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Be the first to know about new arrivals, exclusive offers, and fashion tips. Join our community of fashion
          enthusiasts.
        </p>
        <Button asChild size="lg">
          <Link href="/shop">Shop Now</Link>
        </Button>
      </div>
    </div>
  )
}
