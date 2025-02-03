interface IProps {
  width: string;
  backgroundColor?: string;
  height?: string;
}
function PrograssBar({
  width,
  backgroundColor = "#223f7f",
  height = "6px",
}: IProps) {
  return (
    <div
      className="w-full bg-gray-200 rounded-full h-1"
      style={{ height: height }}
    >
      <div
        className="h-1 rounded-full"
        style={{
          width: width,
          backgroundColor: backgroundColor,
          height: height,
        }}
      />
    </div>
  );
}

export default PrograssBar;
