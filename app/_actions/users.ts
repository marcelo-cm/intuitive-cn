'use server';

import { revalidatePath } from 'next/cache';

import { ServerActionResponse } from '@/hooks/use-server-action';

import userService from '@/app/_services/user-service';
import { TInsertUser, TUpdateUser, TUser } from '@/db/db-schema';

// Create
export async function createUser(
  data: TInsertUser & { id: string },
): Promise<ServerActionResponse<TUser>> {
  try {
    const [user] = await userService.createUser(data);

    if (!user) {
      return {
        status: 'error',
        data: null,
        error: { message: 'Failed to create User' },
      };
    }

    revalidatePath('/user');

    return {
      status: 'success',
      data: user,
      error: null,
    };
  } catch (error) {
    console.error('[createUser]', error);
    return {
      status: 'error',
      data: null,
      error: {
        message:
          error instanceof Error ? error.message : 'An unknown error occurred',
      },
    };
  }
}

// Read (Get)
export async function getUser(
  id: string,
): Promise<ServerActionResponse<TUser>> {
  try {
    const user = await userService.getUser(id);

    if (!user) {
      return {
        status: 'error',
        data: null,
        error: { message: 'User not found' },
      };
    }

    return {
      status: 'success',
      data: user,
      error: null,
    };
  } catch (error) {
    console.error('[getUser]', error);
    return {
      status: 'error',
      data: null,
      error: {
        message:
          error instanceof Error ? error.message : 'An unknown error occurred',
      },
    };
  }
}

// Read (Get All)
export async function getAllUser(): Promise<ServerActionResponse<TUser[]>> {
  try {
    const users = await userService.getAllUser();

    return {
      status: 'success',
      data: users,
      error: null,
    };
  } catch (error) {
    console.error('[getAllUser]', error);
    return {
      status: 'error',
      data: null,
      error: {
        message:
          error instanceof Error ? error.message : 'An unknown error occurred',
      },
    };
  }
}

// Update
export async function updateUser(
  id: string,
  data: TUpdateUser & { id: string },
): Promise<ServerActionResponse<TUser>> {
  try {
    const [user] = await userService.updateUser(id, data);

    if (!user) {
      return {
        status: 'error',
        data: null,
        error: { message: 'Failed to update User' },
      };
    }

    revalidatePath('/user');

    return {
      status: 'success',
      data: user,
      error: null,
    };
  } catch (error) {
    console.error('[updateUser]', error);
    return {
      status: 'error',
      data: null,
      error: {
        message:
          error instanceof Error ? error.message : 'An unknown error occurred',
      },
    };
  }
}

// Delete
export async function deleteUser(
  id: string,
): Promise<ServerActionResponse<TUser>> {
  try {
    const [user] = await userService.deleteUser(id);

    if (!user) {
      return {
        status: 'error',
        data: null,
        error: { message: 'Failed to delete User' },
      };
    }

    revalidatePath('/user');

    return {
      status: 'success',
      data: user,
      error: null,
    };
  } catch (error) {
    console.error('[deleteUser]', error);
    return {
      status: 'error',
      data: null,
      error: {
        message:
          error instanceof Error ? error.message : 'An unknown error occurred',
      },
    };
  }
}

// Utility
export async function serverAction(): Promise<
  ServerActionResponse<{ word: string }>
> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    status: 'success',
    data: { word: 'Hello' },
    error: null,
  };
}

export async function signup(
  data: TInsertUser,
): Promise<ServerActionResponse<TUser>> {
  try {
    const [user] = await userService.createUser(data);

    if (!user) {
      return {
        status: 'error',
        data: null,
        error: { message: 'Failed to create User' },
      };
    }

    return {
      status: 'success',
      data: user,
      error: null,
    };
  } catch (error) {
    console.error('[signup]', error);
    return {
      status: 'error',
      data: null,
      error: { message: 'Failed to create User' },
    };
  }
}

export async function signin(data: {
  email: string;
  password: string;
}): Promise<ServerActionResponse<TUser>> {
  try {
    const user = await userService.signin(data.email, data.password);

    if (!user) {
      return {
        status: 'error',
        data: null,
        error: { message: 'Failed to create User' },
      };
    }

    return {
      status: 'success',
      data: user,
      error: null,
    };
  } catch (error) {
    console.error('[signin]', error);
    return {
      status: 'error',
      data: null,
      error: { message: 'Failed to create User' },
    };
  }
}
