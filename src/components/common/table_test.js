// @ts-nocheck
import React, { Component } from "react";
import { connect } from "react-redux";

const TableComponentTest = props => {
  //   console.log("data ", props.data);
  const tableRowsData = props.data.map(asset => {
    console.log("data ", props.data);
    return <tr>{asset}</tr>;
  });

  const tableRowsHedaer = props.header.map(column => {
    console.log("header ", props.header);
    return <tr>{volumn}</tr>;
  });

  return (
    <table className="table table-hover">
      <thead>
        <tr>{tableRowsHedaer}</tr>
      </thead>
      <tbody>{tableRowsData}</tbody>
    </table>
  );
};

export default TableComponentTest;
