
## why,
**i'm passionate about finance and writing webapps, i really miss writing c++, i'm tired of the react+typescript standard that is unironically bloating the web, and i wanted to challenge myself**

so i built a bank statement analyzer that extracts transactions from PDFs—entirely in your browser. no servers, no APIs, no data leaves your machine.

**what's niche about it? webassembly for compute + svelte for UI.**

---

## what is webassembly?

**webassembly (wasm)** = binary instruction format for a stack-based virtual machine

```
c++/rust → llvm → .wasm bytecode → browser jit → machine code
cx: llvm is set of compiler and toolchain technologies that can be used to develop
a frontend from any programming language.
```

**key features:**
- linear memory model, sandboxed execution
- 1.5x-4x faster than optimized js
- 98% browser coverage, no jit warmup

---

## the problem

parse bank PDFs from **any** canadian/us bank using regex patterns. requirements: fast, private, offline.

**universal pattern:** date → date → description → amount
- pdf.js extracts continuous text (not lines), enabling format-agnostic parsing
- 10 specialized patterns covering 95-98% of north american banks
- patterns 1-2 (45%): rbc, cibc, chase, boa
- patterns 3-10: simple formats, csv exports, multi-currency

---

## why wasm?

**speed:** js regex 300-500ms → wasm 80-120ms (3-4x faster)

**privacy:** all processing in browser, zero network calls, gdpr-compliant by design

**portability:** same binary runs on x86/arm/risc-v, works everywhere (chrome/firefox/safari/node/cloudflare workers)

---

## the c++ implementation

**universal pattern in code:**
```cpp
std::vector<Transaction> TransactionExtractor::extract(const std::string& text) {
  // pattern: (date) (date) (description) (amount.xx)
  // continuous text from pdf.js, not line-by-line
  std::regex transactionPattern(
    R"(((?:Jan|Feb|Mar|...|Dec)[a-z]*\s+\d{1,2}|
        \d{1,2}[/-]\d{1,2}[/-]\d{2,4})\s+)"
    // followed by post date, description, amount patterns
  );
}
```

**why this works:**
- pdf.js extracts **continuous text with multiple spaces**, not lines
- pattern matches entire transaction sequence in stream
- format-agnostic: works regardless of bank's layout

---

## the compilation pipeline

```bash
emcc -O2 --bind -s WASM=1 -s ALLOW_MEMORY_GROWTH=1 \
  transaction_extractor.cpp -o bank_analyzer.js
```

**output:** `bank_analyzer.wasm` (236KB) + `bank_analyzer.js` (88KB glue code)

---

## the javascript ↔ c++ bridge

**svelte:**
```svelte
const module = await loadAnalyzerModule();
const transactions = module.extractTransactions(text);
transactionStore.set(transactions); // reactive update
```

**c++:**
```cpp
EMSCRIPTEN_BINDINGS(bank_analyzer) {
    function("extractTransactions", &extractTransactions);
}
```

**why svelte?** reactive stores + no virtual DOM, leading to instant UI updates, and it's also really lightweight compared to react

---

## the gotchas

⚠️ **memory:** use `-s ALLOW_MEMORY_GROWTH=1` or you'll hit "memory access out of bounds"

⚠️ **async:** always `await loadModule()` before calling wasm functions

⚠️ **optimization:** `-O2` is the sweet spot (236KB), `-O3` smaller but slower compile

⚠️ **debugging:** add `-gsource-map` for chrome devtools support

---

## performance

**breakdown (chrome 131, m1 mac):**
```
wasm load:     22ms (cached)
pdf extract:   45ms
c++ regex:     87ms
svelte render: 3ms
total:         157ms
```

**vs. alternatives:**
- react + js: 395ms (2.5x slower)
- python backend: ~700ms (4.5x slower + network)

**why svelte wins:**
- no virtual dom = ui updates instantly
- compiler-based = 12kb bundle vs react's 45kb
- direct dom manipulation = zero reconciliation overhead

```
cx: the real dom is the actual, browser-rendered representation of a web page
that is slow to update, while the virtual dom is a lightweight, in-memory
javascript representation of the real dom that is much faster for handling updates
```

**production:** 95%+ accuracy, zero server costs, gdpr-compliant by design

---

## why this stack works

> **wasm for compute, svelte for ui = performance without complexity**

```
WASM: near-native speed, no GC pauses, type-safe
Svelte: direct DOM updates, compile-time reactivity
```

**when to use:**
- performance-critical apps (data viz, finance, scientific tools)
- privacy-first (client-side compute, no telemetry)
- edge computing (cloudflare workers + sveltekit)

**when not to:**
- simple CRUD apps (svelte alone is fine, skip wasm)
- large teams already invested in react

---

## resources

**docs:**
- emscripten: https://emscripten.org/docs/getting_started/
- webassembly.org: https://webassembly.org/
- MDN webassembly guide

**my implementation:**
- github: [https://github.com/tripzcodes/Teller](https://github.com/tripzcodes/Teller)
- live demo: [https://tellerapp.ca](https://tellerapp.ca)