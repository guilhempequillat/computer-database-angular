import {Company} from './company.model';
import {CustomDate} from './customDate.model';

export class Computer {
  id: number;
  name: string;
  introduced: CustomDate;
  discontinued: CustomDate;
  introducedString: string;
  discontinuedString: string;
  company: Company;
  company_id: string;
}
