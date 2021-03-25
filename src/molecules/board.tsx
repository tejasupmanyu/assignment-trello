import React from "react";
import { v4 as uuidv4 } from "uuid";
import { IBoard, ICard } from "../interfaces";
import { Card } from "./card";
import { List } from "./list";

function getInitialBoardState(): IBoard {
  const persistedState = localStorage.getItem("lists");
  return persistedState ? JSON.parse(persistedState) : {};
}

export const Board: React.FC = () => {
  const [lists, setLists] = React.useState<IBoard>(getInitialBoardState());

  React.useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(lists));
  }, [lists]);

  const onAddNewList = () => {
    const newLists = { ...lists };
    const newListId = uuidv4();
    newLists[newListId] = {
      id: newListId,
      cards: [],
      title: "New List",
    };
    setLists(newLists);
  };

  const onChangeListTitle = (listId: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newLists = { ...lists };
    newLists[listId].title = event.target.value;
    setLists(newLists);
  };

  const onRemoveList = (listKey: string) => () => {
    const newLists = { ...lists };
    delete newLists[listKey];
    setLists(newLists);
  };

  const onAddNewCard = (listId: string) => () => {
    const newLists = { ...lists };
    const newCardId = uuidv4();
    newLists[listId].cards.push({
      id: newCardId,
      title: "New Title",
      description: "New Description",
    });
    setLists(newLists);
  };

  const onChangeCardValues = (listId: string, cardId: string) => (
    values: ICard
  ) => {
    const newLists = { ...lists };
    const currentList = newLists[listId];
    currentList.cards = currentList.cards.map((card) => {
      if (card.id === cardId) {
        return { ...card, ...values };
      }
      return card;
    });
    setLists(newLists);
  };

  const onRemoveCard = (listId: string, cardId: string) => () => {
    const newLists = { ...lists };
    const currentList = {
      ...newLists[listId],
      cards: newLists[listId].cards.filter((card) => card.id !== cardId),
    };
    newLists[listId] = currentList;
    setLists(newLists);
  };

  const onDragCard = (listId: string, cardId: string) => (
    event: React.DragEvent<HTMLDivElement>
  ) => {
    event.dataTransfer.setData(
      "card",
      JSON.stringify({ cardId, sourceListId: listId })
    );
  };

  const onDropCard = (listId: string) => (
    event: React.DragEvent<HTMLDivElement>
  ) => {
    const { sourceListId, cardId } = JSON.parse(
      event.dataTransfer.getData("card")
    );
    const newLists = { ...lists };
    const droppedCard = newLists[sourceListId].cards.filter(
      (card) => card.id === cardId
    )[0];
    if (droppedCard) {
      newLists[sourceListId].cards = newLists[sourceListId].cards.filter(
        (card) => card.id !== droppedCard.id
      );
      newLists[listId].cards.unshift(droppedCard);
    }
    setLists(newLists);
  };

  return (
    <main className="flex-1 overflow-y-auto p-5 bg-blue-50">
      <div className="flex justify-end">
        <button
          className="bg-indigo-500 px-8 py-3 text-white rounded"
          onClick={onAddNewList}
        >
          + Add List
        </button>
      </div>
      <div className="flex space-x-6 h-full overflow-x-scroll	py-3">
        {Object.keys(lists).map((listKey) => {
          const cards = lists[listKey].cards;
          return (
            <List
              key={listKey}
              {...lists[listKey]}
              onRemove={onRemoveList(listKey)}
              onAddNewCard={onAddNewCard(listKey)}
              onDropCard={onDropCard(listKey)}
              onChangeListTitle={onChangeListTitle(listKey)}
            >
              {cards.map((card) => (
                <Card
                  key={card.id}
                  id={card.id}
                  data={card}
                  onRemove={onRemoveCard(listKey, card.id)}
                  onChange={onChangeCardValues(listKey, card.id)}
                  onDrag={onDragCard(listKey, card.id)}
                />
              ))}
            </List>
          );
        })}
        {Object.keys(lists).length < 1 && (
          <p className="text-gray-600 m-auto">
            No lists yet, use + Add lists button to add one.
          </p>
        )}
      </div>
    </main>
  );
};
