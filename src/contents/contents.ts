import { Counter } from "../components/pages/Counter"
import { MemberList } from "../components/pages/MemberList"
import { TestContainer } from "../components/pages/Test"
import { Todo } from "../components/pages/Todo"
import { TodoFormContainer } from "../components/pages/TodoForm"
import { TopContainer } from "../components/pages/Top"
import { ComponentMap, ContentItem } from "../Reducks/contents/types"
import { HeaderMenuItem } from "../Reducks/menu/types"

export const contentItems: ContentItem[] = [
    { link: '/', key: 'top', componentId: 'Top' },
    { link: '/counter', key: 'counter', componentId: 'Counter' },
    { link: '/member', key: 'member', componentId: 'MemberList' },
    { link: '/todo', key: 'todo', componentId: 'Todo' },
    { link: '/todo/:id', key: 'todoForm', componentId: 'TodoForm' },
    { link: '/test', key: 'test', componentId: 'Test' },
  ]

export const headerMenuItems: HeaderMenuItem[] = [
    { text: 'Top', initialLink: '/' },
    { text: 'Counter', initialLink: '/counter' },
    { text: 'Member', initialLink: '/member' },
    { text: 'Todo', initialLink: '/todo' },
    { text: 'Test', initialLink: '/test' },
  ]

  export const componentMap: ComponentMap = {
    'Top': TopContainer,
    'Counter': Counter,
    'MemberList': MemberList,
    'Todo': Todo,
    'TodoForm': TodoFormContainer,
    'Test': TestContainer,
};