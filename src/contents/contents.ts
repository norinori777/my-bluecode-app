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
  { link: '/test', key: 'test', componentId: 'Test' },
]

export const headerMenuItems: HeaderMenuItem[] = [
  { text: 'Top', initialLink: '/' },
  { text: 'Counter', initialLink: '/counter' },
  { text: 'Member', initialLink: '/member' },
  { text: 'Todo', initialLink: '/todo' },
  { text: 'DragAndDrop', initialLink: '/dnd' },
  { text: 'PaginationTable', initialLink: '/pagination'},
  { text: 'Test', initialLink: '/test' },
]

export const componentMap: ComponentMap = {
  'Top': TopContainer,
  'Counter': Counter,
  'MemberList': MemberListLazy,
  'Todo': TodoLazy,
  'TodoForm': TodoFormContainer,
  'Test': TestContainer,
  'AddMember': AddMemberContainer,
  'DragAndDrop': DragAndDropContainer,
  'PaginationTable': PaginationTableContainer,
};