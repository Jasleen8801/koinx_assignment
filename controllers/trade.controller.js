import prisma from "../lib/prisma.js";
import { errorHandler } from "../utils/error.js";
import { parse } from "csv-parse";
import stream from "stream";

export const uploadCSV = async (req, res, next) => {
  try {
    const file = req.file;
    if (!file) {
      return next(errorHandler(400, "Please upload a file"));
    }
    const results = [];
    const parseCsv = async (buffer) => {
      return new Promise((resolve, reject) => {
        const records = [];
        const bufferStream = new stream.PassThrough();
        bufferStream.end(buffer);
        bufferStream
          .pipe(parse({ delimiter: "," }))
          .on("data", (data) => {
            records.push(data);
          })
          .on("end", () => resolve(records))
          .on("error", reject);
      });
    };

    const trades = await parseCsv(file.buffer);
    const formattedTrades = trades.slice(1).map((trade) => {
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

    await prisma.trade.createMany({
      data: formattedTrades,
    });

    res.status(200).json({
      success: true,
      message: "File uploaded successfully",
      trades: formattedTrades.length,
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

      if (trade.operation === "Buy") {
        balance[trade.base_coin] += trade.amount;
      } else if (trade.operation === "Sell") {
        balance[trade.base_coin] -= trade.amount;
      }
    });

    res.status(200).json({
      success: true,
      message: "Asset balance calculated successfully",
      balance: balance,
    });
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};
