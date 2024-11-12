import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from '@ton/core';

export type FirstCounterConfig = {};

export function firstCounterConfigToCell(config: FirstCounterConfig): Cell {
    return beginCell().endCell();
}

export class FirstCounter implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new FirstCounter(address);
    }

    static createFromConfig(config: FirstCounterConfig, code: Cell, workchain = 0) {
        const data = firstCounterConfigToCell(config);
        const init = { code, data };
        return new FirstCounter(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }
}
