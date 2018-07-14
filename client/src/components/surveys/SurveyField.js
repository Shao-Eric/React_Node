// SurveyField contains logic to render a single
// label and text input
import React from 'react';
export default ({ input, label }) => {
  //console.log(input);

  return (
    <div>
      <label>{label}</label>
      <input {...input} />
      {/*{...input} is equivalent to pass in all event handlers from the input*/}
      {/*onBlur={input.blur} onChange={input.onChange}*/}
    </div>
  );
};
