import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { FirebaseAuthGuard } from '../firebase/firebase-auth.guard';
import { ControllerDecorator } from '../utils/controller.decorator';
import { CreateSubscriptionUserDto } from './dto/create-subscription-user.dto';
import { SubscriptionUserService } from './subscription-user.service';

@ApiTags('Subscription User')
@ControllerDecorator()
@Controller('/v1/subscription-user')
export class SubscriptionUserController {
  constructor(private readonly subscriptionUserService: SubscriptionUserService) {}

  @Post('/whatsapp')
  @ApiBearerAuth('access-token')
  @ApiOperation({
    description:
      'Stores relationship between a `User` and the subscription record for the whatsapp service (if an active subscription does not yet exist for that user)',
  })
  @UseGuards(FirebaseAuthGuard)
  async createWhatsappSubscription(
    @Req() req: Request,
    @Body() createSubscriptionUserDto: CreateSubscriptionUserDto,
  ) {
    return await this.subscriptionUserService.createWhatsappSubscription(
      req['user'],
      createSubscriptionUserDto,
    );
  }
}
