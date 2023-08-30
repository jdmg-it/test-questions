import './Results.css'
import { useQuestionsData } from '../hooks/useQuestionsData'
import { useQuestionsStore } from '../store/useQuestionsStore'

export const Results = () => {
	const { correct, incorrect } = useQuestionsData()
	const reset = useQuestionsStore((state) => state.reset)
	return (
		<section className='results-card'>
			<h2>¡Tus Resultados!</h2>
			<strong>
				<p>✅ {correct} correctas</p>
				<p>❌ {incorrect} incorrectas</p>
			</strong>
			<footer>
				<button
					className='restart-button'
					onClick={() => reset()}>
					Volver a empezar
				</button>
			</footer>
		</section>
	)
}
