import React from "react";

interface EditableFieldProps {
  className: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const EditableField: React.FC<EditableFieldProps> = (
  props: EditableFieldProps
) => {
  const { className, value, onChange } = props;
  const [isEditable, setIsEditable] = React.useState(value ? false : true);
  const toggleEdit = () => setIsEditable((isEditable) => !isEditable);
  const onSave = () => {
    if (value) {
      setIsEditable(false);
    } else {
      setIsEditable(true);
    }
  };

  return isEditable || !value ? (
    <input
      className={`${
        isEditable ? `p-1` : ``
      } ${className} p-1 hover:bg-gray-100 ${
        value ? "" : "border-2 border-red-500"
      }`}
      onChange={onChange}
      onBlur={onSave}
      value={value}
    />
  ) : (
    <p
      className={`${
        isEditable ? `p-1` : ``
      } ${className} p-1 hover:bg-gray-100`}
      onClick={!isEditable ? toggleEdit : undefined}
    >
      {value}
    </p>
  );
};
