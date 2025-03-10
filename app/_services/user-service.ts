/* eslint-disable @typescript-eslint/no-unused-vars */
import { and, eq } from 'drizzle-orm';

import { db } from '@/db/db';
import { TInsertUser, TUpdateUser, TUser, users } from '@/db/db-schema';

/**
 * Interactions with the database for User
 */
const UserService = {
  /**
   * @description Create a user
   * @param user - The user to create
   * @returns The created user
   */
  createUser: async (user: TInsertUser): Promise<TUser[]> => {
    return await db.insert(users).values(user).returning();
  },
  /**
   * @description Get a user by their ID
   * @param id - The ID of the user to get
   * @returns The user with the given ID
   */
  getUser: async (id: string): Promise<TUser | undefined> => {
    return db.query.users.findFirst({
      where: eq(users.id, id),
    });
  },
  /**
   * @description Get all users
   * @returns All users
   */
  getAllUser: async (): Promise<TUser[]> => {
    return await db.query.users.findMany();
  },
  /**
   * @description Update a user by their ID
   * @param id - The ID of the user to update
   * @param user - The user to update
   * @returns The updated user
   */
  updateUser: async (id: string, user: TUpdateUser): Promise<TUser[]> => {
    return await db.update(users).set(user).where(eq(users.id, id)).returning();
  },
  /**
   * @description Delete a user by their ID
   * @param id - The ID of the user to delete
   * @returns The deleted user
   */
  deleteUser: async (id: string): Promise<TUser[]> => {
    return await db.delete(users).where(eq(users.id, id)).returning();
  },
  /**
   * @description Sign in a user
   * @param email - The email of the user to sign in
   * @param password - The password of the user to sign in
   * @returns The signed in user
   */
  signin: async (
    email: string,
    password: string,
  ): Promise<TUser | undefined> => {
    return undefined;
  },
  /**
   * @description Sign up a user
   * @param user - The user to sign up
   * @returns The signed up user
   */
  signup: async (user: TInsertUser): Promise<TUser | undefined> => {
    return undefined;
  },
};

export default UserService;
