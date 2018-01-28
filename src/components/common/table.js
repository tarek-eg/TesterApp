// @ts-nocheck
import React, { Component } from "react";
import { connect } from "react-redux";

class TableComponent extends Component {
  renderBody(data) {
    if (!data.text) {
      return (
        <tr key={data.id}>
          <td>{data.name}</td>
          <td>{data.preview}</td>
          <td>{data.resolution}</td>
          <td>{data.type}</td>
          <td>{data.language}</td>
          <td>{data.url}</td>
          <td>
            <a href="">{data.action}</a>
          </td>
        </tr>
      );
    } else if (data.text) {
      return (
        <tr key={data.id}>
          <td>{data.id}</td>
          <td>{data.text}</td>
          <td>{data.translation}</td>
          <td>{data.from}</td>
          <td>{data.to}</td>
          <td>
            <a href="">{data.action}</a>
          </td>
        </tr>
      );
    }
  }

  renderHeader(data) {
    return <th key={data.name}>{data.name}</th>;
  }
  render() {
    const { header, data } = this.props;
    return (
      <table className="table table-hover">
        <thead>
          <tr>{header.map(this.renderHeader)}</tr>
        </thead>
        <tbody>{data.map(this.renderBody)}</tbody>
      </table>
    );
  }
}

function mapStateToProps(state) {}

export default connect()(TableComponent);
