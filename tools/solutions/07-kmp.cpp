#include <bits/stdc++.h>
using namespace std;
int main() {
    string t, p; cin >> t >> p;
    int m = p.size();
    vector<int> f(m, 0);
    for (int i = 1, j = 0; i < m; i++) {
        while (j > 0 && p[i] != p[j]) j = f[j - 1];
        if (p[i] == p[j]) j++;
        f[i] = j;
    }
    vector<int> pos;
    for (int i = 0, j = 0; i < (int)t.size(); i++) {
        while (j > 0 && t[i] != p[j]) j = f[j - 1];
        if (t[i] == p[j]) j++;
        if (j == m) { pos.push_back(i - m + 1); j = f[j - 1]; }
    }
    cout << pos.size() << '\n';
    if (!pos.empty()) for (size_t i = 0; i < pos.size(); i++) cout << pos[i] << " \n"[i + 1 == pos.size()];
}
