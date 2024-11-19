import { databases } from '@/appwrite';
import { getTodosGroupedByColumn } from '@/lib/getTodosGroupByColumn';
import { create } from 'zustand'

interface BoarState{
  board: Board;
  getBoard: () => void
  setBoardState: (board: Board) => void
  updateTodoInDB: (todo: Todo, columnId: TypeColumn) => void
}

export const useBoardStore = create<BoarState>((set) => ({
  board: {
    columns : new Map<TypeColumn, Column>()
  },
  getBoard: async() => {
    const board = await getTodosGroupedByColumn();
    set({board})
  },
  setBoardState: (board) => set({board}),
  updateTodoInDB: async (todo, columnId) =>{
    await databases.updateDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
      todo.$id,
      {
        title: todo.title,
        status: columnId
      }
    )
  }

}))