import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions/index";

class TesterDetails extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchTester(id, () => {
      this.handleInitialize();
    });
  }

  // initialize form data from the loaded tester
  handleInitialize() {
    const initData = {
      name: this.props.tester.name,
      number: this.props.tester.number,
      bot1: this.props.tester.bot1,
      bot2: this.props.tester.bot2,
      bot3: this.props.tester.bot3
    };

    this.props.initialize(initData);
  }

  onDeleteClick() {
    const { id } = this.props.match.params;
    this.props.deleteTester(id, () => {
      this.props.history.push("/");
    });
  }

  renderTextField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-control ${error ? "is-invalid" : ""}`;
    return (
      <div className="form-group row">
        <label htmlFor={field.name} className="col-sm-4 col-form-label">
          {field.label}
        </label>
        <input
          placeholder={field.placeholder}
          {...field.input}
          type={field.type}
          className={className}
        />
        <div className="text-help">{touched ? error : ""}</div>
      </div>
    );
  }
  renderCheckBoxField(field) {
    return (
      <div className="form-check form-check-inline">
        <input
          placeholder={field.placeholder}
          {...field.input}
          type={field.type}
          className="form-check-input"
        />
        <label htmlFor={field.name} className="form-check-label">
          {field.label}
        </label>
      </div>
    );
  }

  onSubmit(values) {
    const { id } = this.props.match.params;
    this.props.updateTester(id, values, () => {
      this.props.history.push("/");
    });
  }
  render() {
    const { handleSubmit, tester, submitting } = this.props;
    if (!tester) {
      return <div>Loading...</div>;
    }

    return (
      <div className="container col-sm-6 float-center" style={{ padding: 10 }}>
        <div className="card text-primary border-default">
          <h3 className="card-header">Update tester</h3>
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <Field
              label="MSISDN"
              placeholder="MSISDN"
              name="number"
              component={this.renderTextField}
              type="number"
            />
            <Field
              label="User"
              placeholder="user"
              name="name"
              component={this.renderTextField}
              type="text"
            />
            <Field
              label="Arabic"
              name="bot1"
              component={this.renderCheckBoxField}
              type="checkbox"
            />
            <Field
              label="English"
              name="bot2"
              component={this.renderCheckBoxField}
              type="checkbox"
            />
            <Field
              label="French"
              name="bot3"
              component={this.renderCheckBoxField}
              type="checkbox"
            />
            <div className="form-group-row">
              <button
                disabled={submitting}
                type="submit"
                className="btn btn-primary"
              >
                Update
              </button>
              <button
                onClick={this.onDeleteClick.bind(this)}
                className="btn btn-danger"
                type="button"
              >
                Delete
              </button>
              <Link className="btn btn-info" to="/">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.number) {
    errors.number = "Please enter a MSISDN number";
  }

  if (!values.name) {
    errors.name = "Please enter tester name";
  }

  return errors;
}

function mapStateToProps(state, ownProps) {
  return {
    tester: state.testers[ownProps.match.params.id]
  };
}

export default reduxForm({
  validate,
  form: "UpdatetesterForm"
})(connect(mapStateToProps, actions)(TesterDetails));
