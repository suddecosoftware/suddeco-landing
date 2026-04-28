export default function SecurityViolation() {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">
      <section className="max-w-lg text-center space-y-5">
        <div className="mx-auto h-14 w-14 rounded-full border border-amber-400/50 bg-amber-400/10 flex items-center justify-center text-2xl">
          !
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Suspicious activity detected</h1>
        <p className="text-slate-300">
          This session was paused because the browser reported an unsafe inspection pattern.
          Please reopen the site normally to continue.
        </p>
        <a
          href="/"
          className="inline-flex min-h-11 items-center rounded-md bg-amber-400 px-5 text-sm font-semibold text-slate-950 hover:bg-amber-300"
        >
          Return home
        </a>
      </section>
    </main>
  );
}
