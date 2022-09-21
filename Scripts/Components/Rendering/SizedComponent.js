class SizedComponent extends Component
{
  ID = 'SIZED'
  
  dimension = new Vector2()
  
  setupComplete()
  {
    this.setupDimensionComponent()
  }
  
  setupDimensionComponent()
  {
    this.dimensionComp = this.gameObject.getComponent('DIMENSION')
    
    if(this.dimensionComp == null)
      this.addNewDimensionComponent()
      
    this.updateDimensionComponent()
  }
  
  updateDimensionComponent()
  {
    this.dimensionComp.updateHeight(this.dimension.y)
    this.dimensionComp.updateWidth(this.dimension.x)
  }
  
  addNewDimensionComponent()
  {
    this.dimensionComp = new DimensionComponent()
    this.gameObject.addComponent(this.dimensionComp)
  }
  
  setHeight(h)
  {
    this.dimension.x = h
    this.dimensionComp.updateHeight(this.dimension.x)
  }
  
  setWidth(w)
  {
    this.dimension.y = w
    this.dimensionComp.updateWidth(this.dimension.y)
  }
}

console.log(SizedComponent.name+' loaded...')