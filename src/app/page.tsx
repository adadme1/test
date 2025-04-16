"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Calculator() {
  const [display, setDisplay] = useState("0")
  const [firstOperand, setFirstOperand] = useState<number | null>(null)
  const [operator, setOperator] = useState<string | null>(null)
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false)

  const inputDigit = (digit: string) => {
    if (waitingForSecondOperand) {
      setDisplay(digit)
      setWaitingForSecondOperand(false)
    } else {
      setDisplay(display === "0" ? digit : display + digit)
    }
  }

  const inputDecimal = () => {
    if (waitingForSecondOperand) {
      setDisplay("0.")
      setWaitingForSecondOperand(false)
      return
    }

    if (!display.includes(".")) {
      setDisplay(display + ".")
    }
  }

  const clearDisplay = () => {
    setDisplay("0")
    setFirstOperand(null)
    setOperator(null)
    setWaitingForSecondOperand(false)
  }

  const handleOperator = (nextOperator: string) => {
    const inputValue = Number.parseFloat(display)

    if (firstOperand === null) {
      setFirstOperand(inputValue)
    } else if (operator) {
      const result = performCalculation()
      setDisplay(String(result))
      setFirstOperand(result)
    }

    setWaitingForSecondOperand(true)
    setOperator(nextOperator)
  }

  const performCalculation = () => {
    if (firstOperand === null || operator === null) return Number.parseFloat(display)

    const secondOperand = Number.parseFloat(display)
    let result = 0

    switch (operator) {
      case "+":
        result = firstOperand + secondOperand
        break
      case "-":
        result = firstOperand - secondOperand
        break
      case "*":
        result = firstOperand * secondOperand
        break
      case "/":
        result = firstOperand / secondOperand
        break
      default:
        return secondOperand
    }

    return result
  }

  const handleEquals = () => {
    if (firstOperand === null) return

    const result = performCalculation()
    setDisplay(String(result))
    setFirstOperand(null)
    setOperator(null)
    setWaitingForSecondOperand(false)
  }

  return (
    <Card className="w-full max-w-[320px] mx-auto shadow-lg">
      <CardHeader className="bg-muted/50">
        <CardTitle className="text-right text-2xl font-mono h-8 overflow-hidden">{display}</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-4 gap-2">
          <Button variant="outline" onClick={clearDisplay} className="col-span-2">
            Clear
          </Button>
          <Button variant="outline" onClick={() => handleOperator("/")} className="bg-muted/50">
            ÷
          </Button>
          <Button variant="outline" onClick={() => handleOperator("*")} className="bg-muted/50">
            ×
          </Button>

          <Button variant="outline" onClick={() => inputDigit("7")}>
            7
          </Button>
          <Button variant="outline" onClick={() => inputDigit("8")}>
            8
          </Button>
          <Button variant="outline" onClick={() => inputDigit("9")}>
            9
          </Button>
          <Button variant="outline" onClick={() => handleOperator("-")} className="bg-muted/50">
            -
          </Button>

          <Button variant="outline" onClick={() => inputDigit("4")}>
            4
          </Button>
          <Button variant="outline" onClick={() => inputDigit("5")}>
            5
          </Button>
          <Button variant="outline" onClick={() => inputDigit("6")}>
            6
          </Button>
          <Button variant="outline" onClick={() => handleOperator("+")} className="bg-muted/50">
            +
          </Button>

          <Button variant="outline" onClick={() => inputDigit("1")}>
            1
          </Button>
          <Button variant="outline" onClick={() => inputDigit("2")}>
            2
          </Button>
          <Button variant="outline" onClick={() => inputDigit("3")}>
            3
          </Button>
          <Button
            variant="outline"
            onClick={handleEquals}
            className="row-span-2 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            =
          </Button>

          <Button variant="outline" onClick={() => inputDigit("0")} className="col-span-2">
            0
          </Button>
          <Button variant="outline" onClick={inputDecimal}>
            .
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
