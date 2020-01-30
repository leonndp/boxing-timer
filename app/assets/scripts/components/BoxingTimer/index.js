import React from 'react'
import TimerControls from './TimerControls'

export default class BoxingTimer extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            countdown: 0,
            secondsLeft: 0,
            display: '',
            rounds: {
                count: 0,
                time: 0,
                current: 0
            },
            restTime: 0,
            endTime: '',
            mode: ''
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.secondsLeft !== this.state.secondsLeft) {
            const minutes = Math.floor(this.state.secondsLeft / 60);
            const remainderSeconds = this.state.secondsLeft % 60
            this.setState({ display: `${minutes}:${remainderSeconds < 10 ? '0' + remainderSeconds : remainderSeconds}` })
        }
    }

    reset = () => {
        this.setState({
            countdown: clearInterval(this.state.countdown),
            secondsLeft: 0
        })
    }

    timer(seconds, callback) {
        this.setState({
            countdown: clearInterval(this.state.countdown)
        })

        const now = Date.now()
        const then = now + seconds * 1000
        this.setState({ secondsLeft: seconds })


        this.setState({
            countdown: setInterval(() => {
                this.setState(() => ({
                    secondsLeft: Math.round((then - Date.now()) / 1000)
                }))
                // const secondsLeft = Math.round((then - Date.now()) / 1000)

                if (this.state.secondsLeft < 0) {
                    this.setState({ countdown: clearInterval(this.state.countdown) })
                    callback()
                }

                // this.displayTimeLeft()
            }, 1000)
        })
    }

    startRound = () => {
        this.setState(() => ({
            rounds: {
                ...this.state.rounds,
                current: this.state.rounds.current + 1
            },
            mode: 'round'
        }), () => {
            if (this.state.rounds.current < this.state.rounds.count) {
                this.timer(this.state.rounds.time, this.startRest)
            } else {
                this.timer(this.state.rounds.time, this.reset)
            }

        })
    }

    startRest = () => {
        this.setState(() => ({
            mode: 'rest'
        }), () => {
            this.timer(this.state.restTime, this.startRound)
        })
    }

    displayTimeLeft() {
        const minutes = Math.floor(this.state.secondsLeft / 60);
        const remainderSeconds = this.state.secondsLeft % 60
        this.setState({ display: `${minutes}:${remainderSeconds < 10 ? '0' + remainderSeconds : remainderSeconds}` })
        // document.title = display;
    }

    onSubmit = ({ rounds, restTime }) => {

        this.setState(() => ({
            rounds,
            restTime
        }), () => {
            this.startRound()

        })

    }

    render() {
        return (
            <div className="timer">
                <TimerControls onSubmit={this.onSubmit} />
                <div className="display">
                    <h1 className="display__time-left">{this.state.display}</h1>
                    <p className="display__end-time">{this.state.endTime}</p>
                </div>
            </div>
        )
    }
}