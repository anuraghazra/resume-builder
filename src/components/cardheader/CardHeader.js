import React from 'react';
import PropTypes from 'prop-types';

const CardHeader = ({ title, icon = null }) => {
  return (
    <div className="card-header">
      <div className="card-header__l">
        <div className="title">{title}</div>
      </div>
      {icon && (
        <div className="card-header__r">
          <img src={icon} alt="Edit" />
        </div>
      )}
    </div>
  );
};

CardHeader.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.func | null,
};

export default CardHeader;
