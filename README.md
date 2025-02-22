# Welcome to IntuitiveCN by [Intuitive Labs](https://intuitivelabs.co/)

IntuitiveCN is a boilerplate repository for creating a full-stack web application with Next.js, Tailwind CSS, and Supabase. It is built with the intention of being used as a starting point for any project, in an opinionated way.

## Features

### Hooks

#### [use-global-loading](./hooks/use-global-loading.tsx)

The `useGlobalLoading` hook is a simple hook, that returns the global loading state and allows you to set the loading state. This purpose of this is to have one state to control the loading state of the application, in cases where you have multiple functions that might trigger loading states, but want to consider them as a single loading state.

For example, if you have a dashboard with a create, edit, and delete action, you can use this hook to control the loading state of the application, and not have to manage the loading state for each action. Then you can use the `isLoading` state to conditionally render a loading state, or disable buttons/inputs on the screen.

```tsx
const { isLoading, setLoading } = useGlobalLoading();

if (isLoading) {
  return <div>Loading...</div>;
}
```

#### [use-mobile](./hooks/use-mobile.tsx)

> author: [@Shadcn](https://ui.shadcn.com/docs/components/accordion)

The `useMobile` hook is a simple hook that returns the mobile state.

```tsx
const isMobile = useMobile();

if (isMobile) {
  return <div>Mobile</div>;
}

// or

const isMobile = useMobile(768);

if (isMobile) {
  return <div>Mobile</div>;
}
```

#### [use-server-action](./hooks/use-server-action.tsx)

The `useServerAction` hook is used to execute a server action and handle the response. It is a wrapper around the `serverAction` function, and returns a tuple containing the client server action and a boolean indicating if the action is executing.

It also has a default error handling, that displays a toast error, and a default success handling, that displays a toast success, both of which are configurable.

It handles refreshing the page after the action is executed (helpful for refreshing the page after a resource is created), and redirects to the given URL after the action is executed.

```tsx
const [clientServerAction, executing] = useServerAction({
  action: serverAction,
  onError: {
    title: 'Error',
    message: 'An error occurred',
    action: ({ router, data }) => {
      router.push('/resource/' + data.id);
    },
  },
  onSuccess: {
    title: 'Success',
    message: 'The action was successful',
    action: ({ router, error }) => {
      router.replace(`/error?error=${error}`);
    },
  },
});
```

#### [use-update-search-params](./hooks/use-update-search-params.tsx)

The `useUpdateSearchParams` hook is used to update the search params. It is a wrapper around the `useRouter` hook, and returns a function that updates the search params.

```tsx
const updateSearchParams = useUpdateSearchParams();

updateSearchParams({
  page: 1,
  limit: 10,
});
```

> author: [@Shadcn](https://ui.shadcn.com/docs/components/accordion)

### Linting & Formatting ([.prettierrc](.prettierrc))

```json
{
  "plugins": [
    "@trivago/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss"
  ],
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

We use [@trivago/prettier-plugin-sort-imports](https://github.com/trivago/prettier-plugin-sort-imports) to sort the imports, and [prettier-plugin-tailwindcss](https://github.com/tailwindlabs/tailwindcss/tree/master/packages/prettier-plugin) to format the tailwind css.

We also wrote custom ordering for the imports, so that we can have the imports grouped by type, and then sorted alphabetically.

### Scripts ([package.json](./package.json))

```json
"scripts": {
    "dev": "next dev --turbo && tsc && prettier --check .",
    "build": "next build",
    "start": "next start",
    "lint": "prettier --check . && tsc",
    "lint:type": "tsc",
    "lint:fix": "prettier --write . && tsc",
    "format": "prettier --write .",
    "analyze": "ANALYZE=true next build",
    "clean": "rm -rf .next/",
    "clean:build": "rm -rf .next/ && next build",
    "size-check": "npx cost-of-modules && du -sh node_modules/",
    "prepare": "husky install",
    "test": "jest",
    "test:watch": "jest --watch"
  },
```

There's a comprehensive list of scripts that are available to use in the project. Some of the more useful ones are:

- `lint:fix` — Uses prettier to fix linting errors, and then typechecks the project.
- `analyze` — Uses bundle analyzer to analyze the bundle size of the project — this is useful to check if we're using too many modules, and to identify which ones are taking up the most space.
- `clean` — Removes the `.next` folder, so that we can start fresh.
- `clean:build` — Removes the `.next` folder, and then builds the project.
- `size-check` — Uses `cost-of-modules` to check the cost of the modules in the project. Helpful fo auditing your dependencies.
- `prepare` — Installs the husky git hooks.

## Technologies

We use [Prettier](https://prettier.io/) for linting and formatting.

We use [ESLint](https://eslint.org/) for linting.

We use [Jest](https://jestjs.io/) for testing.

We use [Supabase](https://supabase.com/) for the database.

We use [Next.js](https://nextjs.org/) for the frontend.

We use [Tailwind CSS](https://tailwindcss.com/) for the styling.

We use [Drizzle](https://drizzle.dev/) for the database.

## Patterns

### Server Actions

Server actions are a way to execute server-side code from the client. They are a way to handle form submissions, and other actions that need to be executed on the server.

They are defined in the `app/_actions` folder, and are named like `[name].ts`.

When writing server actions, we follow these guidelines:

- Write ALL functions in CRUD order.
- Use `async function` notation for the function definition
- Use object notation for the parameters, and destructure them in the parameters where necessary.
  - Use interfaces to type the parameters and response type if not simply returning a primitive type or a model defined in your schema
- Use the `revalidatePath` function to revalidate the path after the action is executed. This is helpful for updating the data on the client side after the action is executed.
- Use the `redirect` function to redirect the user to a different page after the action is executed.

#### Example

```ts
// RESPONSE HELPER TYPES
type ServerActionResponse<T> = {
  status: 'success' | 'error';
  data: T;
  error?: {
    code?: string;
    message: string;
    details?: Record<string, any>;
  };
};

// Create
export async function createUser(
  user: z.infer<typeof CreateUserSchema>
): Promise<ServerActionResponse<TUser>> {
  try {
    const data = await (...)

    return {
      status: 'success',
      data,
      error: null,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 'error',
      error,
      data: null,
    };
  }
}

// Read
export async function getUser(id: string): Promise<ServerActionResponse<TUser>> {
  try {
    const data = await (...)

    return {
      status: 'success',
      data,
      error: null,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 'error',
      error,
      data: null,
    };
  }
}

// Update
export async function updateUser(
  id: string,
  user: z.infer<typeof UpdateUserSchema>
): Promise<ServerActionResponse<TUser>> {
  try {
    const data = await (...)

    return {
      status: 'success',
      data,
      error: null,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 'error',
      error,
      data: null,
    };
  }
}

// Delete
export async function deleteUser(id: string): Promise<ServerActionResponse<null>> {
  try {
    await (...)

    return {
      status: 'success',
      data: null,
      error: null,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 'error',
      error,
      data: null,
    };
  }
}
```
