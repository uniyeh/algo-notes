#include <bits/stdc++.h>
using namespace std;
int main() {
    int q; cin >> q;
    while (q--) {
        string s; cin >> s;
        stack<char> st; bool ok = true;
        for (char c : s) {
            if (c == '(' || c == '[' || c == '{') st.push(c);
            else {
                char want = c == ')' ? '(' : c == ']' ? '[' : '{';
                if (st.empty() || st.top() != want) { ok = false; break; }
                st.pop();
            }
        }
        cout << (ok && st.empty() ? "YES" : "NO") << '\n';
    }
}
