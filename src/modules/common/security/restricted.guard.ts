import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { FastifyRequest } from 'fastify';

// !Uncomment these lines if you want to use JWT
// import * as jwt from 'jsonwebtoken'; // Import the JWT library

// import { Role } from '../../tokens';


@Injectable()
export class RestrictedGuard implements CanActivate {

    public canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest<FastifyRequest>();
        // Extract the Authorization header
        const authHeader = request.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return false; // No Bearer token found
        }
        // !Uncomment these lines if you want to use JWT and write the logic here
        // Extract the token
        // const token = authHeader.replace('Bearer ', '');

        // Verify and decode the token
        // let payload;
        // try {
        //     payload = jwt.verify(token, 'your-secret-key'); // Replace with your secret or public key
        // } catch (error) {
        //     return false; // Token is invalid or expired
        // }

        // Check if the role is restricted
        // return (payload.role === Role.RESTRICTED);
        return true;
    }
}
