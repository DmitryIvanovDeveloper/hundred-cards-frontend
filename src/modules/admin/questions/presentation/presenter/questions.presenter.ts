import QuestionViewModel from "../view-models/question.view-model";
import { inject } from "inversify";
import { TYPES } from "../../types";
import { computed } from "@vue/reactivity";
import IQuestionsLocalRepository from "../../business/plugins/questions.local.repository.plugin";

export default class QuestionsPresenter {

    constructor(
        @inject(TYPES.QuestionsLocalRepository)
        private readonly _repository: IQuestionsLocalRepository
    ){}

    public readonly labels = {
        title: 'Вопросы',
        question: 'Вопрос',
        answers: 'Ответы',
        addAnswer: 'Добавить',
        points: 'Очки за правильный ответ'
    }

    public questionsViewModel = computed(() => this.presentQuestions())
    public questionViewModel = computed(() => this.presentQuestion())
    
    private presentQuestions(): Array<QuestionViewModel> {
        const questions = this._repository.getQuestions().value;
        return questions.map(question => new QuestionViewModel(question)).sort((a, b) => a.order - b.order);
    }

    private presentQuestion(): QuestionViewModel | null{
        const question = this._repository.getQuestion().value;
        if (!question) {
            return null;
        }

        return new QuestionViewModel(question);
    }
} 