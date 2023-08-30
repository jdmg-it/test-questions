const API_URL = import.meta.env.PROD ? 'https://test-questions.surge.sh/' : 'http://localhost:5173/'

export const getAllQuestions = async () => {
	const res = await fetch(`${API_URL}/data.json`)
	const json = await res.json()
	return json
}
