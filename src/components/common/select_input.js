// @ts-nocheck
import React from "react";
import Select from "react-select";

export default class SelectInput extends React.Component {
  //   state = {
  //     selectedOption: ""
  //   };
  //   handleChange = selectedOption => {
  //     this.setState({ selectedOption });
  //     console.log(`Selected: ${selectedOption.label}`);
  //   };
  options = [
    { value: "Arabic", label: "Arabic" },
    { value: "English", label: "English" },
    { value: "French", label: "French" }
  ];
  render() {
    // const { input: { value, onChange } } = this.props;
    // const value = selectedOption;

    return (
      <Select value={this.props.value} {...this.props} options={this.options} />
    );
  }
}
