class DimensionComponent extends Component
{
  ID = 'DIMENSION'
  
  dimension = new Vector2()
  
  updateHeight(h)
  {
    if (this.dimension.y < h)
      this.dimension.y = h
  
    if(this.gameObject.scene != null)
      this.gameObject.scene.updateGameObject(this.gameObject)
  }
  
  updateWidth(w)
  {
    if (this.dimension.x < w)
      this.dimension.x = w
  
    if(this.gameObject.scene != null)
      this.gameObject.scene.updateGameObject(this.gameObject)
  }
  
  enabledRun()
  {
    if(Settings.showDimensions)
      Paint.rectangleOutline('blue', this.gameObject.screenPos, this.dimension, 1)
  }
}

console.log(DimensionComponent.name+' loaded...')