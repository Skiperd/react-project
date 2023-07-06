import './style.css';

export const TextInput = ({ onChange, searchValue }) => {
  return (
    <input
      type="search"
      onChange={onChange}
      value={searchValue}
      className="text-input"
      placeholder="Search"
    />
  );
};
