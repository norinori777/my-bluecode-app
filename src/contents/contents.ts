import React from "react"
import { AddMemberContainer } from "../components/pages/AddMember"
import { Counter } from "../components/pages/Counter"
import { TestContainer } from "../components/pages/Test"
import { TodoFormContainer } from "../components/pages/TodoForm"
import { TopContainer } from "../components/pages/Top"
import { ComponentMap, ContentItem } from "../Reducks/contents/types"
import { HeaderMenuItem } from "../Reducks/menu/types"
import { DragAndDropContainer } from "../components/pages/DragAndDrop"
import { PaginationTableContainer } from "../components/pages/PaginationTable"
import { MultiTablesContainer } from "../components/pages/MultiTables"
import { FileUploadContainer } from "../components/pages/Fileupload/container"
import { ErrorContainer} from "../components/pages/Error/container"

const TodoLazy = React.lazy(() => import('../components/pages/Todo').then(module => ({ default: module.Todo })))
const MemberListLazy = React.lazy(() => import('../components/pages/MemberList').then(module => ({ default: module.MemberList })))

export const contentItems: ContentItem[] = [
  { link: '/', key: 'top', componentId: 'Top' },
  { link: '/counter', key: 'counter', componentId: 'Counter' },
  { link: '/member', key: 'member', componentId: 'MemberList' },
  { link: '/member/add', key: 'memberAdd', componentId: 'AddMember' },
  { link: '/todo', key: 'todo', componentId: 'Todo' },
  { link: '/todo/:id', key: 'todoForm', componentId: 'TodoForm' },
  { link: '/dnd', key: 'dnd', componentId: 'DragAndDrop' },
  { link: '/pagination', key: 'pagination', componentId: 'PaginationTable'},
  { link: '/fileupload', key: 'fileupload', componentId: 'FileUpload' },
  {link: '/multiTables', key: 'multiTables', componentId: 'MultiTables'},
  {link: '/error', key: 'error', componentId: 'Error'}
]

export const headerMenuItems: HeaderMenuItem[] = [
  { text: 'Top', initialLink: '/' },
  { text: 'Counter', initialLink: '/counter' },
  { text: 'Member', initialLink: '/member' },
  { text: 'Todo', initialLink: '/todo' },
  { text: 'DragAndDrop', initialLink: '/dnd' },
  { text: 'PaginationTable', initialLink: '/pagination'},
  { text: 'FileUpload', initialLink: '/fileupload' },
  { text: 'MultiTables', initialLink: '/multiTables' },
  { text: 'Error', initialLink: '/error' },
]

export const componentMap: ComponentMap = {
  'Top': TopContainer,
  'Counter': Counter,
  'MemberList': MemberListLazy,
  'Todo': TodoLazy,
  'TodoForm': TodoFormContainer,
  'FileUpload': FileUploadContainer,
  'AddMember': AddMemberContainer,
  'DragAndDrop': DragAndDropContainer,
  'PaginationTable': PaginationTableContainer,
  'MultiTables': MultiTablesContainer,
  'Error': ErrorContainer
};