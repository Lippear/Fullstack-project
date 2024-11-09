import React, { useEffect } from 'react'

export const useClickOutside = (ref, callBack) => {
  const handleClick = (e) => {
    if (ref.current && !ref.current.contains(e.targer)) callBack()
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  })
}
