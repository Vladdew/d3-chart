import "./legendList.scss";

const LegendList = () => (
  <div className="legend-list">
    <div className="legend-list__wrap">
      <h5 className="legend-list__noncustomers-segments legend-list__segments">
        Non-customers
      </h5>
      <ul className="legend-list__ul legend-list__noncustomers"></ul>
    </div>
    <div className="legend-list__separator"></div>
    <div className="legend-list__wrap">
      <h5 className="legend-list__customers-segments legend-list__segments">
        Customers
      </h5>

      <ul className="legend-list__ul legend-list__customers"></ul>
    </div>
  </div>
);

export default LegendList;
