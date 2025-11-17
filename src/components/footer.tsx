export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-sm text-muted">
        <p>© {new Date().getFullYear()} kAItech. All rights reserved.</p>
        <p>
          Built with Next.js • Theme inspired by THORswap • Design direction inspired by Zajno
        </p>
      </div>
    </footer>
  );
}
