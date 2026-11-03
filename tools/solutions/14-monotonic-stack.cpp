#include <bits/stdc++.h>
using namespace std;
int main() {
    int n; cin >> n;
    vector<long long> a(n); for (auto &x : a) cin >> x;
    vector<long long> ans(n, -1); stack<int> st;
    for (int i = 0; i < n; i++) {
        while (!st.empty() && a[st.top()] < a[i]) { ans[st.top()] = a[i]; st.pop(); }
        st.push(i);
    }
    for (int i = 0; i < n; i++) cout << ans[i] << " \n"[i + 1 == n];
}
