import { useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineCheckCircle } from 'react-icons/ai';

function Success() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <p className="mb-4 text-lg">No data submitted.</p>
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow-lg border border-green-400">
      <div className="flex items-center space-x-3 mb-6">
        <AiOutlineCheckCircle className="text-green-500 text-4xl" />
        <h2 className="text-2xl font-semibold text-green-700">Success!</h2>
      </div>

      <h3 className="text-lg font-medium mb-4">Submitted Details:</h3>
      <ul className="list-disc list-inside space-y-2 text-gray-700">
        {Object.entries(state).map(
          ([key, value]) =>
            key !== 'showPassword' && (
              <li key={key}>
                <strong className="capitalize">{key.replace(/([A-Z])/g, ' $1')}:</strong> {value}
              </li>
            )
        )}
      </ul>

      <button
        onClick={() => navigate('/')}
        className="mt-8 w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Back to Form
      </button>
    </div>
  );
}

export default Success;
