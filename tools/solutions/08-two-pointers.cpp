#include <bits/stdc++.h>
using namespace std;
int main() {
    int n; long long s; cin >> n >> s;
    vector<long long> a(n);
    for (auto &x : a) cin >> x;
    int best = INT_MAX; long long cur = 0;
    for (int l = 0, r = 0; r < n; r++) {
        cur += a[r];
        while (cur >= s) { best = min(best, r - l + 1); cur -= a[l++]; }
    }
    cout << (best == INT_MAX ? 0 : best) << '\n';
}
