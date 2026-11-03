#!/usr/bin/env python3
"""產生練習題測資（給 assets/problems.js 用）。

用法：
    python3 tools/make_tests.py 03-bfs

流程：
    1. 編譯 tools/solutions/<id>.cpp（標準解）
    2. 依序執行 tools/tests/<id>/*.in
    3. 印出可直接貼進 problems.js 的 sample 與 tests 陣列
       - 第 1 筆測資視為範例，會附上明文輸出
       - 其餘只存 SHA-256 雜湊，網頁原始碼看不到正確答案
"""
import hashlib, json, pathlib, subprocess, sys, tempfile


def normalize(text: str) -> str:
    # 必須與 assets/judge.js 的 normalize() 完全一致
    lines = [ln.rstrip() for ln in text.replace("\r\n", "\n").split("\n")]
    while lines and lines[-1] == "":
        lines.pop()
    return "\n".join(lines)


def main():
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    pid = sys.argv[1]
    root = pathlib.Path(__file__).resolve().parent
    src = root / "solutions" / f"{pid}.cpp"
    ins = sorted((root / "tests" / pid).glob("*.in"), key=lambda p: int(p.stem))
    if not src.exists() or not ins:
        sys.exit(f"找不到 {src} 或 tests/{pid}/*.in")

    exe = pathlib.Path(tempfile.mkdtemp()) / "sol"
    subprocess.run(["g++", "-std=c++17", "-O2", "-o", str(exe), str(src)], check=True)

    tests, sample = [], None
    for i, f in enumerate(ins):
        inp = f.read_text()
        out = normalize(subprocess.run([str(exe)], input=inp, capture_output=True, text=True, check=True).stdout)
        if i == 0:
            sample = {"input": inp.rstrip("\n"), "output": out}
        tests.append({"input": inp, "hash": hashlib.sha256(out.encode()).hexdigest()})

    print("sample: " + json.dumps(sample, ensure_ascii=False) + ",")
    print("tests: " + json.dumps(tests, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
