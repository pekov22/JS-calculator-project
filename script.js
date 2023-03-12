class Calculator{
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement= previousOperandTextElement
        this.currentOperandTextElement= currentOperandTextElement
        this.clear()
    }

    clear(){
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation=undefined
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1) //slice는 뭐지?
    }

    appendNumber(number){
        if(number==='.' && this.currentOperand.includes('.')) return //dot을 하나만 쓰게
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation){
        if(this.currentOperand==='') return //연산자 선택후 두 번째 항목 안지워지게
        if(this.previousOperand !==''){
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute(){
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(current)) return
        switch(this.operation){
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '+':
                computation = prev + current
                break
            case '/':
                computation = prev / current
                break
            default:
                return 
        }
        this.currentOperand= computation
        this.operation = undefined
        this.previousOperand = ''

    }

    getDisplayNumber(number){
        const stringNumber = number.toString()
        const integerDigits= parseFloat(stringNumber.split('.')[0])
        const decimalDigits= stringNumber.split('.')[1]
        let integerDisplay
        if(isNaN(integerDigits)){
            integerDisplay = ''
        } else{
            integerDisplay = integerDigits.toLocaleString('en',{
                maximumFractionDigits:0 })
        }
        if( decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`
        } else{
            return integerDisplay
        }
       /* const floatNumber = parseFloat(number)
        if(isNaN(floatNumber)) return '' 
        return floatNumber.toLocaleString('en')  //뭐지? */
    }

    updateDisplay(){
        this.currentOperandTextElement.innerText=
        this.getDisplayNumber(this.currentOperand)
        if(this.operation != null){ 
            this.previousOperandTextElement.innerText=
            `${this.previousOperand} ${this.operation}`
        } else{
            this.previousOperandTextElement.innerText= '' //계산 완료시 위의 식 지움
        }
    }
}

const numberButtons = document.querySelectorAll("[data-number]")
const operaionButtons = document.querySelectorAll("[data-operaion]") // 세미 콜론 왜 안씀?
const equalsButton = document.querySelector("[data-equals]")
const deleteButton = document.querySelector("[data-delete]")
const allClearButton = document.querySelector("[data-all-clear]")
const previousOperandTextElement = document.querySelector(
    "[data-previous-operand]")
const currentOperandTextElement = document.querySelector(
    "[data-current-operand]")

const calculator = new Calculator(previousOperandTextElement,
    currentOperandTextElement)

numberButtons.forEach(button =>{
    button.addEventListener('cl;ick', ()=>{
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button =>{
    button.addEventListener('cl;ick', ()=>{
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button=>{
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button=>{
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button=>{
    calculator.delete()
    calculator.updateDisplay()
})