export default function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="bg-red-900 text-red-200 p-4 rounded-lg flex items-center justify-center gap-3 mt-6">
      <i className="fa-solid fa-triangle-exclamation text-2xl"></i>
      <p>{message}</p>
    </div>
  )
}