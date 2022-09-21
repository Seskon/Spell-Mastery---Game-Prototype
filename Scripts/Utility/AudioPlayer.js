class AudioPlayer
{
  muted = false
  goalAudio = new Audio('./Audio/goal.wav')
  collisionAudio = new Audio('./Audio/collide.wav')
  winAudio = new Audio('./Audio/win.wav')

  playGoal()
  {
    this.playAudio(this.goalAudio)
  }

  playCollision()
  {
    this.playAudio(this.collisionAudio)
  }

  playWin()
  {
    this.playAudio(this.winAudio)
  }

  playAudio(audio)
  {
    if (!this.muted)
      audio.play()
  }

  /*setupMuteButton() {
    var mute = new GameObject(84, 142)
    var rect = new RectangleRenderComponent(
      9,
      8,
      this.getMuteColor(),
      true,
      1)
    mute.addComponent(rect)

    mute.addComponent(new ClickComponent(
      9, 8, () => {

        this.muted = !this.muted
        rect.color = this.getMuteColor()
      }
    ))
  }*/

  getMuteColor()
  {
    return this.muted ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0)'
  }
}

console.log(AudioPlayer.name+' loaded...')