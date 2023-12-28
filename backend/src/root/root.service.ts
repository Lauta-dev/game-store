import { Injectable } from '@nestjs/common';

@Injectable()
export class RootService {
  constructor(
  ) { }

  showThisMessage() {
    return "asd"
  }

}
