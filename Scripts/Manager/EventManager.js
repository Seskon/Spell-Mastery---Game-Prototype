class EventManager
{
  callBackList = new List()
  
  subscribe(callback)
  {
    this.callBackList.add(callback)
  }
  
  unSubscribe(callback)
  {
    this.callBackList.remove(callback)
  }
  
  call(event)
  {
    for(let i in this.callBackList.items)
      this.callBackList.items[i](event)
  }
}

console.log(EventManager.name+' loaded...')