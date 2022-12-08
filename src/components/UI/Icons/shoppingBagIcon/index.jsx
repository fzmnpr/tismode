import React from 'react'

function ShoppingBagIcon({ color }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path
        d="M2.66663 2.66666H4.98663C6.42663 2.66666 7.55996 3.90666 7.43996 5.33332L6.33329 18.6133C6.14663 20.7866 7.86662 22.6533 10.0533 22.6533H24.2533C26.1733 22.6533 27.8533 21.08 28 19.1733L28.72 9.17333C28.88 6.96 27.2 5.15998 24.9733 5.15998H7.75997"
        stroke={color || '#292D32'}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.6667 29.3333C22.5871 29.3333 23.3333 28.5871 23.3333 27.6667C23.3333 26.7462 22.5871 26 21.6667 26C20.7462 26 20 26.7462 20 27.6667C20 28.5871 20.7462 29.3333 21.6667 29.3333Z"
        stroke={color || '#292D32'}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 29.3333C11.9205 29.3333 12.6667 28.5871 12.6667 27.6667C12.6667 26.7462 11.9205 26 11 26C10.0796 26 9.33337 26.7462 9.33337 27.6667C9.33337 28.5871 10.0796 29.3333 11 29.3333Z"
        stroke={color || '#292D32'}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 10.6667H28"
        stroke={color || '#292D32'}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default ShoppingBagIcon
