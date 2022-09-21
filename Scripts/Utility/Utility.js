class Utility
{
  static isPositionInsideArea(pos, dimensions, target)
  {
    return (Utility.isInRange(pos.x, target.x, pos.x + dimensions.x) 
         && Utility.isInRange(pos.y, target.y, pos.y + dimensions.y))
  }

  static isInRange(a, b, c)
  {
    return (a < b && b < c)
  }

  static randomPointInArea(area, source)
  {
    return () => {
      let pos = new Vector2()
      pos.add(source)
  
      let randomPos = new Vector2(
        area.width * Math.random(), 
        area.height * Math.random()
      )
  
      pos.add(randomPos)
      
      return pos
    }
  }

/*static particleDirection()
{
  return (pos, sourcePos) =>
  {
    var dir = new Vector2(
      sourcePos.x + 1.5,
      sourcePos.y + 1.5
    )

    dir.x = pos.x - dir.x
    dir.y = pos.y - dir.y

    var length = Math.sqrt((dir.x * dir.x) + (dir.y * dir.y))

    if (length == 0)
      length = 1

    dir.x = dir.x / length
    dir.y = dir.y / length

    return dir
  }
}*/

  static findNextEmptyIndex(currentIndex, targetArray)
  {
    let i = currentIndex
    
    while(targetArray[i] != null)
    {
      i++
      
      if(i > targetArray.length-1)
        i = 0
      
      if(i == currentIndex)
        return null
    }
      
    return i
  }
  
  static RandomInt(multiplyer)
  {
    return Math.round(Math.random() * multiplyer)
  }
  
  //find intersection of rectangle with line starting from center rectangle to target point
  static pointOnRectangle(targetPos, rectPos, dimensions) 
  {
    let center = dimensions.copy().divide(2).add(rectPos)
    let rectMax = rectPos.copy().add(dimensions)

  	var m = (center.y - targetPos.y) / (center.x - targetPos.x);

	  if (targetPos.x <= center.x) { // check "left" side
	  	let intersect = m * (rectPos.x - targetPos.x) + targetPos.y;
  		if (rectPos.y <= intersect && intersect <= rectMax.y)
  			return {x: rectPos.x, y: intersect};
	  }

	  if (targetPos.x >= center.x) { // check "right" side
  		let intersect = m * (rectMax.x - targetPos.x) + targetPos.y;
  		if (rectPos.y <= intersect && intersect <= rectMax.y)
  	  return {x: rectMax.x, y: intersect};
    }

    if (targetPos.y <= center.y) { // check "top" side
      let intersect = (rectPos.y - targetPos.y) / m + targetPos.x;
  	  if (rectPos.x <= intersect && intersect <= rectMax.x)
  		  return {x: intersect, y: rectPos.y};
  	}

  	if (targetPos.y >= center.y) { // check "bottom" side
  		let intersect = (rectMax.y - targetPos.y) / m + targetPos.x;
  		if (rectPos.x <= intersect && intersect <= rectMax.x)
  			return {x: intersect, y: rectMax.y};
  	}

  	// edge case when finding midpoint intersection: m = 0/0 = NaN
  	if (x === center.x && y === center.y) 
  	  return {x: targetPos.x, y: targetPos.y};
  }
}

console.log(Utility.name+' loaded...')