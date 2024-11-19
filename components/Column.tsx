import React from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import TodoCard from './TodoCard'
import { PlusCircleIcon } from '@heroicons/react/24/solid'
type props = {
  id: TypeColumn
  todos: Todo[]
  index: number
}

const idToColumnText: {
  [key in TypeColumn]: string
} = {
  todo: "To Do",
  inprogress: "In Progress",
  done: "Done"
}
function Column({ id, todos, index }: props) {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Droppable droppableId={index.toString()} direction='vertical' type='card' isDropDisabled={false} isCombineEnabled={false} ignoreContainerClipping={false} >
            {(providColumn, snapshot) => (
              <div
                {...providColumn.droppableProps}
                ref={providColumn.innerRef}
                className={` min-h-[500px] mt-5 pb-10 p-2 rounded-2xl shadow-sm ${snapshot.isDraggingOver ? "bg-green-200" : "bg-white/50"
                  }`}
              >
                <h2 className='flex justify-between font-bold text-xl'>{idToColumnText[id]}
                  <span className='text-gray-500 bg-gray-200 rounded-full font-normal px-2 py-1 text-sm'>{todos.length}</span>
                </h2>

                <div className='space-y-4 mt-10'>
                  {todos.map((todo, index) => (
                    <Draggable
                      key={todo.$id}
                      draggableId={todo.$id}
                      index={index}
                    >
                      {(providCard) => (
                        <TodoCard
                          todo={todo}
                          index={index}
                          id={id}
                          innerRef={providCard.innerRef}
                          draggableProps={providCard.draggableProps}
                          dragHandleProps={providCard.dragHandleProps}
                        />
                      )}

                    </Draggable>
                  ))}
                  {providColumn.placeholder}
                  <div className='flex items-end justify-end p-2'>
                    <button className='text-green-500 hover:text-green-600'>
                      <PlusCircleIcon className='h-10 w-10' />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  )
}

export default Column