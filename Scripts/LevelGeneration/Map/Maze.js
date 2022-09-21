class Maze
{
  grid = {}
  stack = []
  numVisited = 1
  
  constructor(dimensions)
  {
    this.dimensions = dimensions
    
    this.currentPos = new Vector2()
    this.grid[this.posToKey(this.currentPos)] = this.createNewCell()
    
    this.generate()
  }
  
  createNewCell()
  {
    return [true, true, true, true]
  }
  
  posToKey(pos)
  {
    return pos.x + ',' + pos.y
  }
  
  generate()
  {
    while(this.numVisited < this.dimensions.x * this.dimensions.y)
      this.visitNextCell()
  }
  
  visitNextCell()
  {
    let nextPos = this.getNext()
    
    if(nextPos != null)
    {
      this.grid[this.posToKey(nextPos)] = this.createNewCell()
      this.numVisited++
      
      this.removeWalls(this.currentPos, nextPos)
      
      this.currentPos = nextPos
    }
    else if(this.stack.length != 0)
      this.currentPos = this.stack.pop()
      
    //console.log(this.numVisited, this.dimensions.x * this.dimensions.y)
  }
  
  getNext()
  {
    let neighbors = this.getUnvisitedNeighbours()
    
    if(neighbors.length == 0)
      return null

    if(neighbors.length > 1)
      this.stack.push(this.currentPos)
    else
      return neighbors[0]

    let random = Math.round(Math.random() * neighbors.length-1)
    return neighbors[random]
  }
  
  getUnvisitedNeighbours()
  {
    let neighbors = []
    
    let temp = [
      new Vector2(0,-1).add(this.currentPos),
      new Vector2(1,0).add(this.currentPos),
      new Vector2(0,1).add(this.currentPos),
      new Vector2(-1,0).add(this.currentPos)
    ]
    
    for(let pos in temp)
      if(!this.isCellVisited(temp[pos]))
        neighbors.push(temp[pos])
      
    return neighbors
  }
  
  removeWalls(current, next)
  {
    let dir = next.copy().subtract(current)
    
    let currentKey = this.posToKey(current)
    let nextKey = this.posToKey(next)
    
    if(dir.x == 0)
    {
      this.grid[currentKey][dir.y<0?0:2] = false
      this.grid[nextKey][dir.y>0?0:2] = false
    }

    if(dir.y == 0)
    {
      this.grid[currentKey][dir.x>0?1:3] = false
      this.grid[nextKey][dir.x<0?1:3] = false
    }
  }
  
  isCellVisited(pos)
  {
    if(!this.isPosInsideBounds(pos))
      return true
    
    return (this.grid[this.posToKey(pos)] != null)
  }
  
  isPosInsideBounds(pos)
  {
    return pos.x >= 0 && pos.y >= 0 && pos.x < this.dimensions.x && pos.y < this.dimensions.y
  }
  
  getCell(pos)
  {
    return this.grid[this.posToKey(pos)]
  }
}