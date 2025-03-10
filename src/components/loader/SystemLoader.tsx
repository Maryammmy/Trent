import Image from "../ui/Image";
import logo from "../../assets/iamges/logo_white.png";
import "./systemLoader.css";

export default function SystemLoader() {
  return (
    <div className={"loadingOverlay"} dir="ltr">
      <div className={"wavingText"}>
        <span>
          <Image imageUrl={logo} className="" alt="logo" />
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
