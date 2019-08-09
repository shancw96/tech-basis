function Graph(v){
  this.vertices = v;//节点数
  this.marked = [];//已经访问过的节点
  this.adj = [];//邻接矩阵V*V
  this.edges = 0;
  //初始化邻接表
  for(let i=0;i<this.vertices;i++){
    this.adj[i] = [];//定义二维数组
    // this.adj[i].push('')//将所有元素初始化为空字符串
    this.marked[i] = false
  }
  this.addEdge = addEdge;
  this.dfs = dfs;
  this.bfs = bfs;
  //辅助方法
  this.resetMarked = resetMarked;

}

function addEdge(v,w){
  this.adj[v].push(w);
  this.adj[w].push(v)
  this.edges += 1
}

function dfs(v){
  this.marked[v] = true;
  this.adj[v] ? console.log(`travel V:${v}`):console.log(`traveled Before:${v}`)
  // this.adj[v].forEach(w=>this.marked[w]?'':this.dfs(w))
  for(let w of this.adj[v]){
    if(this.marked[w] == false){
      this.dfs(w)
    } 
  }
}

function resetMarked(){
  console.log('==reset Marked==')
  for(let i=0;i<this.vertices;i++){
    this.marked[i] = false
  }
}
// function bfs(v){
//   console.log('=====BFS====')
//   let queue = []
//   queue.push(v);
//   this.marked[v] = true
//   while(queue.length){
//     let cur = queue.shift();
//     console.log('travel: '+cur)
//     this.marked[cur] = true
//     for(let w of this.adj[cur]){
//       if(this.marked[w] == true) continue ;
//       queue.push(w)
//     }
//   }
// }
function bfs(v){
  console.log('----BFS----');
  let queue = [];
  let depth = 0
  queue.push(v);
  this.marked[v] =true;

  while(queue.length){
    let count = queue.length;//记录当前层的个数
    //当前层尽心节点遍历
    while(count>0){
      count -= 1;
      let cur = queue.shift();
      this.marked[cur] = true;
      if(this.adj[cur]) console.log(`visit V: ${cur}`);
      //遍历当前图节点连同的节点
      for(let w of this.adj[cur]){
        if(this.marked[w]) continue;//无向图是相互联通的，防止死循环
        queue.push(w)
      }
    }
    //记录当前深度
    console.log(`cur depth is ${depth++}`)
  }
}

let myGraph = new Graph(10)
myGraph.addEdge(0,1)
myGraph.addEdge(0,2)
myGraph.addEdge(0,3)
myGraph.addEdge(1,5)
myGraph.addEdge(1,7)
myGraph.addEdge(2,8)

// myGraph.marked[1] = true
console.log('=====DFS====')
// myGraph.marked[1] = true
myGraph.dfs(1)
myGraph.resetMarked()
myGraph.bfs(0)