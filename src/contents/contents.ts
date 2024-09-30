import { Counter } from "../components/pages/Counter"
import { MemberList } from "../components/pages/MemberList"
import { Test } from "../components/pages/Test"
import { Top } from "../components/pages/Top"
import { ContentItem } from "../Reducks/contents/types"
import { HeaderMenuItem } from "../Reducks/menu/types"

export const contentItems: ContentItem[] = [
    { link: '/', key: 'top', component: Top },
    { link: '/counter', key: 'counter', component: Counter },
    { link: '/member', key: 'member', component: MemberList },
    { link: '/test3', key: 'test3', component: Test },
  ]

export const headerMenuItems: HeaderMenuItem[] = [
    { text: 'Top', initialLink: '/' },
    { text: 'Counter', initialLink: '/counter' },
    { text: 'Member', initialLink: '/member' },
    { text: 'test3', initialLink: '/test3' },
  ]