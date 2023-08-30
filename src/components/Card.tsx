import './Card.css'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { anOldHope } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { type Question } from '../types'
import { leftArrowIcon, rightArrowIcon } from '../assets/icons'

import { useQuestionsStore } from '../store/useQuestionsStore'
import { Footer } from './Footer'

const getBackgroundColor = (info: Question, index: number) => {
	const { userSelectedAnswer, correctAnswer } = info
	// usuario no ha seleccionado nada todavía
	if (userSelectedAnswer == null) return 'transparent'
	// si ya selecciono pero la solución es incorrecta
	if (index !== correctAnswer && index !== userSelectedAnswer)
		return 'transparent'
	// si esta es la solución correcta
	if (index === correctAnswer) return 'right-answer'
	// si esta es la selección del usuario pero no es correcta
	if (index === userSelectedAnswer) return 'wrong-answer'
	// si no es ninguna de las anteriores
	return 'transparent'
}

const QuestionHeader = ({
	question,
	currentQuestion
}: {
	question: string
	currentQuestion: number
}) => {
	return (
		<header className='card-header'>
			<h5>Pregunta {currentQuestion + 1}:</h5>
			<h2 className='card-title'>{question}</h2>
			<hr className='card-divider' />
		</header>
	)
}

const QuestionBody = ({ questionInfo }: { questionInfo: Question }) => {
	const selectAnswer = useQuestionsStore((state) => state.selectAnswer)

	const createHandleClick = (answerIndex: number) => () => {
		selectAnswer(questionInfo.id, answerIndex)
	}

	return (
		<>
			<SyntaxHighlighter
				className='card-code'
				language='javascript'
				showLineNumbers
				style={anOldHope}>
				{questionInfo.code}
			</SyntaxHighlighter>
			<ul>
				{questionInfo.answers.map((answer, index) => (
					<li
						className='card-answer'
						key={index}>
						<button
							disabled={questionInfo.userSelectedAnswer != null}
							onClick={createHandleClick(index)}
							className={getBackgroundColor(questionInfo, index)}>
							{answer}
						</button>
					</li>
				))}
			</ul>
		</>
	)
}

const QuestionFooter = ({
	questions,
	currentQuestion
}: {
	questions: Question[]
	currentQuestion: number
}) => {
	const goToNextQuestion = useQuestionsStore((state) => state.goToNextQuestion)
	const goToPrevQuestion = useQuestionsStore((state) => state.goToPrevQuestion)
	return (
		<>
			<hr className='card-divider' />
			<footer className='card-footer'>
				<button
					disabled={currentQuestion <= 0}
					onClick={goToPrevQuestion}
					className='card-footer-item'>
					{leftArrowIcon}
					Anterior
				</button>
				{currentQuestion + 1} / {questions.length}
				<button
					disabled={currentQuestion >= questions.length - 1}
					onClick={goToNextQuestion}
					className='card-footer-item'>
					Siguiente
					{rightArrowIcon}
				</button>
			</footer>
		</>
	)
}

export const Card = () => {
	const questions = useQuestionsStore((state) => state.questions)
	const currentQuestion = useQuestionsStore((state) => state.currentQuestion)

	const questionInfo = questions[currentQuestion]

	return (
		<>
			<section className='card'>
				<QuestionHeader
					question={questionInfo.question}
					currentQuestion={currentQuestion}
				/>
				<QuestionBody questionInfo={questionInfo} />
				<QuestionFooter
					questions={questions}
					currentQuestion={currentQuestion}
				/>
			</section>
			<Footer />
		</>
	)
}
