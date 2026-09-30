export default function NotFound() {
  return (
    <main className="px-4 py-24 text-center">
      <h1 className="font-[family-name:var(--font-display)] text-3xl text-[#a51c30]">Page not found</h1>
      <p className="mt-2 text-[#5c4e42]">Return to the wedding guide and choose Mappillai or Ponnu Veedu.</p>
      <a href="/choose" className="mt-6 inline-block text-[#a51c30] underline">
        Choose veedu
      </a>
    </main>
  );
}
