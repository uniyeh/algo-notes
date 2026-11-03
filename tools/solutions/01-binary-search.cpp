#include <bits/stdc++.h>
using namespace std;
int main() {
    int n, q;
    cin >> n >> q;
    vector<long long> a(n);
    for (auto &x : a) cin >> x;
    while (q--) {
        long long x;
        cin >> x;
        int i = lower_bound(a.begin(), a.end(), x) - a.begin();
        cout << (i == n ? -1 : i) << '\n';
    }
}
