import React, { useContext, useState } from 'react';

import { Add } from '~/assets/image';
import { FormContext } from '../FormContext';
import CertificateItem from './CertificateItem';
import EmptyCard from '~/components/emptycard/EmptyCard';
import CardFooter from '~/components/cardfooter/CardFooter';
import CardHeader from '~/components/cardheader/CardHeader';
import AddCertificate from '../form/certificate/AddCertificate';

const Certificate = () => {
  const [addCertificate, setAdd] = useState(false);
  const [editCertificate, setEdit] = useState(false);

  const editBtnHandler = e => {
    e.preventDefault();
    setEdit(!editCertificate);
  };

  const addBtnHandler = e => {
    setAdd(!addCertificate);
  };

  const addBtnCloseHandler = e => {
    setAdd(!addCertificate);
  };

  const editBtnCloseHandler = e => {
    e.preventDefault();
    setEdit(!editCertificate);
  };

  const context = useContext(FormContext);

  const certificates = context.data.get.certificates;
  const preview = context.preview.get;

  /**
   * Update the hidden state of skill.
   *
   * @param {React.MouseEvent} e [ on click event ].
   * @param {string} key [ name of a particular certificate].
   */
  const updateHiddenStateCertificates = (e, key) => {
    e.preventDefault();

    const data = context.data.get;

    data['certificates'].find(({ name, hidden }, index) => {
      if (name === key) {
        const newState = !hidden;

        data['certificates'][index].hidden = newState;
        context.data.set(data); // new state of data
      }
    });
  };

  if (!certificates) {
    return (
      <>
        <EmptyCard emptyMessage="You do not have any certificates yet."></EmptyCard>
        <CardFooter
          icon={Add}
          hide={preview}
          label="Add another certificate"
          showModal={addCertificate}
          onAdd={addBtnHandler}
          component={AddCertificate}
          onClose={addBtnCloseHandler}
          modifier="empty"
        />
      </>
    );
  }

  const certificatesList = certificates.map(({ name, link, date, description }) => (
    <CertificateItem
      key={name}
      title={name}
      link={link}
      year={date}
      description={description}
      preview={preview}
      isEdit={editCertificate}
      onHiddenIconClicked={updateHiddenStateCertificates}
      onEdit={editBtnHandler}
      onClose={editBtnCloseHandler}
    />
  ));

  return (
    <>
      <CardHeader title="Certificates" />
      <div className="certificate">{certificatesList}</div>
      <CardFooter
        icon={Add}
        hide={preview}
        label="Add another certificate"
        showModal={addCertificate}
        onAdd={addBtnHandler}
        component={AddCertificate}
        onClose={addBtnCloseHandler}
      />
    </>
  );
};

export default Certificate;
