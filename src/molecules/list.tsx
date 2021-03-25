import React, { DragEvent } from "react";
import { EditableField } from "../atoms/editableField";

interface ListProps {
  id: string;
  title: string;
  children?: any;
  onRemove: () => void;
  onAddNewCard: () => void;
  onDropCard: (event: DragEvent<HTMLDivElement>) => void;
  onChangeListTitle: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const List: React.FC<ListProps> = (props: ListProps) => {
  const { title, onRemove, onAddNewCard, onChangeListTitle } = props;

  const [draggingOver, setDraggingOver] = React.useState(false);

  const onDragOver = (event: DragEvent<HTMLDivElement>) => {
    setDraggingOver(true);
    event.preventDefault();
  };

  const onDropCard = (event: DragEvent<HTMLDivElement>) => {
    setDraggingOver(false);
    props.onDropCard(event);
  };

  const onDragEnter = (event: DragEvent<HTMLDivElement>) => {
    setDraggingOver(true);
    event.preventDefault();
  };

  const onDragLeave = (event: DragEvent<HTMLDivElement>) => {
    setDraggingOver(false);
    event.preventDefault();
  };

  return (
    <div
      className="flex flex-col bg-indigo-100 w-72 min-h-full p-2 rounded-md min-w-1/5"
      onDragOver={onDragOver}
      onDrop={onDropCard}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
    >
      <div className="w-100 p-3 flex">
        <EditableField
          className="flex-1 text-2xl mr-1 rounded"
          value={title}
          onChange={onChangeListTitle}
        />
        <button
          className="bg-gray-50 hover:bg-gray-500 hover:text-gray-50 text-gray-800 rounded-full w-8 h-8 font-bold"
          onClick={onRemove}
        >
          ✕
        </button>
      </div>

      <div
        className={`bg-indigo-200 flex flex-col flex-1 my-2 space-y-1 rounded-xl p-3 overflow-y-auto ${
          draggingOver ? "bg-indigo-300" : ""
        }`}
      >
        {props.children}
      </div>

      <button
        className="inline bg-indigo-500 text-white rounded-full w-12 h-12 self-center"
        onClick={onAddNewCard}
      >
        +
      </button>
    </div>
  );
};
