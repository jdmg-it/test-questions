import { create } from 'zustand'
import { type Question } from '../types'
import { persist } from 'zustand/middleware'
import confetti from 'canvas-confetti'
import { getAllQuestions } from '../services/getQuestions'

interface State {
	questions: Question[]
	currentQuestion: number
	getQuestions: (limit: number) => Promise<void>
	selectAnswer: (questionId: number, answerIndex: number) => void
	goToNextQuestion: () => void
	goToPrevQuestion: () => void
	reset: () => void
}

export const useQuestionsStore = create<State>()(
	persist(
		(set, get) => {
			return {
				questions: [],
				currentQuestion: 0,
				getQuestions: async (limit: number) => {
					const json = await getAllQuestions()
					const questions = json.sort(() => Math.random() - 0.5).slice(0, limit)

					set({ questions })
				},
				selectAnswer: (questionId: number, answerIndex: number) => {
					const { questions } = get()
					// usar el structuredClone para clonar el objeto
					const newQuestions = structuredClone(questions)
					// encontramos el índice de la pregunta
					const questionIndex = newQuestions.findIndex(
						(q) => q.id === questionId
					)
					// obtenemos la información de la pregunta
					const questionInfo = newQuestions[questionIndex]
					// averiguamos si el usuario ha seleccionado la respuesta correcta
					const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex

					if (isCorrectUserAnswer) confetti()

					// cambiar esta información en la copia de la pregunta
					newQuestions[questionIndex] = {
						...questionInfo,
						isCorrectUserAnswer,
						userSelectedAnswer: answerIndex
					}
					// actualizamos el estado
					set({ questions: newQuestions })
				},
				goToNextQuestion: () => {
					const { questions, currentQuestion } = get()
					const nextQuestion = currentQuestion + 1

					if (nextQuestion < questions.length) {
						set({ currentQuestion: nextQuestion })
					}
				},
				goToPrevQuestion: () => {
					const { currentQuestion } = get()
					const prevQuestion = currentQuestion - 1

					if (prevQuestion >= 0) {
						set({ currentQuestion: prevQuestion })
					}
				},
				reset: () => {
					set({ currentQuestion: 0, questions: [] })
				}
			}
		},
		{ name: 'questions' }
	)
)
