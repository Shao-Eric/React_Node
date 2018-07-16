import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import _ from 'lodash';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

class SurveyForm extends Component {
  renderFields() {
    return _.map(formFields, (field, index) => {
      return (
        <Field
          key={index}
          component={SurveyField}
          type="text"
          label={field.label}
          name={field.name}
        />
      );
    });
  }

  render() {
    //handleSubmit is a helper function provided by redux form
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {/*<Field type="text" name="surveyTitle" component="input" />*/}
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat white-text">
            Cancel
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}
function validate(values) {
  const errors = {};
  // recipients are the emails
  errors.recipients = validateEmails(values.recipients || '');
  _.each(formFields, ({ name }) => {
    if (!values[name]) {
      errors[name] = 'This field cannot be empty!';
    }
  });

  return errors; // reduxform thinks everything is good if the error is empty
  //reduxform automatically matches up the field and add the error to that field
  // if (!values.title) {
  //   errors.title = 'You must provide a title';
  // }
}
// validate gets run everytime when user submits the form
export default reduxForm({
  validate,
  form: 'surveyForm',
  destroyOnUnmount: false
})(SurveyForm);
