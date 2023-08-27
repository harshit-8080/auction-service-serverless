import { closeAuction } from "../lib/closeAuctions";
import { getEndedAuctions } from "../lib/getEndedAuction";

async function processBid(event, context) {
  try {
    const auctionToClose = await getEndedAuctions();
    console.log(auctionToClose);

    const closePromise = auctionToClose.map((auction) => {
      return closeAuction(auction);
    });

    await Promise.all(closePromise);

    return { closedAuctions: closePromise.length };
  } catch (error) {
    console.log(error);
    return "No OPEN AUCTIONS";
  }
}

export const handler = processBid;
