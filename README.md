# Simple State Machine

```
create order --> Placed --> Verified --> Shipped
                   |           |
                   v           |
                Cancelled <-----
```

Run with

```
tsc main.ts && node main.js
```