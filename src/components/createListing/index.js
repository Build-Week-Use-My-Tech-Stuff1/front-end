import React from "react";
import styled from "styled-components";
import { COLORS } from "../../constants";
import propTypes from "prop-types";

export default function CreateListing(props) {
  const { navbarHeight } = props;
  return <h1>Create Listing</h1>;
}

CreateListing.propTypes = {
  navbarHeight: propTypes.string,
};
