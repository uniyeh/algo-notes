#include <bits/stdc++.h>
using namespace std;
int n; vector<int> L, R; vector<int> pre, in, post;
int dfs(int u) {
    if (u == -1) return 0;
    pre.push_back(u);
    int hl = dfs(L[u]);
    in.push_back(u);
    int hr = dfs(R[u]);
    post.push_back(u);
    return max(hl, hr) + 1;
}
void pr(const vector<int>& v) { for (size_t i = 0; i < v.size(); i++) cout << v[i] << " \n"[i + 1 == v.size()]; }
int main() {
    cin >> n; L.assign(n + 1, -1); R.assign(n + 1, -1);
    for (int i = 1; i <= n; i++) cin >> L[i] >> R[i];
    int h = dfs(1);
    pr(pre); pr(in); pr(post); cout << h << '\n';
}
