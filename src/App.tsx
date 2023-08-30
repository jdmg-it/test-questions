import './App.css'
import { Card } from './components/Card'
import { Results } from './components/Results'
import { StartButton } from './components/StartButton'
import { useQuestionsData } from './hooks/useQuestionsData'
import { useQuestionsStore } from './store/useQuestionsStore'

function App() {
	const questions = useQuestionsStore((state) => state.questions)
	const { unanswered } = useQuestionsData()

	return (
		<>
			<h1>Aplicación de Preguntas</h1>
			{questions.length <= 0 && <StartButton />}
			{questions.length > 0 && unanswered > 0 && <Card />}
			{questions.length > 0 && unanswered == 0 && <Results />}
		</>
	)
}

export default App
