import {Company} from './company.model';
import {CustomDate} from './customDate.model';

export class Computer {
  id: number;
  name: string;
  introduced: CustomDate;
  discontinued: CustomDate;
  company: Company;
}
