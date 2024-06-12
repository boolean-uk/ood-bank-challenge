// TileStatement.js
export default function TileStatement({
  onShowStatement,
}: {
  onShowStatement: () => void;
}) {
  const handleShowStatement = () => {
    console.log("Statement");
    onShowStatement();
  };

  return (
    <div>
      <h3 className="mb-2 text-lg font-semibold">Statement</h3>
      <p className="mb-2">Click below to show the current statement</p>
      <button className="btn btn-primary" onClick={handleShowStatement}>
        Show Statement
      </button>
    </div>
  );
}
