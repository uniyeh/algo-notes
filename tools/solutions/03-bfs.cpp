#include <bits/stdc++.h>
using namespace std;
int main() {
    int n, m;
    cin >> n >> m;
    vector<string> g(n);
    for (auto &r : g) cin >> r;
    vector<vector<int>> d(n, vector<int>(m, -1));
    queue<pair<int,int>> q;
    d[0][0] = 0; q.push({0, 0});
    int dx[] = {1,-1,0,0}, dy[] = {0,0,1,-1};
    while (!q.empty()) {
        auto [x, y] = q.front(); q.pop();
        for (int k = 0; k < 4; k++) {
            int nx = x + dx[k], ny = y + dy[k];
            if (nx < 0 || ny < 0 || nx >= n || ny >= m || g[nx][ny] == '#' || d[nx][ny] != -1) continue;
            d[nx][ny] = d[x][y] + 1; q.push({nx, ny});
        }
    }
    cout << d[n-1][m-1] << '\n';
}
