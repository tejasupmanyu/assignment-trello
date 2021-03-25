import React, { DragEvent } from "react";
import { EditableField } from "../atoms/editableField";
import { ICard } from "../interfaces";

interface CardProps {
  id: string;
  data: {
    title: string;
    description: string;
  };
  onChange: (value: ICard) => void;
  onDrag: (event: DragEvent<HTMLDivElement>) => void;
  onRemove: () => void;
}
export const Card: React.FC<CardProps> = (props: CardProps) => {
  const { id, data, onRemove, onChange, onDrag } = props;

  const onChangeValue = (field: "title" | "description") => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.stopPropagation();
    onChange({
      ...data,
      id,
      [field]: event.target.value,
    });
  };

  return (
    <div
      className="relative min-h-1/5 w-full p-3 mx-auto bg-white rounded-xl shadow-md flex flex-col items-start cursor-move hover:bg-gray-50"
      draggable="true"
      onDragStart={onDrag}
    >
      <button className="absolute top-0 right-0 h-8 w-8" onClick={onRemove}>
        ✕
      </button>
      <EditableField
        className="text-left w-11/12 self-left font-medium rounded"
        onChange={onChangeValue("title")}
        value={data.title}
      />
      <EditableField
        className="text-left w-full rounded"
        onChange={onChangeValue("description")}
        value={data.description}
      />
    </div>
  );
};
