//makes the spell be able to hit while traveling in a straight line to the destination
class PhysicalModule extends Module
{
  static displayName = 'Physical'

  static description = ['The physical module allows the spell to hit everything along its way to the target location']
  
  afterCast(spellEntity)
  {
    spellEntity.overTime = true
    spellEntity.spellComp.setPhysical()
  }
}

console.log(PhysicalModule.name+' loaded...')