class Vector2
{
  constructor(x, y)
  {
    this.x = (x == null ? 0 : x)
    this.y = (y == null ? this.x : y)
    
    return this
  }
  
  add(vector)
  {
    if(vector == null || !(vector instanceof Vector2))
      return this
    
    this.x += vector.x
    this.y += vector.y
    
    return this
  }
  
  subtract(vector)
  {
    if(vector == null || !(vector instanceof Vector2))
      return this
    
    this.x -= vector.x
    this.y -= vector.y
    
    return this
  }
  
  multiply(value)
  {
    if(value == null)
      return this
    
    this.x *= value
    this.y *= value
    
    return this
  }
  
  divide(value)
  {
    if(value == null || value == 0)
      return this
    
    this.x /= value
    this.y /= value
    
    return this
  }
  
  copy()
  {
    return new Vector2(this.x, this.y)
  }
  
  copyValues(vector)
  {
    if(vector == null || !(vector instanceof Vector2))
      return this

    this.x = vector.x
    this.y = vector.y
    
    return this
  }
  
  length()
  {
    return Math.sqrt(this.x*this.x + this.y*this.y)
  }
  
  normalizedDirection(target)
  {
    if(target == null || !(target instanceof Vector2))
      return this
    
    let direction = target.copy()
    direction.subtract(this)
    
    let distance = direction.length()
    direction.divide(distance)
    
    return direction
  }
  
  round()
  {
    return new Vector2(Math.round(this.x), Math.round(this.y))
  }
  
  floor()
  {
    return new Vector2(Math.floor(this.x), Math.floor(this.y))
  }
  
  equals(vector)
  {
    if(vector == null || !(vector instanceof Vector2))
      return false

    return (this.x == vector.x && this.y == vector.y)
  }
}

console.log(Vector2.name+' loaded...')