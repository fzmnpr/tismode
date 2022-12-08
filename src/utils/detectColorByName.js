export function detectColorByName(str) {
  var ctx = document.createElement('canvas').getContext('2d')
  ctx.fillStyle = str
  return ctx.fillStyle
}
