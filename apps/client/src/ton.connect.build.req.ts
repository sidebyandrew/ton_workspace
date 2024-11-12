import { Address, beginCell, toNano } from "@ton/core";
import { SendTransactionRequest } from "@tonconnect/ui-react";

let output = {
  validUntil: 1731383898,
  messages: [
    {
      address: "Jetton Address",
      amount: "1000000000",
      payload:
        "te6cckEBAQEAbAAA04bCT1QAAAAAAAAAAVAo+mrgCACdRTwAL6ibDsGNqbrky/mKZt5eyapKjGBbHTCcIqY7pQATqKeABfUTYdgxtTdcmX8xTNvL2TVJUYwLY6YThFTHdIYehIENhJ6ooFH01cAAAAAAAAAAADCbVuv/",
    },
  ],
};

function main() {
  let sendTransactionRequest = buildRequest();

  console.info(JSON.stringify(sendTransactionRequest));

  // 本交易是通过 TON connect 发送，所以不需要指定 钱包地址
  // let sellTx: SendTransactionResponse = await tonConnectUi.sendTransaction(sendTransactionRequest);
}

main();

function buildRequest(): SendTransactionRequest {
  let op_code_demo = 0x86c24f54;
  let coinsInTon = 11;
  let queryId = 1n;

  let fwdCell = beginCell()
    .storeUint(op_code_demo, 32) // op code
    .storeCoins(toNano(coinsInTon)) // with coins
    .storeUint(queryId, 64) //queryId
    .endCell();

  let fwdPayloadSlice = fwdCell.beginParse();

  let msgBody = beginCell()
    .storeUint(op_code_demo, 32)
    .storeUint(queryId, 64)
    .storeCoins(toNano(coinsInTon)) // Toncoin or Jetton amount!
    .storeAddress(
      Address.parse("UQBOop4AF9RNh2DG1N1yZfzFM28vZNUlRjAtjphOEVMd0j-8"),
    ) //to_address
    .storeAddress(
      Address.parse("UQBOop4AF9RNh2DG1N1yZfzFM28vZNUlRjAtjphOEVMd0j-8"),
    ) //response_destination
    .storeBit(false) //no custom payload
    .storeCoins(toNano(0.001)) //forward_amount
    .storeSlice(fwdPayloadSlice) // forward payload
    .endCell();

  let buffer: Buffer = msgBody.toBoc();
  let bodyBase64 = buffer.toString("base64");

  // 下面这个是 “外部消息” 的内容，其中 messages 包含外部消息将要触发的“内部消息”
  return {
    // The transaction is valid for 10 minutes from now, in unix epoch seconds.
    validUntil: Math.floor(Date.now() / 1000) + 600,
    messages: [
      // Wallet V4 最多附带 4 条内部消息
      {
        address: "Jetton Address",
        amount: "" + toNano("1"),
        payload: bodyBase64,
      },
    ],
  };
}
