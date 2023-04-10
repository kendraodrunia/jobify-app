type formRow = {
  type: string,
  name: string,
  value: string,
  handleChange: () => void,
  labelText: string
}

const FormRow = ({ type, name, value, handleChange, labelText }: formRow) => {
  return (
    <div className='form-row'>
      <label htmlFor={name} className='form-label'>
        {labelText || name}
      </label>

      <input
        type={type}
        value={value}
        name={name}
        onChange={handleChange}
        className='form-input'
      />
    </div>
  );
};

// const FormRow = ({ type, name, value, handleChange, labelText }) => {
//   return (
//     <div className='form-row'>
//       <label htmlFor={name} className='form-label'>
//         {labelText || name}
//       </label>
//       <input
//         type={type}
//         value={value}
//         name={name}
//         onChange={handleChange}
//         className='form-input'
//       />
//     </div>
//   );
// };

export default FormRow;