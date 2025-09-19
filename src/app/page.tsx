import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await authClient.getSession({
    fetchOptions: { headers: await headers() },
  });

  if (session?.data?.user) {
    redirect("/notes");
  }

  return (
    <div className="min-h-dvh w-full">
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="/logo.jpg"
              alt="Logo"
              width={28}
              height={28}
              className="dark:invert grayscale"
            />
            <span className="font-semibold tracking-tight">
              Smart Research Assistant
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="#features" className="hover:text-foreground">
              Features
            </Link>
            <Link href="#how-it-works" className="hover:text-foreground">
              How it works
            </Link>
            <Link href="#faq" className="hover:text-foreground">
              FAQ
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost">
              <Link href="/sign-in">Sign in</Link>
            </Button>
            <Button asChild>
              <Link href="/sign-up">Get started</Link>
            </Button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10 opacity-20 [mask-image:radial-gradient(60%_60%_at_50%_0%,black,transparent_80%)]">
            <Image
              src="/globe.svg"
              alt=""
              fill
              className="object-cover dark:invert grayscale"
            />
          </div>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
            <div className="grid items-center gap-10 md:grid-cols-2">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-muted-foreground">
                  New • Chat with papers, extract key insights
                </div>
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight">
                  Research smarter. Not harder.
                </h1>
                <p className="text-base sm:text-lg text-muted-foreground max-w-prose">
                  Upload PDFs, ask questions in natural language, and turn dense
                  papers into clear answers. Capture notes and build knowledge
                  faster.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button asChild size="lg">
                    <Link href="/sign-up">Start free</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link href="#demo">See a demo</Link>
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  No credit card required.
                </p>
              </div>
              <div className="relative aspect-[16/10] rounded-xl border bg-card/50 shadow-sm overflow-hidden">
                <Image
                  unoptimized
                  src="https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,format=auto,onerror=redirect,quality=80/uploads/asset/file/b8abf56d-53c8-4c44-b016-9a59f0c5d59a/how-to-easily-build-a-smart-research-ai-agent-with-langgraph.jpg?t=1721634333"
                  alt="Product preview"
                  fill
                  className="object-contain p-6 dark:invert grayscale"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="border-t">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight">
                Everything you need to go from paper to insight
              </h2>
              <p className="mt-3 text-muted-foreground">
                Designed for students, researchers, and teams working with
                technical literature.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Feature icon="/file.svg" title="Upload & parse">
                Drag-and-drop PDFs or docs. We extract text, tables, and
                references reliably.
              </Feature>
              <Feature icon="/globe.svg" title="Ask anything">
                Query the paper conversationally. Get citations and
                section-aware answers.
              </Feature>
              <Feature icon="/next.svg" title="Summaries & highlights">
                Auto-generate abstracts, key points, and highlight novel
                contributions.
              </Feature>
              <Feature icon="/window.svg" title="Notebook notes">
                Capture notes alongside passages. Your insights stay linked to
                the source.
              </Feature>
              <Feature icon="/vercel.svg" title="Team spaces">
                Share threads, tag topics, and keep everyone aligned across
                papers.
              </Feature>
              <Feature icon="/file.svg" title="Export & cite">
                Export answers and notes to Markdown, Notion, or BibTeX-ready
                references.
              </Feature>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="border-t">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <div className="grid gap-10 md:grid-cols-3">
              <Step step="1" title="Upload documents">
                Add one or many PDFs. We handle long papers and scanned copies.
              </Step>
              <Step step="2" title="Chat and explore">
                Ask targeted questions. Navigate sections, figures, and
                references.
              </Step>
              <Step step="3" title="Capture insights">
                Save notes and create summaries you can share with your team.
              </Step>
            </div>
            <div className="mt-10 flex justify-center">
              <Button asChild size="lg">
                <Link href="/sign-up">Try it now</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA banner */}
        <section id="demo" className="border-t">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <div className="relative isolate overflow-hidden rounded-2xl border bg-card p-8 sm:p-10">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-xl sm:text-2xl font-semibold tracking-tight">
                    Accelerate your next literature review
                  </h3>
                  <p className="mt-2 text-muted-foreground">
                    Start free, upgrade when you need more docs and team
                    features.
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button asChild size="lg">
                    <Link href="/sign-up">Get started</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link href="/sign-in">Sign in</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Smart Research Assistant</p>
          <div className="flex items-center gap-4">
            <Link href="#">Privacy</Link>
            <Link href="#">Terms</Link>
            <Link href="#faq">FAQ</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Feature({
  icon,
  title,
  children,
}: {
  icon: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border p-6 bg-card/50">
      <div className="flex items-center gap-3">
        <Image
          src={icon}
          alt=""
          width={20}
          height={20}
          className="dark:invert grayscale"
        />
        <h3 className="font-medium">{title}</h3>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">{children}</p>
    </div>
  );
}

function Step({
  step,
  title,
  children,
}: {
  step: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border p-6 bg-card/50">
      <div className="text-xs text-muted-foreground">Step {step}</div>
      <h3 className="mt-1 font-medium">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{children}</p>
    </div>
  );
}
