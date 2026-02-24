import { Controller } from '@nestjs/common';
import { IOfferUsecase } from '@modules/offers/usecases/i.offer.usecase';

@Controller()
export class OfferController {
  constructor(private readonly offerService: IOfferUsecase) {}
}