import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Cell, toNano } from '@ton/core';
import { FirstCounter } from '../wrappers/FirstCounter';
import '@ton/test-utils';
import { compile } from '@ton/blueprint';

describe('FirstCounter', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('FirstCounter');
    });

    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let firstCounter: SandboxContract<FirstCounter>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        firstCounter = blockchain.openContract(FirstCounter.createFromConfig({}, code));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await firstCounter.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: firstCounter.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and firstCounter are ready to use
    });
});
