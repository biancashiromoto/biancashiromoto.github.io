---
name: unit-tests
description: >
  Write unit tests for this Next.js/React/TypeScript portfolio project using Vitest and Testing Library.
  Use this skill whenever the user asks to write, add, create, or generate tests — unit tests, component tests,
  hook tests, or any test file. Also use when the user asks "how do I test X?", "write a test for Y",
  mentions test coverage, or asks what tests are missing. The project targets 80% coverage across all files.
  Stack: Vitest, @testing-library/react, @testing-library/user-event, @testing-library/jest-dom, jsdom.
  Tests are co-located with source files. This skill both writes test code and guides conventions
  so tests remain consistent across the codebase.
---

# Unit Tests — Portfolio Project

## Project testing stack

- **Vitest** — test runner and assertion library
- **@testing-library/react** — `render`, `screen`, `renderHook`, `act`
- **@testing-library/user-event** — realistic user interaction simulation
- **@testing-library/jest-dom** — DOM matchers (`toBeInTheDocument`, `toBeChecked`, etc.)
- **jsdom** — simulated DOM environment
- **setupTests.ts** — global setup: `IntersectionObserver` mock + jest-dom import

## Coverage target

The project targets **80% coverage** across all files. When writing tests for a file, cover enough cases to meet this threshold. Run `npm run coverage` to check. Prioritize lines and branches — not just statement count.

## File placement

Co-locate test files with the source file they test:

```
app/helpers/classes/Utils.ts
app/helpers/classes/Utils.test.ts              ✓

app/components/typewriter/hooks/useTypeWriter.tsx
app/components/typewriter/hooks/useTypeWriter.test.tsx  ✓
```

Use `.test.ts` for plain TypeScript, `.test.tsx` for files with JSX.

## Test data — objects and spread, no factories

Define default test data as plain const objects. Use spread to create variations. Never use factory functions.

```tsx
// ✓ correct
const defaultRepo = {
  id: 1,
  name: "my-project",
  description: "A short description",
  html_url: "https://github.com/biancashiromoto/my-project",
  homepage: "https://my-project.vercel.app",
  language: "TypeScript",
  topics: ["display", "react"],
};

// variation via spread
const repoWithoutHomepage = { ...defaultRepo, homepage: "" };
const repoWithLongDescription = {
  ...defaultRepo,
  description: "A".repeat(100),
};

// ✗ avoid
function createRepo(overrides = {}) {
  return { ...defaults, ...overrides };
}
```

The same pattern applies to default props for components:

```tsx
const defaultProps = {
  description: "Short description",
};

render(<ProjectDescription {...defaultProps} />);
render(<ProjectDescription {...defaultProps} description={"A".repeat(100)} />);
```

## Core conventions

### 1. Query elements by role or label — never by class or test-id

```tsx
// ✓ correct
screen.getByRole("button", { name: /read more/i });
screen.getByRole("switch");
screen.getByLabelText(/translate/i);
screen.getByText("Bianca");

// ✗ avoid
container.querySelector(".read-more");
screen.getByTestId("language-switch");
```

Querying by role mirrors how assistive technologies perceive the UI and makes tests resilient to CSS changes.

### 2. Use `userEvent` over `fireEvent`

```tsx
// ✓ correct — simulates real browser events (pointerdown, focus, click, etc.)
const user = userEvent.setup();
await user.click(screen.getByRole("button", { name: /read more/i }));

// ✗ avoid
fireEvent.click(button);
```

### 3. Use `renderHook` for hooks

```tsx
import { renderHook, act } from "@testing-library/react";

const { result } = renderHook(() => useReadMore("long text here", 10));

act(() => {
  result.current.toggleReadMore();
});

expect(result.current.isExpanded).toBe(true);
```

### 4. Use `vi.useFakeTimers` for hooks with `setTimeout`/`setInterval`

```tsx
beforeEach(() => vi.useFakeTimers());
afterEach(() => vi.useRealTimers());

it("types the first character after the delay", () => {
  const { result } = renderHook(() =>
    useTypeWriter({ text: "Hello", delay: 100, infinite: false }),
  );

  act(() => {
    vi.advanceTimersByTime(100);
  });

  expect(result.current.currentText).toBe("H");
});
```

