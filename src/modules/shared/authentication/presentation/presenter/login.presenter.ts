import { injectable } from 'inversify';
import { reactive, ref } from 'vue';
import ILoginPresenter from '../../business/plugins/login.presenter.interface';


@injectable()
export default class LoginPresenter implements ILoginPresenter {
}
