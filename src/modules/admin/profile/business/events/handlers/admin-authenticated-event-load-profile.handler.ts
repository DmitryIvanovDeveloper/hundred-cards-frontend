import { IAsyncEventHandler } from "@/infrastructure/events/events-handler.plugin";
import AdminAuthenticatedEvent from "@/modules/shared/authentication/business/events/admin-authenticated.event";

export default class AdminAuthenticatedEventCreateProfileHandler
  implements IAsyncEventHandler<AdminAuthenticatedEvent>
{
  canHandle(event: AdminAuthenticatedEvent): boolean {
    return event instanceof AdminAuthenticatedEvent;
  }

  async handleAsync(event: AdminAuthenticatedEvent): Promise<void> {
    await Promise.resolve();
  }
}
