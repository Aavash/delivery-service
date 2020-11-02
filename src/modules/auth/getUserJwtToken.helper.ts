import { Customer } from '../customer/entities/Customer.entity';
import config from '../../config';


export async function getUserJwtToken(user) {
		// payload for the jwt

		const payload = {
      idx: user.idx,
      full_name: user.function,
      mobile_number: user.mobile_number,
      mobile_number_ext: user.mobile_number_ext,
		};

		const accessToken = this.jwtService.sign(payload, {
			expiresIn: config.expiresIn,
		});

		// data sent after successful login token generation
		return { accessToken, payload, expires_in: config.expiresIn };
	}