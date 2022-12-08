import React from 'react'
import ArrowLeftIcon from 'assets/icons/arrow-left.svg'

function AmountPicker({ amount, setAmount, max }) {
  const increment = () => {
    if (amount < max) setAmount(amount + 1)
  }
  const decrement = () => {
    if (amount > 1) setAmount(amount - 1)
  }
  return (
    <div className="amount-picker">
      <div className="increment" onClick={increment}>
        +
      </div>
      <div className="amount">{amount}</div>
      <div className="decrement" onClick={decrement}>
        -
      </div>
    </div>
  )
}

export default AmountPicker
