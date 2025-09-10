import React from 'react';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onSearch: () => void;
  isLoading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm, onSearch, isLoading }) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !isLoading) {
      onSearch();
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-2xl animate-fade-in-up">
      <div className="relative w-full sm:flex-grow">
        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
          <svg className="h-6 w-6 text-stone-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="What masterpiece will you create today?"
          disabled={isLoading}
          className="w-full pl-14 pr-5 py-4 text-lg bg-stone-800/50 text-white placeholder-stone-400 border-2 border-stone-600 rounded-full shadow-lg backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-orange-500/50 focus:border-orange-500 transition-all duration-300"
        />
      </div>
      <button
        onClick={onSearch}
        disabled={isLoading}
        className="w-full sm:w-auto bg-orange-500 hover:bg-orange-400 text-stone-900 font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 disabled:bg-stone-600 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center shadow-lg shadow-orange-500/20 hover:shadow-xl hover:shadow-orange-400/30"
      >
        {isLoading ? (
          <svg className="animate-spin h-6 w-6 text-stone-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : (
          'Generate Recipe'
        )}
      </button>
    </div>
  );
};

export default SearchBar;