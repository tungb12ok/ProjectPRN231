const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <h1 className="text-9xl font-bold text-gray-800">404</h1>
      <p className="text-2xl font-medium text-gray-600 mb-4">Page Not Found</p>
      <p className="text-gray-500 mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <a
        href="/"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
      >
        Go Home
      </a>
    </div>
  );
};

export default NotFoundPage;
