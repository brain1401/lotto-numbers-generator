export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900">로또 번호 생성기</h1>
        <p className="text-sm text-gray-500 mt-1">
          암호학적 난수로 생성된 6/45 번호
        </p>
      </div>
    </header>
  )
}
