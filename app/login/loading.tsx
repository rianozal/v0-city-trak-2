export default function LoginLoading() {
  return (
    <div className="auth-container flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="animate-pulse">
          <div className="bg-white rounded-lg shadow-xl p-6">
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-gray-200 rounded-2xl"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto"></div>
              <div className="h-4 bg-gray-200 rounded w-full mx-auto"></div>
            </div>
            <div className="mt-6 space-y-4">
              <div className="h-10 bg-gray-200 rounded"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3 ml-auto"></div>
              <div className="h-10 bg-orange-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
