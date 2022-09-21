_pixelAlphabet = {
  'A':[0,3],
  'B':[4,3],
  'C':[8,3],
  'D':[12,3],
  'E':[16,2],
  'F':[19,2],
  'G':[22,4],
  'H':[27,3],
  'I':[31,1],
  'J':[33,3],
  'K':[37,3],
  'L':[41,2],
  'M':[44,5],
  'N':[50,4],
  'O':[55,3],
  'P':[59,3],
  'Q':[63,4],
  'R':[68,3],
  'S':[72,3],
  'T':[76,3],
  'U':[80,3],
  'V':[84,3],
  'W':[88,5],
  'X':[94,3],
  'Y':[98,3],
  'Z':[102,3],
  '!':[106,1],
  '?':[108,3],
  '.':[112,1]
}

function _drawPixelLetter(pos, letter)
{
  let sx = _pixelAlphabet[letter][0]
  let sy = 0
  let sWidth = _pixelAlphabet[letter][1]
  let sHeight = 5

  _gameManager.canvasManager.canvasContext.drawImage(
    _images['PixelAlphabet'],
    sx,sy,sWidth,sHeight,
    pos.x,pos.y,sWidth,sHeight)
    
  return sWidth
}

console.log('PixelFont loaded...')