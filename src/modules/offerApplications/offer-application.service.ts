import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IOfferApplicationUsecase } from '@modules/offerApplications/usecases/i.offer-application.usecase';
import { PrismaOfferApplicationRepository } from '@modules/offerApplications/repositories/prisma.offer-application.repository';
import {
  CreateOfferApplicationDto,
  UpdateOfferApplicationDto,
} from '@modules/offerApplications/dto/offer-application.dto';
import { User } from '@modules/users/models/user';
import { IOfferUsecase } from '@modules/offers/usecases/i.offer.usecase';
import { Offer } from '@modules/offers/models/Offer';
import { IStudentUseCase } from '@modules/students/usecases/i.student.usecase';
import { OfferApplication } from '@modules/offerApplications/models/offerApplication';
import { OfferApplicationStatus } from '@common/enums/offer-application-status';


@Injectable()
export class OfferApplicationService implements IOfferApplicationUsecase {
  constructor(
    private readonly applicationRepository: PrismaOfferApplicationRepository,
    private readonly studentService:IStudentUseCase,
    private readonly offerService: IOfferUsecase,
  ) {
  }

  async apply(offerId: number, dto: CreateOfferApplicationDto, requestingUser:User) {
    // Utilisateur admin ou soi-même
    if (!requestingUser.isSelfOrAdmin(dto.studentId)) throw new ForbiddenException()

    // Vérifie la validité du profil étudiant
    const studentProfile = await this.studentService.getStudentProfile(dto.studentId);
    if (!studentProfile) throw new BadRequestException("Invalid studentId");

    // Vérifie la validité de l'offre et de l'entreprise
    const offer: Offer = await this.offerService.getOfferForApplication(offerId);

    // Vérifie qu'une candidature n'est pas déjà en cours
    if (await this.applicationRepository.existsByStudentAndOffer(studentProfile.id, offer.id))
      throw new BadRequestException("An application for this student and offer already exists")

    // Créé la candidature
    const application = OfferApplication.fromDto(offer.id, dto);
    return this.applicationRepository.createApplication(application);
  }

  async cancelApplication(applicationId: number, requestingUser: User) {
    const application = await this.applicationRepository.getById(applicationId);
    if (!application) throw new NotFoundException()
    if (!requestingUser.isSelfOrAdmin(application.studentId)) throw new ForbiddenException()

    const offer = await this.offerService.getOfferForApplication(application.offerId);
    if (!application.canBeModified()) throw new BadRequestException("Application status doesn't allow modifications");

    const updatedApplication = await this.applicationRepository.updateApplication(applicationId, application)
    return updatedApplication;
  }

  async getApplicationsByStudentId(studentId: number, requestingUser: User) {
    // Utilisateur admin ou soi-même
    if (!requestingUser.isSelfOrAdmin(studentId)) throw new ForbiddenException()

    // Vérifie la validité du profil étudiant
    const studentProfile = await this.studentService.getStudentProfile(studentId);
    if (!studentProfile) throw new BadRequestException("Invalid studentId");

    return this.applicationRepository.getByStudentId(studentId);
  }

  async getApplicationsByOfferId(offerId: number, requestingUser: User) {
    const offer:Offer|null = await this.offerService.getOfferById(offerId, requestingUser);
    if (!offer) throw new NotFoundException()
    if (!requestingUser.isSelfOrAdmin(offer.companyId)) throw new ForbiddenException();

    return this.applicationRepository.getByOfferId(offerId);
  }

  async updateOfferApplicationStatus(applicationId: number, newStatus: OfferApplicationStatus, requestingUser: User
  ) {
    // Récupère offre et application
    const application = await this.applicationRepository.getById(applicationId);
    if (!application) throw new NotFoundException();
    const offer = await this.offerService.getOfferById(application.offerId, requestingUser);

    // Vérification que l'offre est active
    if (!offer.isActive()) throw new BadRequestException("This offer");

    // Seul un admin peut modifier une candidature non-modifiable
    if (!requestingUser.isAdmin() && !application.canBeModified()) {
      throw new BadRequestException("This application cannot be modified");
    }

    // 3. Vérification des Permissions & Transitions autorisées

    // Cas ADMIN : Tout est permis
    if (requestingUser.isAdmin()) {
      return this.applicationRepository.updateApplication(applicationId, { status: newStatus });
    }

    // Cas ÉTUDIANT : Peut uniquement ANNULER sa propre candidature
    if (requestingUser.id === application.studentId) {
      if (newStatus !== OfferApplicationStatus.CANCELLED) {
        throw new ForbiddenException("Un étudiant ne peut qu'annuler sa candidature");
      }
      return this.applicationRepository.updateApplication(applicationId, { status: OfferApplicationStatus.CANCELLED });
    }

    // Cas ENTREPRISE : Peut ACCEPTER ou REFUSER si elle possède l'offre
    if (requestingUser.isCompany() && requestingUser.id === offer.companyId) {
      const allowed:OfferApplicationStatus[] = [OfferApplicationStatus.ACCEPTED, OfferApplicationStatus.REJECTED];

      if (!allowed.includes(newStatus)) {
        throw new ForbiddenException("L'entreprise ne peut qu'accepter ou refuser");
      }
      return this.applicationRepository.updateApplication(applicationId, { status: newStatus });
    }

    // Si on arrive ici, l'utilisateur n'a aucun droit sur cette ressource
    throw new ForbiddenException("Vous n'avez pas les droits pour modifier cette candidature");
  }
  async updateApplication(applicationId:number, dto:UpdateOfferApplicationDto, requestingUser:User) {

  }

  async deleteApplication(applicationId:number, requestingUser:User) {
    const application = await this.applicationRepository.getById(applicationId);
    if (!application) throw new NotFoundException()
    if (requestingUser.isSelfOrAdmin(application.studentId)) throw new ForbiddenException();

    await this.applicationRepository.deleteApplication(applicationId);
  }
}