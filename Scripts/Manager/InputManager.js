class InputManager
{
  currentEvents = {}
  inputSubscriber = new List()
  
  constructor(targetElement)
  {
    this.targetElement = targetElement
    this.setupEventListener()
  }
  
  getPointerPositionRelativeToTarget(event)
  {
    let rect = event.target.getBoundingClientRect()
    
    return new Vector2(
      event.clientX - rect.left,
      event.clientY - rect.top
    )
  }

  setupEventListener()
  {
    this.targetElement.addEventListener('pointerdown', (event) => {this.onPointerDownEvent(event)})
    
    this.targetElement.addEventListener('pointermove', (event) => {this.onPointerMove(event)})
    
    this.targetElement.addEventListener('pointerup', (event) => {this.onPointerUp(event)})
  }

  onPointerDownEvent(event)
  {
    let pos = this.getPointerPositionRelativeToTarget(event)
    this.assignInputToHighestReciever(this.getTouchedReciever(pos),pos)
  }
  
  getTouchedReciever(pos)
  {
    let touchedReciever = []
  
    for(let reciever of this.inputSubscriber.items)
    {
      if(reciever.canRecieveInputAtPosition(pos))
      {
        this.checkForOverlappingReciever(touchedReciever, reciever)
        touchedReciever[reciever.layerIndex] = reciever
      }
    }
    
    return touchedReciever
  }
 
  checkForOverlappingReciever(touchedReciever, reciever)
  {
    if(touchedReciever[reciever.layerIndex] != null)
      console.log("overlapping reciever on the same layer, use gameObject.destroy() to unsubscribe Reciever")
  }
  
  assignInputToHighestReciever(touchedReciever, pos)
  {
    for(let i = touchedReciever.length-1; i>0 ; i--)
    {
      let reciever = touchedReciever[i]
      
      if(reciever != null)
        if(reciever.onPointerDown(event, pos))
          return this.assignRecieverToEvent(event,reciever)
    }
    
    return false
  }
  
  assignRecieverToEvent(event,reciever)
  {
    this.currentEvents[event.pointerId] = reciever
    reciever.isRecieving = true

    return true
  }

  onPointerMove(event)
  {
    if(this.currentEvents[event.pointerId] != null)
      this.currentEvents[event.pointerId].onPointerMove(event, this.getPointerPositionRelativeToTarget(event))
  }

  onPointerUp(event)
  {
    if(this.currentEvents[event.pointerId] != null)
    {
      let reciever = this.currentEvents[event.pointerId]
      
      reciever.onPointerUp(event, 
        this.getPointerPositionRelativeToTarget(event))
        
      reciever.isRecieving = false

      delete this.currentEvents[event.pointerId]
    }
  }
  
  addSubscriber(subscriber)
  {
    this.inputSubscriber.add(subscriber)
  }
  
  removeSubscriber(subscriber)
  {
    this.inputSubscriber.remove(subscriber)
  }
}

console.log(InputManager.name+' loaded...')