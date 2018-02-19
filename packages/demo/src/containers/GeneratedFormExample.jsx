import React from 'react';
import { connect } from 'react-redux';
import Ajv from 'ajv';

import {
  GeneratedForm,
  Field,
  Fields,
  FieldRenderer,
  buildAjvValidator
} from '@react-ui-generator/core';

import { Renderers, Layouts } from '@react-ui-generator/bootstrap';

import {
  toggleSex,
  updateForm,
  sendForm,
  clearForm,
  addRelative,
  removeRelative
} from '@actions';

import CloseButton from '../components/CloseButton';
import validationSchema from '../validation/jsonSchema.json';

/**
 * You can add custon renderers here.
 */
const renderers = {
  ...Renderers,
  closeButton: CloseButton
};

const { FormGroups } = Layouts;

class GeneratedFormExample extends React.PureComponent {
  render() {
    const { meta, data, errors, updateForm, ...actions } = this.props;

    return (
      <GeneratedForm
        className="form"
        meta={meta}
        data={data}
        errors={errors}
        renderers={renderers}
        actions={actions}
        onChange={(nextData, nextErrors) => updateForm({ nextData, nextErrors })}
        validator={buildAjvValidator(Ajv, validationSchema)}
      >
        <div className="card border-dark mb-3">
          <div className="card-body">
            <FormGroups>
              <Fields until="aboutMe" />
            </FormGroups>

            <hr className="example-of-custom-layout" />

            <FormGroups>
              <Field id="aboutMe" />
            </FormGroups>

            <hr className="example-of-custom-layout" />

            <div className="form-group">
              <Field id="relatives" className="card--spaced">
                <div className="form-inline">
                  <FormGroups className="mb-2 mr-sm-2 mb-sm-0">
                    <Fields />
                  </FormGroups>
                </div>
              </Field>
            </div>

            <FormGroups>
              <Field id="btnAddRelative" />
            </FormGroups>

            <hr className="example-of-custom-layout" />

            <FormGroups>
              <Fields until="btnSend" />
            </FormGroups>
          </div>
        </div>

        <hr className="example-of-custom-layout" />

        <div style={{ position: 'relative' }}>
          <Field id="btnSend" /> <Field id="btnClear" />
        </div>
      </GeneratedForm>
    );
  }
}

export default connect(
  state => state,
  dispatch => ({
    updateForm: payload => dispatch(updateForm(payload)),
    toggleSex: fieldId => dispatch(toggleSex(fieldId)),
    sendForm: () => dispatch(sendForm()),
    clearForm: () => dispatch(clearForm()),
    addRelative: () => dispatch(addRelative()),
    removeRelative: (...payload) => dispatch(removeRelative(...payload))
  })
)(GeneratedFormExample);
