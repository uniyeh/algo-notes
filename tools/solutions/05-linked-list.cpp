#include <bits/stdc++.h>
using namespace std;
int main() {
    int n, q; cin >> n >> q;
    unordered_map<int,int> nxt, prv;
    vector<int> a(n);
    for (auto &x : a) cin >> x;
    const int HEAD = 0, TAIL = -1;
    int last = HEAD;
    for (int x : a) { nxt[last] = x; prv[x] = last; last = x; }
    nxt[last] = TAIL; prv[TAIL] = last;
    while (q--) {
        int op; cin >> op;
        if (op == 1) { int x, y; cin >> x >> y; int z = nxt[x]; nxt[x] = y; prv[y] = x; nxt[y] = z; prv[z] = y; }
        else { int x; cin >> x; int p = prv[x], z = nxt[x]; nxt[p] = z; prv[z] = p; }
    }
    vector<int> out;
    for (int cur = nxt[HEAD]; cur != TAIL; cur = nxt[cur]) out.push_back(cur);
    if (out.empty()) { cout << "EMPTY\n"; return 0; }
    for (size_t i = 0; i < out.size(); i++) cout << out[i] << " \n"[i + 1 == out.size()];
}
