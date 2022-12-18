Using `await` on the IC can cause state to "shift under your feet" and open possible reentrancy attacks.

In this repo, we prove this with a simple function `test()`, which increments some internal canister state and makes async calls to another internal function `foo()`.

We then call this function 100 times in our test script.

If each call to `test()` held a lock on the internal state, we would always see it return three numbers incrementing by one, such as:

i0 = 1, i1 = 2, i2 = 3  
i0 = 3, i1 = 4, i2 = 5  
i0 = 5, i1 = 6, i2 = 7

However, each `await` allows some other message to occur within the control flow of our function, we see something more like:

i0 = 0, i1 = 96, i2 = 196  
i0 = 0, i1 = 54, i2 = 154  
i0 = 0, i1 = 41, i2 = 141

```
npm i
npm start
npm t
```
