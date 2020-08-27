import {DbUser} from "#/server/types/dbEntities";

export type User = Omit<DbUser, 'password'>;

export type LoginRequest = {
  login: string,
  password: string,
};

export type LoginResponse = {
  user: User,
}
