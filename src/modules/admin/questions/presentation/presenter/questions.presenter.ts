import { ref } from "vue";
import IQuestionsPresenter from "../../business/plugins/questions.presenter.plugin";
import QuestionViewModel from "../view-models/question.view-model";
import Question from "../../business/entities/question";

export default class QuestionsPresenter implements IQuestionsPresenter {

    public readonly questionsViewModel = ref<Array<QuestionViewModel>>([]);
    public readonly questionViewModel = ref<QuestionViewModel>();
    
    public presentQuestions(questions: Array<Question>): void {
       this.questionsViewModel.value = questions.map(question => new QuestionViewModel(question));
    }

    public presentQuestion(question: Question): void {
        this.questionViewModel.value =  new QuestionViewModel(question);
    }
} 