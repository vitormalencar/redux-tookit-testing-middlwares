export async function fetchResultsRequest() {
  const result = await fetch("http://localhost:3008/results");
  return result.json();
}
