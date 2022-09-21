class EnemieEntity extends Entity
{
  constructor(x, y, life, src, level, isBoss = false)
  {
    super(x, y, 'enemie_mob', life, src)
    
    this.level = level
    this.xp = (isBoss?level*10:level)
    this.isBoss = isBoss
    this.dropChance = this.isBoss?1:0.1
  }
  
  onDeath(source)
  {
    if(Math.random() < this.dropChance)
      this.scene.addGameObject(new SpellCoreItem(this.pos.x, this.pos.y))

    source.caster.eventManager.call(
    {
      type: ExecutionTypes.onTrigger,
      triggerType: SpellTriggerTypes.onKill,
      xp: this.xp,
      targetPos: this.centerPos,
      caster: source.caster
    })
    
    super.onDeath(source)
  }
  
  createRisingText(text, color)
  {
    let pos = this.pos.copy().add(this.lifeProgress.offset)

    this.scene.addGameObject(new RisingText(pos, color, text))
  }
}