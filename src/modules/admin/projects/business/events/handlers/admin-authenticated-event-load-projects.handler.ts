import { inject } from 'inversify';
import { IAsyncEventHandler } from "@/infrastructure/events/events-handler.plugin";
import AdminAuthenticatedEvent from "@/modules/shared/authentication/business/events/admin-authenticated.event";
import { TYPES } from '../../../types';
import LoadPresentProjectsUseCase from '../../usecases/load-present-projects.usecase';

export default class AdminAuthenticatedEventLaodProjectsHandle implements IAsyncEventHandler<AdminAuthenticatedEvent> {

  constructor(
    @inject(TYPES.LoadPresentProjectsUseCase)
    private readonly _loadPresentProjectsUseCase: LoadPresentProjectsUseCase
  ){}

  canHandle(event: AdminAuthenticatedEvent): boolean {
    return event instanceof AdminAuthenticatedEvent;
  }

  async handleAsync(event: AdminAuthenticatedEvent): Promise<void> {
      await this._loadPresentProjectsUseCase.execute();
  }
}
