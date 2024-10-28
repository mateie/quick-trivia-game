import { useEffect, useState } from "react";
import "./App.css";
import { Button, Stack, Typography, useForkRef } from "@mui/material";

import shuffle from "lodash/shuffle";

const App = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [currentScore, setCurrentScore] = useState(0);

    const questions = shuffle([
        {
            question: "What is 2 + 2?",
            options: ["4", "22", "5", "6"],
            correctAnswer: "4",
        },
        {
            question: "What is the capital of France?",
            options: ["Paris", "London", "Berlin", "Madrid"],
            correctAnswer: "Paris",
        },
        {
            question: "Which planet is known as the Red Planet?",
            options: ["Mars", "Venus", "Jupiter", "Saturn"],
            correctAnswer: "Mars",
        },
        {
            question: "What is the largest ocean on Earth?",
            options: [
                "Pacific Ocean",
                "Atlantic Ocean",
                "Indian Ocean",
                "Arctic Ocean",
            ],
            correctAnswer: "Pacific Ocean",
        },
        {
            question: "Who wrote 'To Kill a Mockingbird'?",
            options: [
                "Harper Lee",
                "Mark Twain",
                "Ernest Hemingway",
                "F. Scott Fitzgerald",
            ],
            correctAnswer: "Harper Lee",
        },
    ]);

    const shuffleQuestions = () => {
        setCurrentQuestion(0);
        setShowScore(false);
        setCurrentScore(0);
        questions.forEach((question) => {
            question.shown = false;
        });
    };

    useEffect(() => {
        shuffleQuestions();
    }, []);

    const handleNextQuestion = (option) => {
        if (questions[currentQuestion].shown) return;

        if (option === questions[currentQuestion].correctAnswer) {
            setCurrentScore(currentScore + 1);
        }
        if (currentQuestion + 1 < questions.length) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setShowScore(true);
        }

        questions[currentQuestion].shown = true;
    };

    return (
        <Stack justifyContent="center" alignItems="center">
            {showScore ? (
                <Stack gap={2}>
                    <Typography variant="h4">
                        You scored {currentScore} out of {questions.length}
                    </Typography>
                    <Button variant="contained" onClick={shuffleQuestions}>
                        Play Again
                    </Button>
                </Stack>
            ) : (
                <Stack gap={2}>
                    <Typography variant="h5">
                        {questions[currentQuestion].question}
                    </Typography>
                    <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        gap={1}
                    >
                        {questions[currentQuestion].options.map((option) => (
                            <Button
                                key={option}
                                variant="contained"
                                onClick={() => handleNextQuestion(option)}
                            >
                                {option}
                            </Button>
                        ))}
                    </Stack>
                </Stack>
            )}
        </Stack>
    );
};

export default App;
