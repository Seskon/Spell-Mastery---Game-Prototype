class CriticalModule extends Module
{
  static tag = "crit"
  static displayName = 'Critical'
  static description = ['The critical module allows the spells to roll for a critical strike on hit. A critical strike increases the effectiveness of the spell']
  
  modifierType_1 = AttributeModifierTypes.additive
  value_1 = 10
  attributeId_1 = 'spell_critical_chance'
  condition = null
  requiredTags = null
  
  modifierType_2 = AttributeModifierTypes.additive
  value_2 = 100
  attributeId_2 = 'spell_effectiveness'
  
  constructor()
  {
    super()
    
    this.critMod = new AttributeModifier(
        this.modifierType_1, 
        this.value_1,
        this.attributeId_1, 
        this.condition, 
        this.requiredTags
      )
    
    this.effectivenessMod = new AttributeModifier(
        this.modifierType_2,
        this.value_2,
        this.attributeId_2,
        this.condition,
        this.requiredTags
      )
  }
  
  beforeCast(spellCore)
  {
    spellCore.attributeModifierCollector_temp.addAttributeModifier(
      this.critMod)
    //reduce effectiveness modifier
  }
  
  onHit(spellEntity, hitEntity)
  {
    let critChance = spellEntity.attributeSheet.getAttribute('spell_critical_chance').getModifiedValue()
    
    let effectiveness = spellEntity.attributeSheet.getAttribute('spell_effectiveness').getModifiedValue()
    
    let isCrit = Math.random() < ((critChance/100)*(effectiveness/100))
    
    if(isCrit)
    {
      spellEntity.attributeSheet.addModifier(this.effectivenessMod)
    
      spellEntity.caster.eventManager.call({
        type: ExecutionTypes.onTrigger,
        triggerType: SpellTriggerTypes.onCrit,
        caster: spellEntity.caster,
        targetPos: hitEntity.centerPos
      })
    }
  }
  
  afterHit(spellEntity, hitEntity)
  {
    spellEntity.attributeSheet.removeModifier(this.effectivenessMod)
  }
}

console.log(CriticalModule.name+' loaded...')