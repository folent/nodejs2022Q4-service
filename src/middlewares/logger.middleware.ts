import { Injectable, NestMiddleware } from "@nestjs/common";
import { Logger } from "@nestjs/common/services";
import { Request, Response, NextFunction } from "express";
import { MyLogger } from "src/shared/logger/mylogger.service";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    private logger = new MyLogger('HTTP')

    use(req: Request, res: Response, next: NextFunction) {
        const { method, originalUrl, body, query } = req;
        const userAgent = req.get('user-agent') || '';
        const data = Object.keys(query).length > 0 ? query : body

        this.logger.log(
            `Request: ${method} ${originalUrl} ${JSON.stringify(data)} - ${userAgent}`
        );
            
        res.on('finish', () => {
            const { statusCode } = res;

            this.logger.log(
                `Response: ${method} ${originalUrl} ${statusCode} - ${userAgent}`
            );

        });

        next();
    }
}