interface Board {
  columns: Map<TypeColumn, Column>
}

type TypeColumn = "todo" | "inprogress" | "done"
interface Column {
  id: TypeColumn,
  todos : Todo[]
}

interface Todo {
  $id: string 
  $createdAt: string
  title: string
  status: TypeColumn
  image?: IImage
}

interface IImage{
  bucketId: string
  fileId: string
}
