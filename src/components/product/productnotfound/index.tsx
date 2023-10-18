type searchQueryProp = {
  searchQuery: string;
};

export default function ProductNotFound({ searchQuery }: searchQueryProp) {
  return <h1>{searchQuery} Product Not Found</h1>;
}
