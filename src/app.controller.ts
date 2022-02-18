import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

/**
 * Defines the route, you can set a route endpoint as string in 
 * the parenthesis of @Controler decorator. @Controller('any-route')
 * and then see the results in port:3000/any-route 
 */
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  /**
   * Defines the route, you can set a route endpoint as string in
   * the parenthesis of @Get decorator. @Get('other-route')
   * and then see the results in port:3000/any-route/other-route
   */
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
