# What & Why?

This `useSyncedState` hook provides a convenient way to create a piece of state that stays synchronized with an external value (`initialState`) even if that value changes over time. Unlike `useState`, which only uses the initial value on the first render, `useSyncedState` watches for changes to `initialState` and updates the internal state accordingly.

This is especially useful when you need _both_ of the following:

- A _controlled_ initial value that can be updated externally (e.g., from props or context), and
- The ability to call `setState` locally to override the value temporarily in response to user actions.

By calling `setState(initialState)` inside a `useEffect` that depends on `initialState`, the hook ensures that whenever the input changes, the internal state resets to reflect the new source of truth. This pattern is important in scenarios like forms or editable components that need to reset when upstream data updates.

The hook returns a `[state, setState]` tuple identical to `useState`, so you can continue to treat it as regular state in your component logic.

**Important:**
You should only use this hook if you need the ability to call the setter. If you just want to derive a value that updates when dependencies change but don’t need to set it yourself, prefer `useMemo` for simpler and more predictable behavior.
