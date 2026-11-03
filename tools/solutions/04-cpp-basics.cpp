#include <bits/stdc++.h>
using namespace std;
int main() {
    int n; cin >> n;
    long long sum = 0, mx = LLONG_MIN;
    for (int i = 0; i < n; i++) { long long x; cin >> x; sum += x; mx = max(mx, x); }
    cout << sum << ' ' << mx << '\n';
}
