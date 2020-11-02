import config from './config';
import { InternalServerExceptionFilter } from './common/filters/Internal.filter';

import helmet from 'helmet';
import compression from 'compression';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
		logger: console,
	});

  app.enableCors();
	app.setGlobalPrefix('v1');
	app.use(helmet());
	app.use(compression());
	app.useGlobalFilters(new InternalServerExceptionFilter());
	const options = new DocumentBuilder()
	.setTitle('Delivery Service Apis')
	.setDescription(
		'Delivery  service Apis description built using swagger OpenApi. You can find out more about Swagger at http://swagger.io',
	)
	.setVersion('1.0')
	.build();
	const document = SwaggerModule.createDocument(app, options);

	SwaggerModule.setup('api', app, document);

	await app.listen(config.port);
	Logger.log(`Server running on http://localhost:${config.port}`, 'Bootstrap');

}
bootstrap();
