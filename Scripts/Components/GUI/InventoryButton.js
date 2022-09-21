class InventoryButton extends Component
{
  size = new Vector2(25)
  backgroundSize = new Vector2(29)
  indicatorSize = new Vector2(5)
  
  setupComplete()
  {
    this.addClickComponent()
    this.reposition(_gameManager.canvasManager.canvas)
  }
  
  addClickComponent()
  {
    this.gameObject.addComponent(new ClickComponent(3, this.size, () => {
      this.openInventoryScene()
    }))
  }
  
  openInventoryScene()
  {
    _gameManager.sceneManager.openScene(InventoryScene, true, true, true)
  }
  
  enabledRun()
  {
    this.drawBackground()
    this.drawCooldownWheel()
  }
  
  drawBackground()
  {
    let pos = new Vector2(-2).add(this.gameObject.screenPos)
    Paint.rectangle('white', pos, this.backgroundSize)
  }
  
  reposition(canvas)
  {
    this.gameObject.moveTo(new Vector2(
      canvas.width - 10 - this.indicatorSize.x * 5, 
      canvas.height - 10 - this.indicatorSize.y * 5))
  }
  
  drawCooldownWheel()
  {
    for(let x = 0; x < 3; x++)
      for(let y = 0; y < 3; y++)
        if(x != 1 || y != 1)
          this.drawCooldownIndicator(x,y)
  }
  
  drawCooldownIndicator(x,y)
  {
    let pos = this.gameObject.screenPos.copy()
    pos.add(new Vector2(
      x*2*this.indicatorSize.x,
      y*2*this.indicatorSize.y))
    
    let color = this.getStatusColorOfSpell(x+y*3)
    Paint.rectangle(color, pos, this.indicatorSize)
  }
  
  getStatusColorOfSpell(index)
  {
    let player =_gameManager.player
    let core = player.equipment.getItem('core', index)
    
    if(core == null)
      return 'gray'

    if(!core.isCastable(player))
      return 'red'

    return 'blue'
  }
}

console.log(InventoryButton.name+' loaded...')