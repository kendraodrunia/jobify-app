type FormRowSelectProps = {
    labelText: string,
   name: string,
   value: string,
   handleChange: () => void,
   list: string[],
}

const FormRowSelect = ({ labelText, name, value, handleChange, list }: FormRowSelectProps) => {
  return (
    <div className='form-row'>
      <label htmlFor={name} className='form-label'>
        {labelText || name}
      </label>

      <select
        name={name}
        value={value}
        onChange={handleChange}
        className='form-select'
      >
        {list.map((itemValue:string, index: number) => {
          return (
            <option key={index} value={itemValue}>
              {itemValue}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormRowSelect