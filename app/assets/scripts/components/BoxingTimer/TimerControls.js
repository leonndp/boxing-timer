import React from 'react'

export default class TimerControls extends React.Component {
    constructor(props) {
        super(props)
    }

    onSubmit = (e) => {
        e.preventDefault();
        const settings = e.currentTarget

        this.props.onSubmit({
            rounds: {
                count: Number(settings.roundCount.value),
                time: Number(+(settings.roundMinutes.value * 60) + +settings.roundSeconds.value),
                current: 0
            },
            restTime: Number(+(settings.restMinutes.value * 60) + +settings.restSeconds.value)
        })

        settings.reset()
    }

    render() {
        return (
            <div className="timer__controls">
                <form onSubmit={this.onSubmit}>
                    <input type="number" name="roundMinutes" placeholder="Enter Round Minutes" min="0" max="59" value='0' />
                    <input type="number" name="roundSeconds" placeholder="Enter Round Seconds" min="0" max="59" value='2' />

                    <input type="number" name="roundCount" min="1" placeholder="Enter number of rounds" value='3' />

                    <input type="number" name="restMinutes" placeholder="Enter Rest Minutes" min="0" max="59" value='0' />
                    <input type="number" name="restSeconds" placeholder="Enter Rest Seconds" min="0" max="59" value='2' />
                    <button type="submit">Enter</button>
                </form>
            </div>
        )
    }
}