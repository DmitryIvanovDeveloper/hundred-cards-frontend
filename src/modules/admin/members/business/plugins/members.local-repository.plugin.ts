import { Ref } from "vue";
import { Member } from "../entities/member";
import { MemberProject } from "../entities/member-project";

export default interface IMembersLocalRepository {
	findMember(id: number): Member | undefined;
	clear(): void;
	storeMembers(entities: ReadonlyArray<Member>): void;
	getMembers(): Ref<ReadonlyArray<Member>>;
	getMember(): Ref<Member | undefined>;
	storeMember(entity: Member): void;
	storeMemberProjects(entity: ReadonlyArray<MemberProject>): void;
	updateMemberProjects(entity: MemberProject): void;
	getMemberProjects(): Ref<ReadonlyArray<MemberProject>>;
	findMemberProject(id: string): MemberProject | undefined;
}
