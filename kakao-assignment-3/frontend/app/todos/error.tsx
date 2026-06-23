"use client";

import { useEffect } from "react";

export default function TodosError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-xl items-center px-5 py-12">
      <section className="w-full rounded-[28px] bg-white p-8 text-center shadow-[0_16px_50px_rgba(72,48,110,0.12)]">
        <p className="mb-3 text-4xl" aria-hidden="true">
          ⚠️
        </p>
        <h1 className="text-2xl font-bold text-[#341b59]">
          Todo를 불러오지 못했습니다
        </h1>
        <p className="mt-3 text-sm leading-6 text-[#897c98]">
          백엔드 서버가 실행 중인지 확인한 뒤 다시 시도해주세요.
        </p>
        <button
          type="button"
          onClick={() => unstable_retry()}
          className="mt-7 rounded-2xl bg-[#5f1bd5] px-5 py-3 font-semibold text-white transition hover:bg-[#4d15b5]"
        >
          다시 시도
        </button>
      </section>
    </main>
  );
}
