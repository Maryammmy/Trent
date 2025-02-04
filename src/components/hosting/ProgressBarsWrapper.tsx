import PrograssBar from "../ui/PrograssBar";

interface IProps {
  progressBarsData: string[];
}
const ProgressBarsWrapper = ({ progressBarsData }: IProps) => {
  return (
    <div className="flex gap-2">
      {progressBarsData.map((width, index) => (
        <PrograssBar key={index} width={width} />
      ))}
    </div>
  );
};
export default ProgressBarsWrapper;
