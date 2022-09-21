class NodeItem extends Item
{
  constructor(x, y, typeKey = NodeItem.getRandomTypeKey())
  {
    super(x,y,'Node_'+typeKey,NodeTypes[typeKey].rarity,'Node')
    
    this.typeKey = typeKey
  }
  
  static getRandomTypeKey()
  {
    let keys = Object.keys(NodeTypes)
    
    let rand = Math.round(Math.random() * (keys.length-1))
    
    return keys[rand]
  }
}

console.log(NodeItem.name+' loaded...')