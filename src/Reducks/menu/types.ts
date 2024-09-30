export type HeaderMenuItem = {
    text: string
    initialLink: string
  }

  export type HeaderMenuState = {
    headerMenuItems: HeaderMenuItem[]
    selectedMeneItem: HeaderMenuItem
  }