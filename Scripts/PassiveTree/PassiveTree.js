class PassiveTree
{
  //pos/node
  nodes = {}
  
  constructor(owner)
  {
    this.owner = owner
  }
  
  addStartingNode()
  {
    let node = new NodeItem(0,0, 'cross', new Vector2())
    node.modifierList.clear()
    this.addNode(node, new Vector2())
  }
  
  addNode(node, pos)
  {
    if(pos == null)
      return
    
    let key = pos.x + ',' + pos.y
    
    if(this.nodes[key] != null)
      return
    
    this.handleNode(pos,key,node)
    this.nodes[key] = node
  }
  
  handleNode(pos,key,node)
  {
    if(node != null)
    {
      node.moveTo(pos)
      this.collectModifier(node)
      this.addEmptyOpeningNodes(node, pos)
    }
  }
  
  addEmptyOpeningNodes(node, pos)
  {
    for(let o of NodeTypes[node.typeKey].openings)
        this.addNode(null, pos.copy().add(o))
  }
  
  collectModifier(node)
  {
    this.owner.distributeModifierList(node.modifierList)
  }
  
  getNode(tilePos)
  {
    let key = tilePos.x + ',' + tilePos.y
    
    return this.nodes[key]
  }
}

console.log(PassiveTree.name+' loaded...')