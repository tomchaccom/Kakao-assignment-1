export default function TodosLoading() {
  return (
    <main
      className="mx-auto min-h-screen w-full max-w-2xl px-5 py-12"
      aria-busy="true"
      aria-label="Todo 목록을 불러오는 중"
    >
      <section className="rounded-[28px] bg-white p-6 shadow-[0_16px_50px_rgba(72,48,110,0.12)] sm:p-8">
        <div className="mb-8 flex items-center justify-between">
          <div className="space-y-3">
            <div className="h-4 w-20 animate-pulse rounded bg-[#e8e1f1]" />
            <div className="h-9 w-40 animate-pulse rounded-lg bg-[#ddd3e9]" />
          </div>
          <div className="h-10 w-24 animate-pulse rounded-2xl bg-[#ddd3e9]" />
        </div>

        <div className="space-y-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="flex items-center justify-between border-b border-[#eee9f5] py-5"
            >
              <div className="space-y-2">
                <div className="h-5 w-48 animate-pulse rounded bg-[#e8e1f1]" />
                <div className="h-3 w-14 animate-pulse rounded bg-[#f0ebf5]" />
              </div>
              <div className="h-9 w-32 animate-pulse rounded-xl bg-[#eee8f6]" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
