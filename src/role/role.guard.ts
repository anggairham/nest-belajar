import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Roles } from './roles.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  // constructor(private roles: string[]) {}
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles: string[] = this.reflector.get(Roles, context.getHandler());
    if (!roles) {
      return true;
    }

    const user = context.switchToHttp().getRequest().user;
    console.log(user);
    // return this.roles.indexOf(user.role) != -1;
    return roles.indexOf(user.role) != -1;
  }
}
