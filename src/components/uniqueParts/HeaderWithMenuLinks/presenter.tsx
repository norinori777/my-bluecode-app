import React from 'react'
import { HeaderTitle } from '../../uiParts/HeaderTitle'
import { HeaderMenuItem } from '../../../Reducks/menu/types'
import { Header } from '../../uiParts/Header/inedex'
import { HeaderMenu } from '../../uiParts/HeaderMenu'

interface HeaderWithMenuLinksProps {
  headerIcon: React.ElementType
  headerTitle: string
  headerTheme: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'normal'
  headerMenuLinks: HeaderMenuItem[]
}

export const HeaderWithMenuLinks = (props: HeaderWithMenuLinksProps) => {
  return (
    <Header>
      <div className="flex-shrink-0  max-md:hidden md:w-52 md:shadow transform -translate-x-full md:translate-x-0 duration-150 ease-in">
        <HeaderTitle title={props.headerTitle} theme={props.headerTheme} icon={props.headerIcon} />
      </div>
      <nav className="flex-grow">
        <HeaderMenu items={props.headerMenuLinks} />
      </nav>
    </Header>
  )
}
