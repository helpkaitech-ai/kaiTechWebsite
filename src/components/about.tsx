export default function About() {
  return (
    <section id="about" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-3xl font-semibold">About kAItech</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-surface/60 p-6 text-muted">
            kAItech is a gateway for everyone to learn and use AI — whether or not you have a technical background. We focus on inclusive, practical, hands-on guidance so you can apply AI across daily life and work.
          </div>
          <div className="rounded-2xl border border-white/10 bg-surface/60 p-6 text-muted">
            Our workshops emphasize step-by-step execution, ready-to-use prompts, safety and privacy basics, and real-world scenarios for students, professionals, small businesses, creatives, and educators.
          </div>
        </div>
      </div>
    </section>
  );
}
