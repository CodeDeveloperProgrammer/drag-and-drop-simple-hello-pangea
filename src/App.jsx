import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

import { useEffect, useState } from "react";

/* const initialTodos = [
  { id: 1, text: "js" },
  { id: 2, text: "css" },
  { id: 3, text: "react" },
  { id: 4, text: "html" },
]; */

const initialTodos = JSON.parse(localStorage.getItem("todos")) || [
  { id: 1, text: "js" },
  { id: 2, text: "css" },
  { id: 3, text: "react" },
  { id: 4, text: "html" },
];

const App = () => {
  const [todos, setTodos] = useState(initialTodos);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const startIndex = result.source.index;
    const endIndex = result.destination.index;

    const copyArray = [...todos];

    //Retorna un elemento, TRABAJAR SIEMPRE CON LA COPIA DEL ARRAY ORIGINAL
    const [reorderedItem] = copyArray.splice(startIndex, 1);

    //Con 0 ordena el array con el elemento posicionado
    copyArray.splice(endIndex, 0, reorderedItem);

    setTodos(copyArray);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <h1>Todo drag and drop</h1>
      <Droppable droppableId="todos">
        {(droppableProvider) => (
          <ul
            ref={droppableProvider.innerRef}
            {...droppableProvider.droppableProps}
          >
            {todos.map((todo, index) => (
              <Draggable key={todo.id} index={index} draggableId={`${todo.id}`}>
                {(draggableProvider) => (
                  <li
                    ref={draggableProvider.innerRef}
                    {...draggableProvider.draggableProps}
                    {...draggableProvider.dragHandleProps}
                  >
                    {todo.text}
                  </li>
                )}
              </Draggable>
            ))}
            {droppableProvider.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default App;
