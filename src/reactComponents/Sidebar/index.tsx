import "./sidebar.scss";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar__brand">Brand</div>
      <div className="sidebar__airlines">
        <div className="sidebar__airline">
          <p>Southwest Airlines</p> <span>Airlines</span>
        </div>
        <div className="sidebar__airline">
          <p>American Airlines</p>
          <span>Airlines</span>
        </div>
        <div className="sidebar__airline">
          <p>Delta</p>
          <span>Airlines</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
