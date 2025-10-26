const GitHubCard = ({ data, loading, error }) => {
  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-colors duration-300">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-4"></div>
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 bg-gray-300 dark:bg-gray-600 rounded-full mr-4"></div>
            <div className="flex-1">
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/3"></div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-colors duration-300">
        <div className="text-center text-red-500 dark:text-red-400">
          <p className="font-semibold">Error loading GitHub data</p>
          <p className="text-sm mt-2">{error}</p>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-colors duration-300">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
        GitHub Profile
      </h2>
      
      <div className="flex items-center mb-6">
        <img
          src={data.avatar_url}
          alt={data.login}
          className="w-16 h-16 rounded-full mr-4 border-2 border-gray-200 dark:border-gray-600"
        />
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            {data.name || data.login}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">@{data.login}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
          <p className="text-2xl font-bold text-gray-800 dark:text-white">
            {data.public_repos}
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Repos</p>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
          <p className="text-2xl font-bold text-gray-800 dark:text-white">
            {data.followers}
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Followers</p>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
          <p className="text-2xl font-bold text-gray-800 dark:text-white">
            {data.following}
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Following</p>
        </div>
      </div>
    </div>
  );
};

export default GitHubCard;