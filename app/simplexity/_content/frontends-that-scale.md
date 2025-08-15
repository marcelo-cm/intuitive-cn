---
title: Designing ~~good~~ great Frontends That Scale
description: How I design my frontends & a terminology crash course!
date: Living Document
visibility: unlisted
---

# Context

I've spent the past couple year of my life diving into countless codebases and building many from scratch. As someone obsessed with code quality, consistency, and legibility, I've become highly opinionated about effective patterns. In this piece, I will discuss my approach for directory structures, file naming conventions, service/hook patterns, linting rules, and other architectural decisions that can make or break a project.

On top of this, I will break down the basic terminology often used in front-end development. This was a major pain-point in my learning process; without knowing more terms you cannot expand your learning surface area.

This is my version of [Bulletproof React](https://github.com/alan2207/bulletproof-react/tree/master), which is an awesome resource I would recommend higher than this guide.

**Disclaimer #1:** This isn't meant to be the definitive approach—it's my approach, refined through experience. I continue to learn and evolve my practices with every new collaboration.
**Disclaimer #2:** We'll focus primarily on foundational concepts, as advanced topics deserve their own in-depth analysis.

## Who is this helpful for?

Early engineers...

1. ...who are taking the lead on project architecture but haven't become opinionated about how they codebase structure (particularly front-ends).
2. ...feel stuck in their learning journey and need direction on what to explore next.
3. ...are nerds, and want to understand how other engineers approach design decisions to inform their own practices.

My goal is to provide you with a thoughtful starting point—not a rigid rule-book. Use these ideas as a foundation to develop your own informed opinions about what works and what doesn't.

# Directory Structure

Your directory structure is the hierarchical system that organizes files and resources in your codebase. In simpler terms, it's the way your folders are structured—it's the architectural blueprint of your entire codebase.

While it might seem like a mundane detail, a well designed directory:

- Reduces cognitive load when navigating the codebase
- Makes relationships between different parts of your application clear
- Facilitates code reuse by clearly organizing shared resources
- Serves as a sort of implicit documentation for new team members

When designing an effective directory structure, consider these key goals:

1. **Ease of Access:** Can you quickly find the file you’re looking for?
2. **Logical Separation:** Are files grouped in a way that makes sense conceptually?
3. **Onboarding Simplicity:** If someone new opens your codebase, can they easily understand where to start and how things are connected?

## Patterns

Directories can get really big. For Next.js applications, I've found that mirroring the routing structure in the directory organization creates a natural and intuitive layout. Files are placed under the route name that consumes them, creating a clear correlation between URLs and code location.

```bash
src/
├── app/
│   ├── [route-name]/
│   │   ├── _layers/  # Grouped by responsibilities within this route
│   │   │   ├── data-fetch.tsx   # Data fetching logic (async component that fetches server data and feeds to view)
│   │   │   ├── view.tsx   # Actual code rendered to the client
│   │   │   └── fallback.tsx    # Fallback/placeholder view
│   │   └── page.tsx
│   └── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/
│   │   └── button.tsx
│   │   └── modal.tsx
│   ├── [route-name]/
│   │   ├── component.tsx
│   │   └── ...
│   └── ...
├── context/
│   ├── [route-name]/
│   │   └── context.tsx
│   └── ...
├── constants/      # Static values shared across the app
│   ├── [route-name]/
│   │   └── interfaces.ts # Each of these could be their own folder. In that case, the file names would be the route names. (ie. interfaces/route-name.ts)
│   │   └── enums.ts
│   │   └── interfaces.ts
│   │   └── types.ts
│   └── ...
├── hooks/          # Custom React hooks
│   ├── use-[resource-name].ts
│   └── ...
├── services/       # API calls and external service integrations
│   ├── [resource-name]-service.ts
│   └── ...
├── lib/          # Utility functions, helpers, or libraries that are project-specific but not tied to a particular feature
│   ├── utils.ts  # Using Shadcn, you probably have to have this file in this exact place unless you configure it otherwise manually.
│   ├── supabase  # Being that supabase is really common, I also included the 4 files I make them using it.
│   │   └── admin.ts
│   │   └── client.ts
│   │   └── middleware.ts
│   │   └── server.ts
│   └── ...
└── public/         # Static files like images and fonts
    ├── images/
    └── ...
```

This is good because:

1. **Route-Level Encapsulation:** Each route's specific logic, components, and utilities are contained within its own directory, making it easier to understand and modify route-specific functionality.
2. **Intelligent Resource Sharing:** Common components and utilities are organized by their lowest common parent route, preventing unnecessary coupling while maintaining easy access.
3. **Sustainable Growth:** New features and routes can be added without disrupting the existing structure, making the codebase more maintainable over time.

Consistency in file naming is also crucial. I recommend:

- Using one case style for general files (`snake_case`, `kebab-case`, or `camelCase`).
- Reserve `PascalCase` for React Components
- (Some prefer this, I don't) Being explicit in file names about their purpose (ie `Name.component.tsx` rather than `Name.tsx`)

## Further Exploration

For those really interested by this, you should dive into the following topics:

- **Separation of Concerns (SoC):** Understanding how to properly isolate different types of logic (presentation, business, data) can dramatically improve code maintainability
- **MVC Architecture:** While not always directly applicable to frontend work, understanding MVC principles can inform better architectural decisions
- **Feature-Driven Development (FDD):** An alternative approach to organization that can be particularly effective for larger applications

# Hooks

React Hooks completely changed how React components were written by enabling state management & side effects from within functional components...luckily you and I never have to experience this pain and instead can enjoy them!

A Hook is a special function in React that have many benefits:

- **Simplified State Management:** Manage component state with class components
- **Reduction of Code Duplication:** Reuse logic across components by encapsulating it within custom hooks.
- **Cleaner Code:** Separate logic into dedicated files/hooks, keeping components focused and readable.
- **Consistent Behavior:** Centralize state management logic to ensure uniform behavior across your app.

There are various [Rules of Hooks](https://react.dev/warnings/invalid-hook-call-warning) that must be followed. For example, all hooks are named with the `use` prefix, such as `useHook`, they must be called at the top level of your functions, and are exclusive to client components.

## Patterns

The pattern for this is quiet popular and straight forward. There's a few ways to structure them, depending the future of your hook.

### API Interaction Hooks

These hooks manage API calls and related state, often needing access to React's context or other hooks.

```ts
/**
 * useResources is a hook that returns all CRUD operations to interact with an API.
 */
export function useResource() {
  const { value } = useCustomContext()
  // You can use hooks within this component too

  function createResource(data: object, ...) { // CREATE
    //pass
  }

  function getResourceById(id: string, ...) { // READ
    //pass
  }

  function getResources(...) { // LIST
    //pass
  }

  function updateResourceById(id: string, ...) { // UPDATE
    //pass
  }

  function deleteResourceById(id: string, ...) { // DELETE
    //pass
  }

  return {
    createResource,
    getResourceById,
    getResources,
    updateResourceById,
    deleteResourceById,
  };
}
```

### Data Fetching and Caching Hooks

This pattern does not return any functions, but instead only the most up to date data that is cached, and only updated when they must be (relevant data has changed).

```ts
const useUserData = (userId: string) => {
  const [data, setData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const auth = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await api.users.get(userId, auth.token);
        setData(response.data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId, auth.token]);

  return { data, loading, error };
};
```

### Action-Specific Hooks

This is the traditional way of building/using a custom hook. They're ideal for managing states, handling browser APIs and implementing UI behaviours.

```ts
/**
 * useSearch is used to trigger a search with my backend API, and to inform
 * the frontend when the search is processing via the isSearching state.
 */
export const useSearch = () => {
  const [isSearching, setIsSearching] = React.useState<boolean>(false);

  const search = async (query: string): Promise<string> => {
    setIsSearching(true);

    const data = await fetchClient.post('/semantic/search', {
      query,
    });

    const id = (data as { history_id: string }).history_id;

    setIsSearching(false);
    return id;
  };

  return {
    search,
    isSearching,
  };
};
```

## Best Practices

1. **Keep Hooks Simple.** They're meant to have single responsibility and be very modular. Break complex hooks into smaller ones.
2. **Handle your errors.** If you're interacting with APIs, it's hard for the consumer of the hook to handle errors since they're really only being returned the data.
3. **Type safety rocks.** Use typescript to your advantage!

## Further Exploration

I would strongly recommend reading [React docs](https://react.dev/reference/react/hooks) about hooks to learn about the popular hooks like:

**State Management**

- `useState`: Manage local component state
- `useReducer`: Handle complex state logic
- `useContext`: Access React context

**Performance Optimization**

- `useMemo`: Memoize computed values
- `useCallback`: Memoize functions
- `useTransition`: Manage state updates priority

**Side Effects**

- `useEffect`: Handle side effects
- `useLayoutEffect`: Handle synchronous effects

**DOM Interaction**

- `useRef`: Access DOM elements directly
- `useImperativeHandle`: Customize component refs

Then, take a look at the hooks that come from third party packages like `react-form-hook` (Form handling) & `react-query` (Data fetching)!

Lastly, look into testing & optimization strategies for hooks.

# Services

## Terminology

Services are a fundamental architectural pattern that helps organize and manage your application's business logic and data operations. They serve as a bridge between your UI components and external resources or complex internal operations, providing a clean separation of concerns.

- **Centralized Logic:** Consolidate shared functionality, like API calls or data transformations, into dedicated service files.
- **Enhanced Testability:** Isolate logic into services, making it easier to write unit tests for core functionality.
- **Consistency Across Components:** Ensure uniform behavior for tasks like error handling or data normalization by using shared services.

Services are usually _framework agnostic_. They also work well with other libraries (ie. Zustand).

## Patterns

### Repository Pattern

This might look familiar... because it is. It's essentially the same shape as my hook, but without any state or context consumption. Each function can be imported individually, offering better tree-shaking and clarity of use.

```ts
export function createResource(data: object, ...) { // CREATE
  //pass
}

export function getResourceById(id: string, ...) { // READ
  //pass
}

export function getResources(...) { // LIST
  //pass
}

export function updateResourceById(id: string, ...) { // UPDATE
  //pass
}

export function deleteResourceById(id: string, ...) { // DELETE
  //pass
}
```

### Service Class Pattern

This traditional pattern organizes related functionality into a cohesive service object, maintaining internal state when necessary. It's particularly useful for complex operations that need to share state or configuration.

```ts
export const resourceService = {
  state: [] as string[],
  method: (args: string) => {
    //pass
  },
  async asyncMethod(args: string) {
    //pass
  },
};
```

You can also build them as classes in a similar pattern, but the class can also take props to set up default states that might need to be set dynamically.

## Best Practices

1. Each service should handle one specific domain/functionality
2. Never modify service state directly

## Further Exploration

1. **API Abstraction** – Using libraries like Axios or Fetch for reusable service functions.
2. **Caching** – Tools like React Query, SWR, or custom in-memory caching.
3. **State Management** – Integrating services with Redux, Zustand, or Context API.
4. **Testing Services** – Mocking APIs and writing unit tests for service functions.
5. **Performance Optimization** – Batching, debouncing, and rate limiting API requests.

# Context

## Terminology

Context is a feature that allows you to share values (like state or functions) across the component tree without having to pass props down manually at every level. It helps to:

1. **Avoid Prop Drilling:** Reduces the need to pass props through many layers of components.
2. **Global State Management:** Simplifies state management for global data that many components need access to.
3. **Improved Readability:** Makes the component structure cleaner and easier to understand.

Context can be very complicated when you're using it to its fullest potential. Your best move is to read the [React documentation](https://react.dev/reference/react/useContext) on it, but hopefully this gives you some insight on how to work with it.

Below is a _basic_ context provider structure.

## Patterns

```tsx
type DataTableContextType<T> = {
  ...
};

// Create a generic context
const DataTableContext = createContext<DataTableContextType<any> | undefined>(
  undefined
);

// Provider component
export function DataTableProvider<T extends { id: string }>({
  props
}: {
  props: any
}) {
  const [state, setState] = useState<T[]>(...);

  const sharedFunction = useCallback(
    async (...) => {
     ...
    },
    [...dependencies],
  );


  return (
    <DataTableContext.Provider
      value={{
        state,    // Notice that the Dispatch action/setState isn't passed, as this is normally managed within the context itself.
        sharedFunction,
      }}
    >
      {children}
    </DataTableContext.Provider>
  );
}

export const useDataTable = () => {
  const context = React.useContext(DataTableContext);

  if (!context) {
    throw new Error('useDataTable must be used within a DataTableProvider');
  }

  return context;
};
```

To consume this in a frontend component, you first have to wrap the component that you want to consume it from in the ContextProvider you made in your context file. For example:

```tsx
<DataTableProvider {...props}>
  <DataTable {...propsForDataTable} />
</DataTableProvider>
```

Now, every component inside DataTable (including itself) can consume the values from DataTableProvider. It does so like this:

```tsx
const { state, sharedFunction } = useDataTable();
```

Create separate contexts for different concerns. Consider update frequency when designing context structures to avoid re-renders when unnecessary.

## Further Exploration

1. **Advanced Patterns:** Context composition, with reducers, with observables, etc.
2. **React Performance Optimization:** Understand how Context affects performance and how to optimize it.
3. **React Query:** Explore data fetching and caching with React Query, which can work well with Context. I personally haven't used React Query

# Linting

## Terminology

Personally, linting is my favourite thing to nerd out about. By definition, linting is the process of analyzing for potential errors, stylistic issues, and violations of predetermined coding standards. In other words, linting is how you can keep your code clean. As a nerd for clean code, there are two main benefits:

1. **Code Quality:** Helps maintain high code quality by catching errors and enforcing best practices.
2. **Consistency:** Ensures consistent coding styles across the codebase, making it easier to read and maintain.
3. **Team Collaboration:** Facilitates better collaboration among team members by ensuring everyone follows the same coding standards.

## Scripts

For linting, I recommending ESLint and Prettier—both very popular tools. For prettier, this is my `.prettierrc`:

```JSON
{
  "plugins": ["@trivago/prettier-plugin-sort-imports", "prettier-plugin-tailwindcss"], // It's important to note that the tailwind plugin must be last
  "tailwindFunctions": ["clsx", "tw"],
  "singleQuote": true,
  "importOrder": [
    "^react$|^react/(.*)$",
    "^@radix-ui/react-icons|^lucide-react",
    "^@?\\w",
    "^(.*)/(ui|components)/(.*)$",
    "^(.*)/hooks/(.*)$",
    "^@/(.*)$",
    "^[./]"
  ],
  "importOrderSortSpecifiers": true,
  "importOrderSeparation": true,
  "importOrderGroupNamespaceSpecifiers": true
}
```

Additionally, I use `ES2017` standards.

## Further Exploration

Firstly, this is a great feature built into Typescript—it prevents errors at build time as well as handles potential errors at run time. If this intrigues you as much as it does for me, research ESLint and [Prettier plugins](https://dev.to/kachidk/common-prettier-plugins-installation-30hc), or consider writing your own if you're really nerdy!

You can also look into CI pipelines that enforce this linting before code can be merged into your main branch, or deployed.

I've written further on this topic in depth (regarding my own developer experience practices) in another article: [My favourite VSCode Extensions, linting rules, and scripts](/simplexity/devx-practices)

# Conclusion

While none of these patterns are fast and hard, over my last 2 years being a developer, these are the patterns that have worked best for me in building robust web applications. At the end of the day, the only things that matters is how well your code can scale without slowing you down. TO move fast, you must first move slow...

If you have any questions, comments, suggestions, or corrections, as always please email me at [marcechaman@gmail.com](mailto:marcechaman@gmail.com)
