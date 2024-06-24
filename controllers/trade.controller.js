import prisma from "../lib/prisma.js";
import { errorHandler } from "../utils/error.js";
import fs from "fs";
import { parse } from "csv-parse";

export const uploadCSV = async (req, res, next) => {
  try {
    const file = req.file;
    if (!file) {
      return next(errorHandler(400, "Please upload a file"));
    }
    const filePath = file.path;
    const results = [];
    fs.createReadStream(filePath)
      .pipe(parse({ delimiter: "," }))
      .on("data", (data) => {
        results.push(data);
      })
      .on("end", async () => {
        fs.unlinkSync(filePath);
        const trades = results.slice(1).map((trade) => {
          const [base_coin, quote_coin] = trade[3].split("/");
          return {
            user_id: parseInt(trade[0]),
            utc_time: new Date(Date.parse(trade[1])),
            operation: trade[2],
            base_coin: base_coin,
            quote_coin: quote_coin,
            amount: parseFloat(trade[4]),
            price: parseFloat(trade[5]),
          };
        });
        // console.log(trades);
        await prisma.trade.createMany({
          data: trades,
          // skipDuplicates: true,
        });
      });
    res.status(200).json({
      success: true,
      message: "File uploaded successfully",
      trades: results.length - 1,
    });
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};

export const assetBalance = async (req, res, next) => {
  try {
    const { timestamp } = req.body;
    if (!timestamp) {
      return next(errorHandler(400, "Please provide a timestamp"));
    }
    const targetTime = new Date(Date.parse(timestamp));
    const trades = await prisma.trade.findMany({
      where: {
        utc_time: {
          lte: targetTime,
        },
      },
    });
    const balance = {};
    trades.forEach((trade) => {
      if (!balance[trade.base_coin]) {
        balance[trade.base_coin] = 0;
      }

      if (trade.operation === 'Buy') {
        balance[trade.base_coin] += trade.amount;
      } else if (trade.operation === 'Sell') {
        balance[trade.base_coin] -= trade.amount;
      }
    });
    // console.log(balance);
    res.status(200).json({
      success: true,
      message: "Asset balance calculated successfully",
      balance: balance,
    });
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};
