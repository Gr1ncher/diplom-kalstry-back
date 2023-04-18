import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('UserController')
@Controller('user')
export class UserController {
  constructor() {}
}
