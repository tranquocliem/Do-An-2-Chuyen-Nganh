import React from "react";
import { Helmet } from "react-helmet";

function MyHelmet(props) {
  return (
    <Helmet>
      <title>{props.title}</title>
      <meta name="description" content={props.description} />
    </Helmet>
  );
}

export default MyHelmet;
