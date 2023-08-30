import './Footer.css'
import { useQuestionsData } from '../hooks/useQuestionsData'
import { useQuestionsStore } from '../store/useQuestionsStore'

export const Footer = () => {
	const { correct, incorrect, unanswered } = useQuestionsData()
	const reset = useQuestionsStore((state) => state.reset)
	return (
		<footer className='stats-footer'>
			<strong>{`✅ ${correct} correctas - ❌ ${incorrect} incorrectas - ❓ ${unanswered} sin responder`}</strong>

			<button
				className='restart-button'
				onClick={() => reset()}>
				Volver a empezar
			</button>
		</footer>
	)
}
