import colors from "colors";
import * as ethers from "ethers";

// Tổng số lần chạy
const COUNT = 200;
// Số BNB chuyển qua để claim + chuyển token về ví vệ tinh
const AMOUNT_SEND = "0.000001";
// Private key của ví vệ tinh (ví chứa BNB mạng Matchain để chia gas cho các ví)
const PRIVATE_KEY = "XXX";
// Địa chỉ (mạng Matchain) của ví vệ tinh hoặc bất kỳ ví nào bạn muốn gom token về
const PARENT_WALLET_ADDRESS = "YYY";

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

const provider = new ethers.JsonRpcProvider("https://rpc.matchain.io");

function create() {
  const wallet = ethers.Wallet.createRandom();
  console.log(`Tạo thành công ví: ${colors.blue(wallet.address)}`);

  return {
    address: wallet.address,
    privateKey: wallet.privateKey,
    mnemonic: wallet.mnemonic?.phrase,
  };
}

async function send(data, privateKey, amount) {
  if (!privateKey) {
    console.error("Vui lòng cung cấp PRIVATE_KEY");
    process.exit(1);
  }

  const wallet = new ethers.Wallet(privateKey, provider);

  // Số lượng BNB cần gửi cho mỗi địa chỉ
  const amountToSend = ethers.parseEther(amount);

  console.log(`Bắt đầu gửi ${amount} BNB đến ví vừa tạo`);
  try {
    const tx = await wallet.sendTransaction({
      to: data.address,
      value: amountToSend,
    });
    console.log(`Transaction hash: ${tx.hash}`);
    await tx.wait();
    console.log(colors.green("Gửi BNB thành công"));
  } catch (error) {
    console.log(colors.red(`Lỗi gửi BNB đến ${data.address}:`, error.message));
  }
  console.log("-----------------------------------");
}

async function claim(data) {
  const CONTRACT_ADDRESS = "0xD5B3BC210352D71f9c7fe7d94cb86FC49B42209a";

  const ABI = ["function claim()"];
  const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);

  try {
    const wallet = new ethers.Wallet(data.privateKey, provider);
    const connectedContract = contract.connect(wallet);

    console.log(`Bắt đầu claim LOL`);
    try {
      const tx = await connectedContract.claim();
      console.log(`Transaction hash: ${tx.hash}`);
      await tx.wait();
    } catch (error) {
      console.log(colors.red(`Claim thất bại: ${error.message}`));
    }

    console.log(colors.green(`Claim thành công 100000.0 LOL`));
  } catch (error) {
    console.log(colors.red(`Claim thất bại: ${error.message}`));
  }
  console.log("-----------------------------------");
}

async function transfer(data, parentWalletAddress) {
  const CONTRACT_ADDRESS = "0xB2174052dd2F3FCAB9Ba622F2e04FBEA13fc0dFC";

  const ABI = [
    "function balanceOf(address owner) view returns (uint256)",
    "function transfer(address to, uint256 value) returns (bool)",
  ];
  const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);

  let walletAddress = "";
  try {
    const wallet = new ethers.Wallet(data.privateKey, provider).connect(
      provider
    );

    walletAddress = wallet.address;
    const balance = await contract.balanceOf(walletAddress);
    if (balance > 0) {
      const formattedBalance = ethers.formatUnits(balance, 18);
      console.log(
        `Có ${formattedBalance} LOL trong ví, bắt đầu chuyển về ví vệ tinh`
      );

      const connectedContract = contract.connect(wallet);

      // Thực hiện chuyển token về ví mẹ
      const tx = await connectedContract.transfer(parentWalletAddress, balance);
      console.log(`Transaction hash: ${tx.hash}`);
      await tx.wait();
      console.log(
        colors.green(
          `Đã gửi ${ethers.formatUnits(
            balance,
            18
          )} LOL về ví vệ tinh thành công`
        )
      );
    } else {
      console.log(`Ví ${walletAddress} không có LOL token`);
    }
  } catch (error) {
    if (
      error.message.includes(
        "insufficient funds for intrinsic transaction cost"
      )
    ) {
      console.log(
        colors.red(`Lỗi khi xử lý ví ${walletAddress}:`, "Không đủ phí Gas")
      );
    } else {
      console.log(
        colors.red(`Lỗi khi xử lý ví ${walletAddress}:`, error.message)
      );
    }
  }
  console.log(
    "====================================================================================="
  );
}

console.log(
  colors.yellow.bold(
    `=============  Tool phát triển và chia sẻ miễn phí bởi ZuyDD  =============`
  )
);
console.log(
  "Mọi hành vi buôn bán tool dưới bất cứ hình thức nào đều không được cho phép!"
);
console.log(
  `Telegram: ${colors.green(
    "https://t.me/zuydd"
  )}  ___  Facebook: ${colors.blue("https://www.facebook.com/zuy.dd")}`
);
console.log(
  `🚀 Cập nhật các tool mới nhất tại: 👉 ${colors.gray(
    "https://github.com/zuydd"
  )} 👈`
);
console.log("");

console.log(colors.blue("📢 Thông báo từ hệ thống"));
console.log(
  "Hãy coi việc claim LOL như mua tờ vé số, vốn hoá mà được 10M$ thì về bờ, 100M$ thì x10,... cứ thế tính lên. Chơi tầm chục đô cho vui thôi, đừng ham đấm nhiều nhé 😉"
);

console.log("");
console.log("");

let countOk = 0;
while (countOk < COUNT) {
  countOk++;
  console.log(colors.magenta(`Lần chạy thứ: ${countOk}`));
  try {
    const data = create();
    await send(data, PRIVATE_KEY, AMOUNT_SEND);
    await claim(data);
    await transfer(data, PARENT_WALLET_ADDRESS);
  } catch (error) {}
}
