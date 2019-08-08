function Graph(v) {
  // this.vertices = v;
  this.edges = 0;
  this.adj = {};
  this.addEdge = addEdge;
  this.showGraph = showGraph;
}
function addEdge(v, w,cost) {
  if(this.adj[v] == undefined) this.adj[v] = {}
  this.adj[v][w] = cost
  this.edges++;
}
function showGraph() {
  console.log('=====无向图=====')
  Object.keys(this.adj).forEach(key=>{
    Object.keys(this.adj[key]).forEach(subKey=>{
      console.log(`${key}<==>${subKey}：权重是${this.adj[key][subKey]}`)
    })
  })
}
let myGraph = new Graph()
//深度优先先序遍历
myGraph.addEdge('A', "B",1)
myGraph.addEdge("B", "D",2)
myGraph.addEdge("D","G",1)
myGraph.addEdge("B", "E",3)
myGraph.addEdge('A', "C",1)
myGraph.addEdge("C", "F",1)



myGraph.showGraph()
