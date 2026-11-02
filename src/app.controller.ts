import { Controller, Get, Redirect } from '@nestjs/common';

@Controller()
export class AppController {
  // The service has no web page: the root address leads to Apollo Sandbox.
  @Get()
  @Redirect('/graphql')
  redirectToSandbox(): void {}
}
