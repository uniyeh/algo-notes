#include <bits/stdc++.h>
using namespace std;
int main() {
    int n; long long k; cin >> n >> k;
    unordered_map<long long,long long> cnt;
    long long ans = 0;
    for (int i = 0; i < n; i++) {
        long long x; cin >> x;
        auto it = cnt.find(k - x);
        if (it != cnt.end()) ans += it->second;
        cnt[x]++;
    }
    cout << ans << '\n';
}
