import {ethereum} from "@graphprotocol/graph-ts"
import {TimelockVersion} from "../../../common/BaseHandler"
import {CallScheduled} from "../../../generated/schema"

export class CallScheduledHandler<T> {
    handle(_event: ethereum.Event, version: TimelockVersion): void {
        // @ts-ignore
        const event = changetype<T>(_event)
        let call_schedule = new CallScheduled(event.params.id.toHexString() + "-" + event.transaction.hash.toHex() + "-" + event.logIndex.toString())
        call_schedule.index = event.params.index
        call_schedule.target = event.params.target
        call_schedule.value = event.params.value
        call_schedule.data = event.params.data
        call_schedule.predecessor = event.params.predecessor
        call_schedule.delay = event.params.delay
        call_schedule.timestamp = event.block.timestamp
        call_schedule.address = event.address
        call_schedule.save()
    }
}
