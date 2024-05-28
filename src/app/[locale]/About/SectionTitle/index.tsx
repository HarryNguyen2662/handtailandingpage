"use client";

//import React from "react";
import PropTypes from "prop-types";

const SectionTitle = ({ title, caption }) => {
  return (
    <div className="mx-auto text-center">
      <h1 className="text-4xl font-bold text-gray-700 dark:text-gray-300 mb-4">
        {title}
      </h1>

      {caption && (
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
          {caption}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;

SectionTitle.propTypes = {
  title: PropTypes.string.isRequired,
  caption: PropTypes.string,
};
