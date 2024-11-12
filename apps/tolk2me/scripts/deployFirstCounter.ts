import { toNano } from '@ton/core';
import { FirstCounter } from '../wrappers/FirstCounter';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const firstCounter = provider.open(FirstCounter.createFromConfig({}, await compile('FirstCounter')));

    await firstCounter.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(firstCounter.address);

    // run methods on `firstCounter`
}