**Heads up — hooks with state-chained timers:** when each state update registers the next timeout (e.g. `useTypeWriter`, where typing one character schedules the next), advancing `delay * n` all at once only fires the first timeout. Each re-render must happen before the next timeout is registered. Use a step-by-step helper instead:

```tsx
const advanceByNSteps = (n: number, delay: number) => {
  for (let i = 0; i < n; i++) {
    act(() => vi.advanceTimersByTime(delay));
  }
};

// ✓ correct — lets React re-render between each step
advanceByNSteps(5, 100);
expect(result.current.currentText).toBe("Hello");

// ✗ incorrect — only fires the first timeout
act(() => vi.advanceTimersByTime(500));
expect(result.current.currentText).toBe("Hello"); // fails: receives "H"
```

### 5. Mock context with `vi.mock`

When a component calls a context hook (e.g., `useLanguage`), mock the entire module rather than mounting the real provider. This isolates the component and lets you control the returned values precisely.

```tsx
vi.mock("@/app/context/LanguageProvider", () => ({
  useLanguage: vi.fn(),
}));

const mockUseLanguage = vi.mocked(useLanguage);

const defaultLanguageContext = {
  isLanguagePortuguese: false,
  toggleLanguage: vi.fn(),
  information: { _translateButtonLabel: "Traduzir para o português" } as any,
  isLoading: false,
};

beforeEach(() => {
  mockUseLanguage.mockReturnValue(defaultLanguageContext);
});

// variation via spread
mockUseLanguage.mockReturnValue({
  ...defaultLanguageContext,
  isLanguagePortuguese: true,
  information: { _translateButtonLabel: "Translate to English" } as any,
});
```

### 6. Mock `fetch` with `vi.stubGlobal`

```tsx
vi.stubGlobal(
  "fetch",
  vi.fn().mockResolvedValue({
    ok: true,
    json: async () => mockRepos,
  }),
);
```

Always call `vi.restoreAllMocks()` in `beforeEach` to prevent leaking mocks between tests.

## Test structure

Use `describe` to group by unit, then nest `describe` blocks for method/behavior groupings. Write `it` descriptions as plain statements of expected behavior — not "should do X", just "does X when Y".

```ts
describe("Utils", () => {
  describe("formatProjectTitle", () => {
    it("converts hyphens to spaces and capitalizes each word", () => { ... });
    it("handles an empty string", () => { ... });
  });
});
```

## What to test per file type

### Pure utility functions (`Utils.ts`, pure helpers)

- Each method gets its own `describe` block
- Cover: happy path, edge cases (empty string, empty array), boundary values, both branches of conditionals
- Mock `navigator.language` and `localStorage` when the method reads them

### Hooks

- Use `renderHook` for all hooks
- Cover: initial state, state after each interaction, behavior when props change (`rerender`)
- Wrap all state-triggering calls in `act`
- For timer-based hooks: use `vi.useFakeTimers` and `advanceByNSteps`

### Components

- Cover: default render, conditional rendering (each branch), all user interactions
- Test what the user sees and can do — not internal state or CSS class names
- When the component uses context: mock with `vi.mock`

### Async functions (`fetchRepos` and similar)

- Mock `fetch` with `vi.stubGlobal`
- Cover: successful response, `ok: false` error response, filtering logic, empty result set

## Imports template

```tsx
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, renderHook, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
```

## Path aliases

Use `@/` as the root alias, same as in source files:

```tsx
import { useLanguage } from "@/app/context/LanguageProvider";
import Utils from "@/app/helpers/classes/Utils";
```

## When writing test files

1. Read the source file in full before writing tests
2. Identify every branch, condition, and code path
3. Write tests that cover at least 80% of them
4. Place the test file next to the source file
5. Run `npm run coverage` to verify the threshold is met for that file
6. Run `npm run build` to verify no type errors were introduced in the test file
7. Run `npx tsc --noEmit` to verify no type errors were introduced in the test file
