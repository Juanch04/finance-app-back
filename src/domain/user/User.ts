import { type User as UserType } from '@prisma/client'

class User implements UserType {
  public id
  public name
  public surname
  public username
  public image
  public email
  public password
  public active
  public createdAt
  public updatedAt

  constructor({
    id,
    name,
    surname,
    username,
    image,
    email,
    password,
    active,
    createdAt,
    updatedAt
  }: UserType) {
    this.id = id
    this.name = name
    this.surname = surname
    this.username = username
    this.image = image
    this.email = email
    this.password = password
    this.active = active
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
}

export default User
