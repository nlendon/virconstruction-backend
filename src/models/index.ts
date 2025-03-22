import { AdminModel } from './admin.model';
import { ContactModel } from './contact.model';
import { ReviewModel } from './review.model';
import { GlobalModel } from './global.model';

const Models = async () => {
  await AdminModel.sync({ force: false });
  await ContactModel.sync({ force: false });
  await ReviewModel.sync({ force: false });
  await GlobalModel.sync({ force: false });
};

Models();