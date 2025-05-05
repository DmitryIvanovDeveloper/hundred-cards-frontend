import { IAsyncEventHandler } from "@/infrastructure/events/events-handler.plugin";
import AdminAuthenticatedEvent from "@/modules/shared/authentication/business/events/admin-authenticated.event";

export default class AdminAuthenticatedEventCreateProfileHandler implements IAsyncEventHandler<AdminAuthenticatedEvent> {
    canHandle(event: AdminAuthenticatedEvent): boolean {
       return event instanceof AdminAuthenticatedEvent;
    }
   
    handleAsync(event: AdminAuthenticatedEvent): Promise<void> {

       console.log("AdminAuthenticatedEventHandler");
       throw new Error("AdminAuthenticatedEventHandler");
    }
    
}
