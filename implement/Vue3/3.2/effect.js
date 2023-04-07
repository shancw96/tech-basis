class ReactiveEffect {
  active = true
  deps = []

  constructor(fn) {
    this.fn = fn
  }

  run() {
    try {
      activeEffect = this
      return this.fn()
    } finally {
      activeEffect = undefined
    }
  }
}

export function effect(fn) {
  const _effect =new ReactiveEffect(fn)
  _effect.run()
}