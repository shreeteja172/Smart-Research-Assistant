import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search, Brain, Zap, Shield } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Brain className="w-8 h-8 text-black dark:text-white" />
              <span className="text-2xl font-bold text-black dark:text-white">
                ResearchAI
              </span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="#features"
                className="text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
              >
                Features
              </Link>
              <Link
                href="#how-it-works"
                className="text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
              >
                How it Works
              </Link>
              <Link
                href="#pricing"
                className="text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
              >
                Pricing
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Link href="/sign-in">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/sign-up">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold text-black dark:text-white mb-6">
              Your Smart Research Agent
            </h1>
            <p className="text-xl md:text-2xl text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
              Transform documents into intelligent insights. Upload, analyze,
              and chat with your research papers using advanced AI technology.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/sign-up">
              <Button size="lg" className="w-full sm:w-auto px-8 py-4 text-lg">
                <Zap className="w-5 h-5 mr-2" />
                Start Researching Now
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto px-8 py-4 text-lg"
            >
              <Search className="w-5 h-5 mr-2" />
              Watch Demo
            </Button>
          </div>

          {/* Feature Highlights */}
        </div>
      </main>
    </div>
  );
}
