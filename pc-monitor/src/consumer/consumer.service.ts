import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PC } from './pc.entity';

@Injectable()
export class ConsumerService {
  private _pcList: Record<string, PC> = {};

  @Cron(CronExpression.EVERY_10_SECONDS)
  handleCron() {
    const newPCList: Record<string, PC> = {};
    Object.keys(this._pcList)
      .filter(
        (item) =>
          !this._pcList[item] ||
          Date.now() - this._pcList[item].updateAt < 10000,
      )
      .map((item2) => {
        newPCList[item2] = this._pcList[item2];
      });

    this._pcList = newPCList;
  }

  setPCList(data: PC) {
    this._pcList[data.pcId] = data;
  }

  getPCList() {
    return this._pcList;
  }
}
