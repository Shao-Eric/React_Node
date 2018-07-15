// SurveyField contains logic to render a single
// label and text input
import React from 'react';
export default ({ input, label, meta: { error, touched } }) => {
  //console.log(input);
  //console.log(meta);

  return (
    <div>
      <label>{label}</label>
      <input {...input} style={{ marginBottom: '5px' }} />
      {/*{...input} is equivalent to pass in all event handlers from the input*/}
      {/*onBlur={input.blur} onChange={input.onChange}*/}
      <div className="red-text" style={{ marginBottom: '20px' }}>
        {touched && error}
        {/*if touch is true and error is available, then show error*/}
      </div>
    </div>
  );
};
