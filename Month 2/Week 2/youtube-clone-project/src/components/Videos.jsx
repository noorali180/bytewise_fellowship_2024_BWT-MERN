function Videos({ videos, isLoading }) {
  if (isLoading) return <p style={{ color: "white" }}>Loading...</p>;

  return <div>Videos</div>;
}

export default Videos;
