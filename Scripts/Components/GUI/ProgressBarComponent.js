class ProgressBarComponent extends Component
{
  ID = 'PROGRESSBAR'
  
  constructor(offset, dimension, bgColor, mainColor, showOnFull = false)
  {
    super()
    
    this.offset = offset
    this.dimension = dimension
    this.bgColor = bgColor
    this.mainColor = mainColor
    this.showOnFull = showOnFull
  }
  
  setMaxValue(maxValue)
  {
    this.maxValue = maxValue
    this.updateProgress()
  }
  
  setCurrentValue(value)
  {
    this.currentValue = value
    this.updateProgress()
  }
  
  updateProgress()
  {
    this.progress = this.currentValue/this.maxValue
  }
  
  enabledRun()
  {
    this.draw()
  }
  
  draw()
  {
    if(this.isNotVisible())
      return
    
    let position = this.gameObject.screenPos.copy().add(this.offset)
    let progressDim = this.dimension.copy()
    progressDim.x *= this.progress
   
    Paint.rectangle(this.bgColor, position, this.dimension, false)
    Paint.rectangle(this.mainColor, position, progressDim, false)
  }
  
  isNotVisible()
  {
    return !Settings.showProgressBars || !this.showOnFull && this.progress == 1
  }
}

console.log(ProgressBarComponent.name+' loaded...')