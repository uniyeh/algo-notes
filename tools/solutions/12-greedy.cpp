#include <bits/stdc++.h>
using namespace std;
int main() {
    int n; cin >> n;
    vector<pair<long long,long long>> v(n);
    for (auto &[s, e] : v) cin >> s >> e;
    sort(v.begin(), v.end(), [](auto &a, auto &b) { return a.second < b.second; });
    long long end = LLONG_MIN; int cnt = 0;
    for (auto &[s, e] : v) if (s >= end) { cnt++; end = e; }
    cout << cnt << '\n';
}
