import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Query
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from "./entities/user.entity";
import { CreateUserDto } from './dto/create-user.dto'
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags
} from '@nestjs/swagger';

@ApiTags('users') // Separates the users to a different section in the swaggers
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOkResponse({ type: User, isArray: true })
  @ApiQuery({ name: 'name', required: false })
  @Get()
  getUsers(@Query('name') name?: string): User[] {
    return this.usersService.findAll(name);
  }

  @ApiOkResponse({ type: User, description: 'The user' })
  @ApiNotFoundResponse()
  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number): User {
    // ParseIntPipe will automagically change whatever you pass
    // for id to a number. Sinces it comes from the URL, it will
    // always come as a string, so we will need to convert it to number

    const user = this.usersService.findById(id); // If ParseIntPipe wasn't available, you'd have to specify findById(Number(id))

    if (!user) {
      throw new NotFoundException();
      /**
       * 
       Or BadRequestException();
       Or InternalServerErrorException();

       // For built in custom error handling:

       throw new HttpException({
         status: HttpStatus.FORBIDDEN,
         error: 'This is a custom message',
        }, HttpStatus.FORBIDDEN);

      */
    }

    return user;
  }

  @ApiCreatedResponse({ type: User })
  @ApiBadRequestResponse()
  @Post()
  createUser(@Body() body: CreateUserDto): User {
    return this.usersService.createUser(body);
  }
}
