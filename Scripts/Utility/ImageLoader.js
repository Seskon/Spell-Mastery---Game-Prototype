_images = {}

_numImages = 0
_loadedImages = 0
_imageNames = ['SpellCore','PixelAlphabet', 'ModuleSymbols', 'ModuleSymbols_Mask',

'Water_Core','Fire_Core','Earth_Core','Lightning_Core','Chaos_Core',

'Wizard',

'Enemie_littleFireSpirit', 'Enemie_mediumFireSpirit', 'Enemie_bossFireSpirit',

'Enemie_littleWaterWale', 'Enemie_mediumWaterWale', 'Enemie_bossWaterWale',

'Enemie_littleLightSpirit', 'Enemie_mediumLightSpirit', 'Enemie_bossLightSpirit',

'Rock_0', 'Rock_1', 'Rock_2', 'Statue_0', 'Statue_1', 'Statue_2', 'Statue_3', 'WaterBubble_0', 'WaterBubble_1', 'BurnedWood_0', 'BurnedWood_1', 'BurnedWood_2',

'Enemie_littleDevil', 'Enemie_mediumDevil', 'Enemie_bossDevil',
'Spike_0','Spike_1',

'Enemie_littleTreeSpirit', 'Enemie_mediumTreeSpirit', 'Enemie_bossTreeSpirit', 'Tree_0','Tree_1','Stone_0','Stone_1', 'Bush_0', 'Bush_1',

'Node_horizontal', 'Node_vertical', 'Node_leftEnd', 'Node_rightEnd', 'Node_upEnd', 'Node_downEnd', 'Node_cross', 'Node_upRight', 'Node_rightDown', 'Node_downLeft', 'Node_leftUp', 'Node_tUp', 'Node_tRight', 'Node_tDown', 'Node_tLeft',
'PassiveTreeButton',
 'TitleText'

]

loadAllImages()

function loadAllImages()
{
  console.log('loading images...')
  _numImages = _imageNames.length
  for(let i in _imageNames)
    loadImage(_imageNames[i])
}

function loadImage(src)
{
  var img = new Image()
 
  img.src = './Images/' + src + '.png'
  _images[src] = img

  img.onload = () => {
    _loadedImages++
      
    console.log('('+_loadedImages+'/'+_numImages+') '+src+' loadet!')
      
    if(_loadedImages == _numImages)
      _gameManager.startGame()
  }
  
  img.onerror = () => {
    throw(img.src +' cant be loaded')
  }
}