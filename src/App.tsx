import { useCallback, useEffect, useState } from "react";
import { evaluate } from "mathjs";
import { twMerge } from "tailwind-merge";
import { TiWeatherNight, TiWeatherSunny } from "react-icons/ti";

import { Button } from "./components";

type Theme = "light" | "dark";
type CalButtonType = "clear" | "symbol" | "operation" | "number" | "equal";

const buttons = [
    {
        label: "AC",
        symbol: "ac",
        type: "clear",
        className: "bg-gray-50 dark:bg-gray-900 text-red-600",
    },
    {
        label: "C",
        symbol: "c",
        type: "clear",
        className: "bg-gray-50 dark:bg-gray-900 text-red-600",
    },
    {
        label: "%",
        symbol: "%",
        type: "symbol",
        className: "bg-gray-50 dark:bg-gray-900 text-green-600",
    },
    {
        label: "÷",
        symbol: "/",
        type: "operation",
        className: "bg-gray-50 dark:bg-gray-900 text-blue-600",
    },
    {
        label: "7",
        symbol: "7",
        type: "number",
        className:
            "bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200",
    },
    {
        label: "8",
        symbol: "8",
        type: "number",
        className:
            "bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200",
    },
    {
        label: "9",
        symbol: "9",
        type: "number",
        className:
            "bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200",
    },
    {
        label: "X",
        symbol: "*",
        type: "operation",
        className: "bg-gray-50 dark:bg-gray-900 text-blue-600",
    },
    {
        label: "4",
        symbol: "4",
        type: "number",
        className:
            "bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200",
    },
    {
        label: "5",
        symbol: "5",
        type: "number",
        className:
            "bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200",
    },
    {
        label: "6",
        symbol: "6",
        type: "number",
        className:
            "bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200",
    },
    {
        label: "-",
        symbol: "-",
        type: "operation",
        className: "bg-gray-50 dark:bg-gray-900 text-blue-600",
    },
    {
        label: "1",
        symbol: "1",
        type: "number",
        className:
            "bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200",
    },
    {
        label: "2",
        symbol: "2",
        type: "number",
        className:
            "bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200",
    },
    {
        label: "3",
        symbol: "3",
        type: "number",
        className:
            "bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200",
    },
    {
        label: "+",
        symbol: "+",
        type: "operation",
        className: "bg-gray-50 dark:bg-gray-900 text-blue-600",
    },
    {
        label: "00",
        symbol: "00",
        type: "number",
        className:
            "bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200",
    },
    {
        label: "0",
        symbol: "0",
        type: "number",
        className:
            "bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200",
    },
    {
        label: ".",
        symbol: ".",
        type: "symbol",
        className: "bg-gray-50 dark:bg-gray-900 text-green-600",
    },
    {
        label: "=",
        symbol: "=",
        type: "equal",
        className: "bg-gray-50 dark:bg-gray-900 text-blue-600",
    },
];

