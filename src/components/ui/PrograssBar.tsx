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
    <div className="w-full bg-gray-200 rounded-full" style={{ height }}>
      <div
        className="h-1 rounded-full transition-all"
        style={{
          width: width,
          backgroundColor,
          height,
          transition: "width 60s ease-in-out",
        }}
      />
    </div>
  );
}

export default PrograssBar;
