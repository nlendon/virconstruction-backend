import { AdminModel } from './admin.model';
import { ContactModel } from './contact.model';

const Models = async () => {
  await AdminModel.sync({ force: false });
  await ContactModel.sync({ force: false });
};

Models();