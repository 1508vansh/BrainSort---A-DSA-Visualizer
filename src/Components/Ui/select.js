const Select = ({ children, onChange, value }) => {
    return (
      <select
        onChange={onChange}
        value={value}
        className="px-4 py-2 border rounded"
      >
        {children}
      </select>
    );
  };
  
  export default Select;
  