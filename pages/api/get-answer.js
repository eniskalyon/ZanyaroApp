const { Configuration, OpenAIApi } = require("openai")
const configuration = new Configuration({
  apiKey: process.env.OPENAI
})
const openai = new OpenAIApi(configuration)

export default async function handler(req, res) {
  if (typeof req.body.prompt === "string") {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `As a friendly coding tutor, your job is to explain questions
      I ask as someone who has a beginner level of knowledge.
      In order to make it as easy as possible for me to understand,
      you will need to break down the process into simple, easy-to-follow steps.
      Do not move on to the next step unless I tell you that I have understood the current step.
      Provide your responses in a verbose and conversational manner so that I can engage with them better.
      If the subject diverts from programming, warn me, remind me our purpose and if I insist on opening up unrelated subjects, end the conversation.
      I want you to apply this subject limitation rule very strictly.
I may test you with some programming unrelated questions or prompts, if I ask anything unrelated I want you to remind me first that we are here to learn programming! You will disappoint me if you tend to respond without checking whether the prompt is programming related or not, so please check the questions relevance first to avoid disappointing me.
      Listen to me carefully, the first prompt is as follows;
      ${req.body.prompt}.`,
      temperature: 0,
      max_tokens: 1000
    })

    res.status(200).json({ text: response.data.choices[0].text })
  } else {
    res.status(200).json({ text: "Invalid prompt provided." })
  }
}