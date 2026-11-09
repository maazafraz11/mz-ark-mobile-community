export default function NotFoundPage() {
  return (
    <div className="page-shell flex min-h-[60vh] items-center justify-center">
      <div className="panel max-w-lg p-8 text-center">
        <div className="muted-label">404</div>
        <h1 className="mt-4 text-4xl font-black text-white">Page not found</h1>
        <p className="mt-3 text-slate-300">The route you requested could not be found.</p>
      </div>
    </div>
  );
}
