import "./App.scss";

import LegendList from "./reactComponents/LegendList";
import Persentage from "./reactComponents/Persentage";
import Sidebar from "./reactComponents/Sidebar";
import ChartScene from "./reactComponents/ChartScene";

const App = () => {
  return (
    <div className="app">
      <Persentage />
      <LegendList />
      <Sidebar />
      <ChartScene />
    </div>
  );
};

export default App;
