import React from 'react'

import { useSelector } from 'react-redux'
import { Puzzle } from '../../icons/Puzzle'
import { HeaderWithMenuLinks } from './presenter'
import { headerMenuItems } from '../../../Reducks/menu'

export const HeaderWithMenuLinkConatainer = () => {
  const menuLinks = useSelector(headerMenuItems)
  return (
    <>
      <HeaderWithMenuLinks
        headerIcon={Puzzle}
        headerTitle={'BluePrint'}
        headerMenuLinks={menuLinks}
        headerTheme={'primary'}
      />
    </>
  )
}
