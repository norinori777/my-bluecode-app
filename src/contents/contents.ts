import { Counter } from "../components/pages/Counter"
import { MemberList } from "../components/pages/MemberList"
import { Test } from "../components/pages/Test"
import { Todo } from "../components/pages/Todo"
import { Top } from "../components/pages/Top"
import { ContentItem } from "../Reducks/contents/types"
import { HeaderMenuItem } from "../Reducks/menu/types"

export const contentItems: ContentItem[] = [
    { link: '/', key: 'top', component: Top },
    { link: '/counter', key: 'counter', component: Counter },
    { link: '/member', key: 'member', component: MemberList },
    { link: '/todo', key: 'todo', component: Todo },
    { link: '/test', key: 'test', component: Test },
  ]

export const headerMenuItems: HeaderMenuItem[] = [
    { text: 'Top', initialLink: '/' },
    { text: 'Counter', initialLink: '/counter' },
    { text: 'Member', initialLink: '/member' },
    { text: 'Todo', initialLink: '/todo' },
    { text: 'Test', initialLink: '/test' },
  ]