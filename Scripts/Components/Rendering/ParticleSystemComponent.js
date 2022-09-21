class ParticleSystemComponent extends Component
{
  ID = 'PARTICLESYS'

  constructor(once, pos_f, amount_f, particleSize_f, rate_f, direction_f, speed_f, color_f, lifetime_f)
  {
    super()
    this.once = once
    this.pos_f = pos_f
    this.rate_f = rate_f
    this.timer_f = rate_f
    this.speed_f = speed_f
    this.amount_f = amount_f
    this.particleSize_f = particleSize_f
    this.color_f = color_f
    this.direction_f = direction_f
    this.lifetime_f = lifetime_f
  }

  enabledRun()
  {
    if (this.timer == 0)
    {
      this.timer = this.rate_f()
      this.spawnParticle()
    }
    else
      this.timer--
  }

  spawnParticle()
  {
    for (let i = 0; i < this.amount_f; i++)
    {
      var particlePos = this.pos_f()

      var particle = new GameObject(particlePos.x, particlePos.y)
      
      particle.addComponent(new ParticleComponent(
        this.direction_f(particlePos, this.gameObject.pos),
        this.speed_f(), 
        this.color_f(), 
        this.particleSize_f(), 
        this.lifetime_f()))
    }

  }
}

console.log(ParticleSystemComponent.name+' loaded...')