const App = () => {
    const [theme, setTheme] = useState<Theme>("light");

    const [operation, setOperation] = useState<string>("");
    const [result, setResult] = useState<string>("");

    // Change theme
    const changeToLightMode = useCallback(() => {
        setTheme("light");
    }, []);

    const changeToDarkMode = useCallback(() => {
        setTheme("dark");
    }, []);

    // Clear button
    const handleClear = useCallback((symbol: string) => {
        if (symbol === "ac") {
            setOperation("");
            setResult("");
        }

        if (symbol === "c") {
            setOperation((prev) => prev.slice(0, -1));
        }
    }, []);

    // Symbol button
    const handleSymbol = useCallback(
        (symbol: string) => {
            if (!operation) {
                setOperation(`0${symbol}`);
                return;
            }

            if (result) {
                setOperation(result + symbol);
                setResult("");
                return;
            }

            if (
                isNaN(Number(operation[operation.length - 1])) &&
                operation[operation.length - 1] !== symbol
            ) {
                setOperation(operation.slice(0, -1) + symbol);
                return;
            }

            if (
                isNaN(Number(operation[operation.length - 1])) &&
                operation[operation.length - 1] === symbol
            ) {
                return;
            }

            setOperation((prev) => prev + symbol);
        },
        [operation, result]
    );

    // Number button
    const handleNumber = useCallback(
        (symbol: string) => {
            if ((symbol === "00" || symbol === "0") && !operation) {
                return;
            }

            if (result) {
                setResult("");
                return;
            }

            setOperation((prev) => prev + `${symbol}`);
        },
        [operation, result]
    );

    // Operation button
    const handleOperation = useCallback(
        (symbol: string) => {
            if (!operation) {
                setOperation(`0${symbol}`);
                return;
            }

            if (result) {
                setOperation(result + symbol);
                setResult("");
                return;
            }

            if (
                (operation[operation.length - 1] === "+" ||
                    operation[operation.length - 1] === "-" ||
                    operation[operation.length - 1] === "*" ||
                    operation[operation.length - 1] === "/") &&
                operation[operation.length - 1] !== symbol
            ) {
                setOperation(operation.slice(0, -1) + symbol);
                return;
            }

            if (
                isNaN(Number(operation[operation.length - 1])) &&
                operation[operation.length - 1] === symbol
            ) {
                return;
            }

            setOperation((prev) => prev + symbol);
        },
        [operation, result]
    );

    // Equal button
    const handleEqual = useCallback(() => {
        const operationRs = evaluate(operation);
        setResult(operationRs);
    }, [operation]);

    // Update operation when clicked button on calculator
    const updateOperation = useCallback(
        (symbol: string, type: CalButtonType) => {
            switch (type) {
                case "clear":
                    handleClear(symbol);
                    break;
                case "symbol":
                    handleSymbol(symbol);
                    break;
                case "number":
                    handleNumber(symbol);
                    break;
                case "operation":
                    handleOperation(symbol);
                    break;
                case "equal":
                    handleEqual();
                    break;
            }
        },
        [handleClear, handleEqual, handleNumber, handleOperation, handleSymbol]
    );

    // Listen event when press keyboard
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const key = event.key;

            switch (key) {
                case "0":
                    updateOperation("0", "number");
                    break;
                case "1":
                    updateOperation("1", "number");
                    break;
                case "2":
                    updateOperation("2", "number");
                    break;
                case "3":
                    updateOperation("3", "number");
                    break;
                case "4":
                    updateOperation("4", "number");
                    break;
                case "5":
                    updateOperation("5", "number");
                    break;
                case "6":
                    updateOperation("6", "number");
                    break;
                case "7":
                    updateOperation("7", "number");
                    break;
                case "8":
                    updateOperation("8", "number");
                    break;
                case "9":
                    updateOperation("9", "number");
                    break;
                case "%":
                    updateOperation("%", "symbol");
                    break;
                case ".":
                    updateOperation(".", "symbol");
                    break;
                case "Backspace":
                    updateOperation("c", "clear");
                    break;
                case "+":
                    updateOperation("+", "operation");
                    break;
                case "-":
                    updateOperation("-", "operation");
                    break;
                case "*":
                    updateOperation("*", "operation");
                    break;
                case "/":
                    updateOperation("/", "operation");
                    break;
                case "Enter":
                    handleEqual();
                    break;
                case "=":
                    handleEqual();
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleEqual, updateOperation]);

    // Get default theme
    useEffect(() => {
        if (!localStorage.getItem("theme")) {
            localStorage.setItem("theme", "light");
        } else {
            setTheme(localStorage.getItem("theme") as Theme);
        }
    }, []);

    // Update class properties with theme
    useEffect(() => {
        if (theme === "light") {
            document.body.classList.remove("dark");
        } else {
            document.body.classList.add("dark");
        }
        localStorage.setItem("theme", theme);
    }, [theme]);

    return (
        <main
            className={twMerge(
                "h-screen bg-gray-100 dark:bg-gray-800",
                "flex justify-center items-center",
                "transition-all duration-100"
            )}
        >
            <section
                className={twMerge(
                    "relative",
                    "w-full max-w-80",
                    "bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
                    "border-2 border-gray-100/70 dark:border-gray-800/70",
                    "transition-all duration-100",
                    "shadow-lg",
                    "rounded-3xl overflow-hidden"
                )}
            >
                <div
                    className={twMerge(
                        "absolute top-4 left-1/2 -translate-x-1/2",
                        "flex items-center gap-4 py-2 px-[14px] rounded-xl",
                        "transition-all duration-100",
                        "bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500"
                    )}
                >
                    <button
                        className={twMerge(
                            "outline-none",
                            "data-[active=true]:text-gray-900"
                        )}
                        data-active={theme === "light" ? true : undefined}
                        onClick={() => {
                            if (theme !== "light") {
                                changeToLightMode();
                            }
                        }}
                    >
                        <TiWeatherSunny className="text-2xl" />
                    </button>
                    <button
                        className={twMerge(
                            "outline-none",
                            "data-[active=true]:text-gray-100"
                        )}
                        data-active={theme === "dark" ? true : undefined}
                        onClick={() => {
                            if (theme !== "dark") {
                                changeToDarkMode();
                            }
                        }}
                    >
                        <TiWeatherNight className="text-2xl" />
                    </button>
                </div>
                <div
                    className={twMerge(
                        "min-h-52 p-8",
                        "flex flex-col items-end justify-end"
                    )}
                >
                    {result && operation && (
                        <p className={twMerge("text-xl font-semibold")}>
                            {operation}
                        </p>
                    )}
                    <p className={twMerge("text-4xl font-bold")}>
                        {result ? result : operation}
                    </p>
                </div>
                <div
                    className={twMerge(
                        "grid grid-cols-4 gap-4",
                        "p-8 rounded-3xl",
                        "bg-gray-100 dark:bg-gray-800"
                    )}
                >
                    {buttons.map((button, index) => (
                        <Button
                            className={twMerge(
                                "aspect-square rounded-xl shadow-sm",
                                "text-lg font-bold",
                                button.className
                            )}
                            key={index}
                            onClick={() =>
                                updateOperation(
                                    button.symbol,
                                    button.type as CalButtonType
                                )
                            }
                        >
                            {button.label}
                        </Button>
                    ))}
                </div>
            </section>
        </main>
    );
};

export default App;
