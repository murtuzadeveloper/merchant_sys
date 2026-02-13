import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Merchant } from '../merchants/merchant.entity';
import { RegisterDto, LoginDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Merchant)
        private merchantRepository: Repository<Merchant>,
        private jwtService: JwtService,
    ) { }


	async register(registerDto: RegisterDto): Promise<Partial<Merchant>> {
		const { name, email, password } = registerDto;

		const existingMerchant = await this.merchantRepository.findOne({ where: { email } });
		if (existingMerchant) {
			throw new ConflictException('Email already exists');
		}

		const salt = await bcrypt.genSalt();
		const passwordHash = await bcrypt.hash(password, salt);
	
		const merchant = this.merchantRepository.create({
			name,
			email,
			passwordHash,
		});

    const savedMerchant = await this.merchantRepository.save(merchant);

    // ✅ Remove password safely
    const { passwordHash: _, ...merchantWithoutPassword } = savedMerchant;

    return merchantWithoutPassword;
}

	
	
	
	

    async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
        const { email, password } = loginDto;
        const merchant = await this.merchantRepository.findOne({ where: { email } });

        if (!merchant || !(await bcrypt.compare(password, merchant.passwordHash))) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { sub: merchant.id, email: merchant.email };
        const accessToken = await this.jwtService.signAsync(payload);

        return { accessToken };
    }
}
