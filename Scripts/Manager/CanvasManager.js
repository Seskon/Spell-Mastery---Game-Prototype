class CanvasManager
{
  eventManager = new EventManager()
  
  constructor(dimensions, percentOfWindow)
  {
    this.loadPixelFont()
    
    this.baseDimensions = dimensions
    this.percentOfWindow = percentOfWindow
    
    this.setupCanvasHtml()
    this.setupAutomaticCanvasResize()
    
    console.log('canvas setup completed...')
  }
  
  loadPixelFont()
  {
    let myFont = new FontFace('pixelFont', 'url(Fonts/PixelFont.ttf)');
    myFont.load().then(function(font){
      // with canvas, if this is ommited won't work
      document.fonts.add(font);
      console.log('Font loaded');
    })
  }
  
  setupAutomaticCanvasResize()
  {
    window.addEventListener('resize', () => {
      this.resize()
    })
  
    window.addEventListener('load', () => {
      this.resize()
    })
  }
  
  resize()
  {
    this.setCanvasScaleBasedOnWindowDimension()
    this.scaleGameWindow()
    this.eventManager.call({
      type:'resize',
      canvas:this.canvas
    })
  }
  
  scaleGameWindow()
  {
    this.gameWindow.style.setProperty('width', this.baseDimensions.x * this.canvasScale)
    this.gameWindow.style.setProperty('height', this.baseDimensions.y * this.canvasScale)
  }

  setCanvasScaleBasedOnWindowDimension() 
  {
    this.canvasScale = this.percentOfWindow/100 / Math.max(
      this.baseDimensions.x / window.innerWidth, 
      this.baseDimensions.y / window.innerHeight
    )
    
    this.canvas.style.setProperty(
      'transform', 
      'scale(' + this.canvasScale + ')'
    )
  }
  
  setupCanvasHtml()
  {
    document.open()
    document.write('<div class="GameWindow"><canvas class="GameScreen"></canvas></div>')
    
    this.canvas = document.querySelector('.GameScreen')
    this.canvasContext = this.canvas.getContext('2d')
    this.gameWindow = document.querySelector('.GameWindow')
    
    this.setupCanvasProperties()
    this.setupGameWindowProperties()
  }
  
  setupCanvasProperties()
  {
    this.canvas.width = this.baseDimensions.x
    this.canvas.height = this.baseDimensions.y
    
    this.canvas.style.setProperty('image-rendering', 'pixelated')
    this.canvas.style.setProperty('image-rendering', '-moz-crisp-edges')
    this.canvas.style.setProperty('image-rendering', '-webkit-crisp-edges')
    this.canvas.style.setProperty('image-rendering', 'crisp-edges')
    
    this.canvas.style.setProperty('font-smooth','never')
    this.canvas.style.setProperty('-webkit-font-smoothing','none')
    this.canvas.style.setProperty('-moz-osx-font-smoothing','grayscale')
  
    this.canvas.style.setProperty('transform-origin', 'top left')
    this.canvas.style.setProperty('text-align', 'center')
  }
  
  setupGameWindowProperties()
  {
    this.gameWindow.style.setProperty('margin', '5 0')
    this.gameWindow.style.setProperty('display', 'inline-block')
  }
  
  setTouchAction(isTouchAllowed)
  {
    this.canvas.style.setProperty('touch-action', isTouchAllowed ? 'auto' : 'none')
  }
  
  screenPositionToCanvasPosition(screenPosition)
  {
    return screenPosition.copy().divide(this.canvasScale)
  }
}

console.log(CanvasManager.name+' loaded...')