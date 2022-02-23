import { SwitchEl } from "./Switch";
import "./persentage.scss";

const Persentage = () => (
  <div className="percentage">
    <p className="percentage__heading">How Engaged Are They?</p>
    <div className="percentage__wrapper">
      <SwitchEl />
    </div>
  </div>
);

export default Persentage;
