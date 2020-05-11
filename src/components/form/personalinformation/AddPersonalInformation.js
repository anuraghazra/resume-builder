/* eslint-disable require-jsdoc */
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import React, { useContext } from 'react';

import Button from '~/components/button/Button';
import * as storage from '~/storage/LocalStorage';
import { FormContext } from '~/components/FormContext';
import InputText from '~/components/inputtext/InputText';
import FormHeader from '~/components/formheader/FormHeader';
import * as personalInfoUtils from '~/utilities/objects/PersonalInformation';
import OutsideClickDetector from '~/components/detector/OutsideClickDetector';

const AddPersonalInformation = ({ onClose, isEdit }) => {
  const { data } = useContext(FormContext);

  const validatePersonalInformation = Yup.object().shape({
    name: Yup.string().label('Name').min(10).max(35, 'Limit 35 characters').required(),
    role: Yup.string().label('Role').max(40, 'Limit 40 characters').required(),
    introduction: Yup.string().label('Introduction').max(200, 'Limit 200 characters').required(),
  });

  const handleSubmit = values => {
    const personalInfoObj = personalInfoUtils.getPersonalInfoObject({ ...values });
    const prevData = data.get;

    Object.assign(prevData, personalInfoObj);

    storage.saveResume(data.get);

    data.set(prevState => ({ ...prevState, ...personalInfoObj }));

    onClose();
  };

  const getInitialState = () => {
    let initialValues = {};

    if (isEdit) {
      initialValues = {
        name: data.get.name ? data.get.name : '',
        role: data.get.role ? data.get.role.label : '',
        introduction: data.get.introduction ? data.get.introduction.value : '',
      };
    } else {
      initialValues = {
        name: '',
        role: '',
        introduction: '',
      };
    }

    return initialValues;
  };

  return (
    <OutsideClickDetector onClose={onClose}>
      <FormHeader title="Edit Personal Information" />
      <Formik
        initialValues={getInitialState()}
        onSubmit={values => {
          handleSubmit(values);
        }}
        validationSchema={validatePersonalInformation}
      >
        <Form>
          <div className="form__content">
            <InputText name="name" label="Your Name" />
            <InputText name="role" label="Your Role" />
            <InputText name="introduction" label="Your Introduction" type="text-area" />
            <div className="form-button">
              <div className="form-button__left">
                <Button content="Save Info" type="submit" />
              </div>
              <div className="form-button__right">
                <Button content="Cancel" isCancel={true} type="button" onclick={onClose} />
              </div>
            </div>
          </div>
        </Form>
      </Formik>
    </OutsideClickDetector>
  );
};

AddPersonalInformation.propTypes = {
  onClose: PropTypes.func,
  isEdit: PropTypes.bool,
};

export default AddPersonalInformation;
