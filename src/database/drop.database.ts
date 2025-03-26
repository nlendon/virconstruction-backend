import { AdminModel } from '../models/admin.model';
import { ContactModel } from '../models/contact.model';
import { ReviewModel } from '../models/review.model';
import { GlobalModel } from '../models/global.model';

const DropDatabase = async () => {
  await AdminModel.sync({ force: true });
  await ContactModel.sync({ force: true });
  await ReviewModel.sync({ force: true });
  await GlobalModel.sync({ force: true });
};

DropDatabase();
