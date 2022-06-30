class Singleton {
  private static instance: Singleton
  constructor(data: any) {
    if(!Singleton.instance) {
      Singleton.instance = new Singleton(data)
    }
    this.createInstance(data)
    return Singleton.instance
  }

  createInstance(data: any) {}
}