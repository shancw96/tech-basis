//863. 二叉树中所有距离为 K 的结点

//失败：需要图的知识
//1.二叉树深度遍历，得到每层的深度，然后将二叉树转换为无向图，进行cost为2的查找
class Solution {
  public:
      vector<int> distanceK(TreeNode* root, TreeNode* target, int K) {
          //处理特殊情况
          if(K == 0) return {target->val};
          //init a graph
          buildGraph(root);
          
          //bfs
          queue<int> q;
          int steps = 0;
          q.push(target->val);
          while(q.size()){
              int size = q.size();
              while(size--){
                  int cur = q.front();
                  q.pop();vis[cur] = 1;
                  for(int next : g[cur]){
                      if(!vis.count(next))
                          q.push(next);
                  }
              }
              if(++steps == K) break;
          }
          
          //put answer from queue to ans
          vector<int> ans;
          while(q.size()){
              ans.push_back(q.front());
              q.pop();
          }
          
          return ans;
      }
  private:
      unordered_map<int, vector<int>> g;
      unordered_map<int, int> vis;
      void buildGraph(TreeNode* root){
          if(root == nullptr) return;
          buildGraph(root->left); 
          buildGraph(root->right);
          if(root->left) {
             g[root->val].push_back(root->left->val);
             g[root->left->val].push_back(root->val);
          }
          if(root->right){
              g[root->val].push_back(root->right->val);
              g[root->right->val].push_back(root->val);
          }
      }
  };
  
