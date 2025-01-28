interface IProps {
  width: string;
  backgroundColor: string;
}
function PrograssBar({ width, backgroundColor }: IProps) {
  return (
    <div className="w-full bg-gray-200 rounded-full h-1">
      <div
        className="h-1 rounded-full"
        style={{ width: width, backgroundColor: backgroundColor }}
      />
    </div>
  );
}

export default PrograssBar;
