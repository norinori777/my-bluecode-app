import React from 'react'

export const ErrorPresenter = () => {
  if(Math.random() < 0.3){
    throw new Error('エラーが発生しました')
  }
  return(
    <div className="p-5">
      <p>エラーなく表示されました。</p>
    </div>
  ) 
}
