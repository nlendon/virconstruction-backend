import { AdminModel } from './admin.model';
import { ContactModel } from './contact.model';
import { ReviewModel } from './review.model';

const Models = async () => {
  await AdminModel.sync({ force: false });
  await ContactModel.sync({ force: false });
  await ReviewModel.sync({ force: false });
};

Models();