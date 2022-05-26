function SearchBar(props) {
  return (
    <div className="flex justify-center">
      <div className="mt-3 mb-3 xl:w-96">
        <input
          type="text"
          className="form-control block w-full px-3 py-1.5 text-base
            font-normal text-gray-700 bg-white bg-clip-padding
            border border-solid border-gray-300 rounded transition
            ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-yellow-400 focus:outline-none text-center"
          id="exampleSearch"
          placeholder="Search"
          {...props}
        />
      </div>
    </div>
  );
}

export default SearchBar;
