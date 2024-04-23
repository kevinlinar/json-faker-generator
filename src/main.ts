import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableCors({
		origin: 'http://localhost:4200', // Sustituye con el origen real de tu app Angular
		methods: 'GET,POST,PUT,DELETE',
		allowedHeaders: 'Content-Type,Accept',
		credentials: true,
	});
	await app.listen(3000);
}
bootstrap();
