//releases several instances of the spell at once at split up effectiveness
class BurstModule extends Module
{
  static tag = 'burst'
  static displayName = 'Burst'

  static description = ['The burst module splits the spell up into smaller fragments that spread over the target area. Each fragment has a reduced effectiveness based on the number of fragments']
  
  onCastRequest(caster, targetPosition, spellCore, castIndex)
  {
    this.burstNumber = Math.round(Math.random()*5+1)
    
    for(let i = 0; i < this.burstNumber; i++)
      spellCore.requestCast(caster, targetPosition.copy(), castIndex)
  }
  
  afterCast(spellEntity)
  {
    let area = spellEntity.attributeSheet.getAttribute('spell_area').getModifiedValue()
    
    let effectiveness = spellEntity.attributeSheet.getAttribute('spell_effectiveness').getModifiedValue()/100
    
    //let area_1 = area / this.burstNumber
    //let area_2 = area * effectiveness
    
    let x = (Math.random()*2-1) * area*2
    let y = (Math.random()*2-1) * area*2
    
    let pos = new Vector2(x, y).add(spellEntity.marker.pos)
    
    spellEntity.attributeSheet.addModifier(new AttributeModifier(
      AttributeModifierTypes.additive,
      -(effectiveness - effectiveness/this.burstNumber),
      'spell_effectiveness',
      null,null
    ))
    
    spellEntity.setNewTarget(pos)
  }
}

console.log(BurstModule.name+' loaded...')