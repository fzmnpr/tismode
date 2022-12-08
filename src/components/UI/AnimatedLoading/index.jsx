function AnimatedLoading({ background, bottom, isFullPage }) {
  return (
    <div
      className={`lds-ellipsis ${isFullPage ? 'center-loading' : ''}`}
      style={{ bottom: isFullPage ? null : bottom || '1rem' }}
    >
      <div
        style={{
          background: background || '#b9e7ff',
        }}
      ></div>
      <div
        style={{
          background: background || '#b9e7ff',
        }}
      ></div>
      <div
        style={{
          background: background || '#b9e7ff',
        }}
      ></div>
      <div
        style={{
          background: background || '#b9e7ff',
        }}
      ></div>
    </div>
  )
}

export default AnimatedLoading
