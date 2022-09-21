class EntityFinder
{
  static findNearestTarget(searchingEntity, isDamaging)
  {
    let nearestTarget = null
    let nearestDist = -1
    let direction = new Vector2()
    let entities = Object.values(_gameManager.runManager.activeEntities)

    for (let i in entities)
    {
      let entity = entities[i]
      if(entity == searchingEntity 
        || (isDamaging && entity.typeTag == searchingEntity.typeTag)
        || (!isDamaging && entity.typeTag != searchingEntity.typeTag)
        || (entity.typeTag == 'spell' /* && entity.caster.constructor.name == searchingEntity.constructor.name*/))
        continue
      
      direction = entity.pos.copy().subtract(searchingEntity.pos)
      let distance = direction.length()

      if (nearestDist == -1 || nearestDist > distance)
      {
        nearestTarget = entity
        nearestDist = distance
      }
    }
    
    return nearestTarget
  }
}

console.log(EntityFinder.name+' loaded...')