
### 0.1.0
- Make files available at root level for cleaner direct imports. This allows you to cherry pick and allows for smaller compiled bundles.
- Add withQuery HoF that is more composable with other HoC functions (using recompose for example).

```
withQuery(query, options)(component);
```

### 0.0.5
- Improved stability

### 0.0.2

- Added single option to the query