import Image from "../ui/Image";
import "./systemLoader.css";

export default function SystemLoader() {
  return (
    <div className={"loadingOverlay"} dir="ltr">
      <div className={"wavingText"}>
        <span>
          <Image imageUrl="/images/logo_white.png" className="" alt="logo" />
        </span>
        <span>T</span>
        <span>r</span>
        <span>e</span>
        <span>n</span>
        <span>t</span>
      </div>
    </div>
  );
}
