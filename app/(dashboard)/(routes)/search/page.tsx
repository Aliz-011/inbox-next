const SearchPage = async ({
  searchParams,
}: {
  searchParams: { q: string };
}) => {
  return <div className="p-6">SearchPage: {searchParams.q}</div>;
};

export default SearchPage;
