export default function Header() {
  return (
    <header className="bg-ds-surface-raised border-b border-ds-border">
      <div className="max-w-4xl mx-auto px-4 py-5">
        <h1 className="text-2xl font-bold text-ds-ink tracking-[-0.01em]">로또 번호 생성기</h1>
        <p className="text-sm text-ds-muted mt-1">암호학적 난수 알고리즘, 6/45</p>
      </div>
    </header>
  );
}
