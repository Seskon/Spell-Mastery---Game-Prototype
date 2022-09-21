class RangeIndicatorComponent extends Component
{
  ID = 'RANGE'
  
  setupComplete()
  {
    this.range = this.gameObject.attributeSheet.getAttribute('range')
  }
  
  enabledRun()
  {
    this.drawRange()
  }
  
  drawRange()
  {
    if(!Settings.showRange)
      return false
    
    let dim = this.gameObject.getDimension().copy().divide(2)
    let pos = dim.add(this.gameObject.screenPos)
    
    Paint.circelOutline(pos, this.range.getModifiedValue(), 0, Math.PI * 2, '#FFFFFF22', [])
  }
}