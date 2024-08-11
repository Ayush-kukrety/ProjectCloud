import Link from "next/link";

const ServerDown = () => {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="p-8 bg-white rounded shadow-lg text-center">
          <h1 className="text-3xl font-semibold mb-4">Server Down</h1>
          <p className="text-gray-600 mb-6">
            We're sorry, but the server is currently down. Please try again later.
          </p>
          <img
            src="/images/server-down.png"
            alt="Server Down"
            className="w-64 h-64 object-cover mb-6"
          />
          <Link href='/' className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
            Retry
          </Link>
        </div>
      </div>
    );
  };
  
  export default ServerDown;