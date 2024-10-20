import { Controller, UseGuards } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { CreateUsersInput } from '@interfaces/users/dto/create-users.input';
import { MongoId } from '@interfaces/users/dto/id';
import { LoginResponse, UserList, UserResponse } from '@proto/user.pb';
import { LoginInput } from '@interfaces/users/dto/login.input';
import { AuthGuard } from '@decorators/ auth.guard';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @GrpcMethod('UserService', 'CreateUser')
  async createUser(data: CreateUsersInput): Promise<UserResponse> {
    return this.usersService.createUser(data);
  }

  @GrpcMethod('UserService', 'GetUser')
  @UseGuards(AuthGuard)
  async getUser(mongoId: MongoId): Promise<UserResponse> {
    return this.usersService.getUser(mongoId.id);
  }

  @GrpcMethod('UserService', 'DeleteUser')
  @UseGuards(AuthGuard)
  async deleteUser(mongoId: MongoId): Promise<UserResponse> {
    return this.usersService.deleteUser(mongoId.id);
  }

  @GrpcMethod('UserService', 'FindUsers')
  @UseGuards(AuthGuard)
  async findUsers(): Promise<UserList> {
    return this.usersService.findAllUsers();
  }

  @GrpcMethod('UserService', 'Login')
  async login(loginInput: LoginInput): Promise<LoginResponse> {
    return this.usersService.login(loginInput);
  }
}
