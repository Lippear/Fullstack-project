import { useEffect } from 'react'

export const useClickOutside = (ref, callBack) => {
  const handleClick = (e) => {
    if (ref.current && !ref.current.contains(e.target)) callBack()
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  },[ref,callBack])
}
