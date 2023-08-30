import './StartButton.css'
import { useQuestionsStore } from '../store/useQuestionsStore'

const LIMIT_QUESTIONS = 10

export const StartButton = () => {
	const getQuestions = useQuestionsStore((state) => state.getQuestions)

	const handleClick = () => {
		getQuestions(LIMIT_QUESTIONS)
	}

	return (
		<button
			onClick={handleClick}
			className='start-button'>
			¡Empezar test!
		</button>
	)
}
