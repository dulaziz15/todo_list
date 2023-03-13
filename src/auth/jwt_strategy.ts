import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor () {
        super ({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: "jabsdknaiud87349827"
        })
    }

    async validate(payload: {userId: number,nama: string, email: string, }) {
        return {
            userId: payload.userId,
            email: payload.email,
            nama: payload.nama
        }
    }
}