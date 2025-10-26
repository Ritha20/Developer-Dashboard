import axios from 'axios';

// Create axios instance for GitHub API
const githubApi = axios.create({
  baseURL: 'https://api.github.com',
  timeout: 10000,
  headers: {
    'Accept': 'application/vnd.github.v3+json',
  }
});

export const fetchGitHubData = async (username) => {
  try {
    const response = await githubApi.get(`/users/${username}`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error(`GitHub user "${username}" not found`);
    } else if (error.response?.status === 403) {
      throw new Error('GitHub API rate limit exceeded. Please try again later.');
    } else if (error.code === 'NETWORK_ERROR') {
      throw new Error('Network error. Please check your internet connection.');
    } else {
      throw new Error('Failed to fetch GitHub data');
    }
  }
};

// Optional: Additional GitHub API functions
export const fetchGitHubRepos = async (username) => {
  try {
    const response = await githubApi.get(`/users/${username}/repos`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch GitHub repositories');
  }
};