class RisingTextComponent extends Component
{
  ID = 'RISINGTEXT'
  fadeTime = 2*_gameManager.fps
  timer = 0
  speed = 0.1
  
  constructor(offset, rgba, prefix = '')
  {
    super()
    
    this.baseOffset = offset
    this.offset = new Vector2()
    this.prefix = prefix
    this.rgba = rgba
  }
  
  setupComplete()
  {
    this.setupComponents()
  }
  
  addValue(value)
  {
    if(this.timer <= 0)
    {
      this.offset.copyValues(this.baseOffset)
      this.value = 0
      this.timer = this.fadeTime
    }
    
    this.value += value
    this.textComp.clear()
    this.textComp.addTextLine(this.prefix+Math.round(this.value))
  }
  
  setAlpha(value)
  {
    this.rgba = this.rgba.replace(/[^,]+(?=\))/, value)
  }
  
  setupComponents()
  {
    this.textComp = new TextRenderComponent(this.offset, 100, this.rgba, 'center')
    this.gameObject.addComponent(this.textComp)
  }
  
  enabledRun()
  {
    if(this.timer <= 0)
      return

    this.runTimer()
    this.riseText()
    this.setColor()
  }
  
  runTimer()
  {
    this.timer--
  }
  
  riseText()
  {
    this.offset.add(new Vector2(Math.random()*this.speed,-this.speed))
  }
  
  setColor()
  {
    this.setAlpha(this.timer/this.fadeTime)
    this.textComp.color = this.rgba
  }
}