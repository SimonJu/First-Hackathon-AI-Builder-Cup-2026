import { useState } from 'react'
import './App.css'

const panels = [
  {
    id: 1,
    speaker: 'Mika',
    dialogue: "You're finally here.",
    sfx: 'Rain falling',
    description: {
      concise: 'Mika waits outside in the rain.',
      balanced:
        'Mika stands beneath an umbrella on a quiet street while rain falls around her.',
      detailed:
        'Mika stands alone beneath a dark umbrella on a quiet city street at night. Rain falls heavily around her as she looks toward someone approaching from the distance.',
    },
  },
  {
    id: 2,
    speaker: 'Haru',
    dialogue: 'Sorry. I got held up.',
    sfx: 'Footsteps',
    description: {
      concise: 'Haru approaches Mika.',
      balanced:
        'Haru walks toward Mika, slightly out of breath, while she watches him approach.',
      detailed:
        'Haru approaches from the other side of the street, slightly out of breath. His clothes are damp from the rain, and Mika turns toward him with a relieved expression.',
    },
  },
  {
    id: 3,
    speaker: 'Mika',
    dialogue: 'I thought you forgot.',
    sfx: 'Distant train passing',
    description: {
      concise: 'Mika looks away.',
      balanced:
        'Mika looks away from Haru and lowers her umbrella slightly.',
      detailed:
        'Mika avoids Haru’s gaze and lowers her umbrella slightly. Her expression softens, but her posture suggests she had been worried he would not come.',
    },
  },
]

function App() {
  const [panelIndex, setPanelIndex] = useState(0)
  const [narrationLevel, setNarrationLevel] = useState('balanced')

  const panel = panels[panelIndex]

  const previousPanel = () => {
    if (panelIndex > 0) {
      setPanelIndex(panelIndex - 1)
    }
  }

  const nextPanel = () => {
    if (panelIndex < panels.length - 1) {
      setPanelIndex(panelIndex + 1)
    }
  }

  const listenToPanel = () => {
    window.speechSynthesis.cancel()

    const text = `
      ${panel.description[narrationLevel]}
      ${panel.sfx ? `Sound effect: ${panel.sfx}.` : ''}
      ${panel.speaker} says: ${panel.dialogue}
    `

    const speech = new SpeechSynthesisUtterance(text)
    speech.rate = 1

    window.speechSynthesis.speak(speech)
  }

  return (
    <div className="app">
      <header className="topbar">
        <div>
          <p className="eyebrow">AI Builder Cup 2026</p>
          <h1>Manga Reader</h1>
        </div>

        <button className="secondary-button" type="button">
          Accessibility
        </button>
      </header>

      <main className="reader">
        <section className="manga-area" aria-label="Current manga panel">
          <div className="panel-placeholder">
            <span>Panel {panel.id}</span>
            <p>Manga artwork will appear here</p>
          </div>
        </section>

        <section
          className="reader-content"
          aria-live="polite"
          aria-label="Accessible panel description"
        >
          <div className="panel-meta">
            <span>
              Panel {panelIndex + 1} of {panels.length}
            </span>

            <span>Chapter 1</span>
          </div>

          <div className="content-block">
            <p className="label">Scene</p>
            <p className="description">
              {panel.description[narrationLevel]}
            </p>
          </div>

          <div className="content-block dialogue-block">
            <p className="label">Dialogue</p>
            <h2>{panel.speaker}</h2>
            <p className="dialogue">“{panel.dialogue}”</p>
          </div>

          {panel.sfx && (
            <div className="content-block">
              <p className="label">Sound effect</p>
              <p>{panel.sfx}</p>
            </div>
          )}

          <div className="narration-settings">
            <p className="label">Narration detail</p>

            <div className="segmented-control">
              {['concise', 'balanced', 'detailed'].map((level) => (
                <button
                  key={level}
                  type="button"
                  className={narrationLevel === level ? 'active' : ''}
                  onClick={() => setNarrationLevel(level)}
                  aria-pressed={narrationLevel === level}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="reader-controls">
            <button
              type="button"
              onClick={previousPanel}
              disabled={panelIndex === 0}
            >
              ← Previous
            </button>

            <button
              type="button"
              className="listen-button"
              onClick={listenToPanel}
            >
              ▶ Listen
            </button>

            <button
              type="button"
              onClick={nextPanel}
              disabled={panelIndex === panels.length - 1}
            >
              Next →
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App