export type DbUser =  {
  id: number,
  login: string,
  password: string,
}

export type DbToken = {
  userId: number,
  token: string,
  createDate: string,
}
