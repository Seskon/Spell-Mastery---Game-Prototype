class List
{
  length = 0
  items = []
     
  add(element)
  {
    this.items[this.length++] = element
  }
  
  getIndexOf(element)
  {
    for(let i in this.items)
      if(this.items[i] == element)
        return i
    
    return -1
  }

  remove(element)
  {
    let index = this.getIndexOf(element)
    
    if(index < 0)
      return false
    
    this.items.splice(index, 1)
    this.length--
      
    return true
  }
  
  insert(newElement, element, before = true)
  {
    let insertPos = this.getIndexOf(element)
    
    if(insertPos < 0)
      return false
    
    this.items.splice(insertPos + (before?0:1), 0, newElement)
    this.length++
    
    return true
  }
  
  insertAtIndex(element, index, after = false)
  {
    this.items.splice(index + (after?1:0), 0, element)
    this.length++
    
    return true
  }
      
  contains(element)
  {
    return this.getIndexOf(element) > -1 ? true : false
  }
  
  static merge(list1, list2)
  {
    let list = new List()
    
    for(let i in list1.items)
      list.add(list1.items[i])
    
    for(let i in list2.items)
      list.add(list2.items[i])
    
    return list
  }

  clear()
  {
    this.length = 0
    this.pos = 0
    this.items = []
  }
}

console.log(List.name+' loaded...')