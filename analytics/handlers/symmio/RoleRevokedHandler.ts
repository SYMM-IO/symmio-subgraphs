import {RoleRevokedHandler as CommonRoleRevokedHandler} from "../../../common/handlers/symmio/RoleRevokedHandler"
import {GrantedRole} from "../../../generated/schema"
import {rolesNames} from "../../utils"
import {ethereum} from "@graphprotocol/graph-ts";
import {Version} from "../../../common/BaseHandler";

export class RoleRevokedHandler<T> extends CommonRoleRevokedHandler<T> {
	handle(_event: ethereum.Event, version: Version): void {
		// @ts-ignore
		const event = changetype<T>(_event)
		super.handle(_event, version)
		super.handleQuote(_event, version)
		super.handleSymbol(_event, version)
		super.handleAccount(_event, version)

		let id =
			rolesNames.get(event.params.role.toHexString()) +
			"_" +
			event.params.user.toHexString() +
			"_" +
			event.address.toHexString()
		let gr = GrantedRole.load(id)
		if (gr == null) {
			gr = new GrantedRole(id)
			gr.role = rolesNames.get(event.params.role.toHexString()) || event.params.role.toHexString()
			gr.user = event.params.user
			gr.contract = event.address
		}
		gr.updateTimestamp = event.block.timestamp
		gr.revokeTransaction = event.transaction.hash
		gr.save()
	}
}
