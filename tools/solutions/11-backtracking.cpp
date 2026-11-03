#include <bits/stdc++.h>
using namespace std;
int n, k; vector<int> path;
void go(int start) {
    if ((int)path.size() == k) { for (int i = 0; i < k; i++) cout << path[i] << " \n"[i + 1 == k]; return; }
    for (int i = start; i <= n - (k - (int)path.size()) + 1; i++) { path.push_back(i); go(i + 1); path.pop_back(); }
}
int main() { cin >> n >> k; go(1); }
