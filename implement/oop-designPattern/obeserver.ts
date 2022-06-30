interface EventControl {
  [s: string]: Array<Function>
}

class $Observer {
  private cache: EventControl
  constructor() {
    this.cache  = {}
  }
  on(evtName: string, fn: Function) {
    if(!this.cache[evtName]) this.cache[evtName] = []
    this.cache[evtName].push(fn);
  }
  emit(evtName: string, data: Function) {
    if(!this.cache[evtName]) return;
    this.cache[evtName].forEach(fn => fn(data))
  }

  off(evtName: string, fn: Function) {
    if(!this.cache[evtName]) return;
    
    if(fn) {
      this.cache[evtName] = this.cache[evtName].filter(cachedFn => cachedFn !== fn);
    }else {
      delete this.cache[evtName]
    }
  } 
}