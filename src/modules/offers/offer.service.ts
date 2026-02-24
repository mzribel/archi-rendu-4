import { Injectable } from '@nestjs/common';
import { PrismaOfferRepository } from '@modules/offers/repositories/prisma.offer.repository';
import { IOfferUsecase } from '@modules/offers/usecases/i.offer.usecase';

@Injectable()
export class OfferService implements IOfferUsecase {
  constructor(private readonly offerRepository: PrismaOfferRepository) {}
}