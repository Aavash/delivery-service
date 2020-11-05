import config from '../../config';
import { JwtService } from '@nestjs/jwt';

export async function getUserJwtToken(user, jwtService: JwtService) {
		// payload for the jwt
		const payload = {
      idx: user.idx,
      full_name: user.function,
      mobile_number: user.mobile_number,
      mobile_number_ext: user.mobile_number_ext,
		};

		const access_token = jwtService.sign(payload, {
			expiresIn: config.expiresIn,
		});
		// const accessToken = new JwtService();

		// data sent after successful login token generation
		return { access_token, payload, expires_in: config.expiresIn };
	}