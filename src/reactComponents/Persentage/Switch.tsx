import * as d3 from "d3";
import React, { Component } from "react";
import Switch from "react-switch";

interface AppProps {}

interface AppState {
  checked: boolean;
}

export class SwitchEl extends Component<AppProps, AppState> {
  constructor(props: any) {
    super(props);
    this.state = { checked: true };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(checked: boolean) {
    if (this.state.checked) {
      d3.selectAll(".percent-xaxis").style("display", "none");
      d3.selectAll(".bar text").style("display", "none");
    } else {
      d3.selectAll(".percent-xaxis").style("display", "inline");
      d3.selectAll(".bar text").style("display", "inline");
      d3.selectAll(".bar .short-block-text").style("display", "none");
    }
    this.setState({ checked });
  }

  render() {
    return (
      <label className="percentage__label">
        <p>Persentage</p>
        <Switch
          height={16}
          width={36}
          handleDiameter={12}
          onColor={"#00c1ff"}
          onChange={this.handleChange}
          checked={this.state.checked}
        />
      </label>
    );
  }
}
