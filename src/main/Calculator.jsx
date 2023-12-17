import { React, Component } from 'react'
import './Calculator.css'
import Display from '../components/Display'
import Button from '../components/Button'

const inicialState ={
    displayValue: "0",
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
}

export default class Calculator extends Component {

    state = {...inicialState}

    constructor(props) {
        super(props)

        this.clearMemory = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.addDigit = this.addDigit.bind(this)
    }
    clearMemory() {
        this.setState({...inicialState})
        console.log('limpar')
    }
    setOperation(operation) {
        if (this.state.current === 0){//muda o valor do current
            this.setState({operation, current :1, clearDisplay: true })//altera os valores
        }else{
            const equals = operation === '=' //se clicou no = ou não
            const currentOpertation = this.state.operation; //pega a operação atual
            const values = [...this.state.values]//clone
            //pega o primeiro valor depois a operaçãp depois o segundo valor
            try{
            values[0] = eval(`${values[0]} ${currentOpertation} ${values[1]}`)//calculo em cima da função eval
            }catch(e){
                values[0] = this.setState.values[0]//se der erro pega o valor 0 que esta no estado atual

            }
            values[1] = 0 //o resltado fica ni i zero e o valor inicial sera zerado
            
            this.setState({
                displayValue: values[0],//resultado da operação i 0
                operation: equals ? null : operation, // se for igual vai para nulo senão continua com a operção
                current: equals ? 0 : 1,//se for equals sera o i 0 se nao o i 1
                clearDisplay: !equals, //se for diferente vai limpar se não vai continuar na operação
            
            })
        }
        console.log(operation)
    }
    addDigit(n) {
        //se haver . não posso add outro . e ele retorna vazio "Regra"
        if (n === '.' && this.state.displayValue.includes('.')){
            return
        }
        //vai limpar p/ add novo digito
        const clearDisplay = this.state.displayValue === '0'//tem apenas o digito 0
        || this.state.clearDisplay; //limpar quando for true evita o 0 a esquerda
        const currentValue = clearDisplay ? ' ' : this.state.displayValue //se o display for limpo true sera vazio, se não pega o this.state
        const displayValue = currentValue + n //pegar o valor velho mais o novo valor
        this.setState({ displayValue, clearDisplay: false})//sera chamado aqui e como já pegou os valores acima ele mostrara no display

        if (n !== '.'){//ao armazenar um n diferente de . sera armaz no array(value)
            const i = this.state.current//indice que sera manipulado
            const newValue = parseFloat(displayValue);//currentValue + n converteu p/ float
            const values = [...this.state.values]//clonou o array
            values[i] = newValue//se estiver no i 0 mudara ou no i 1
            this.setState({ values })//alterou o estado e passou p/ array
            console.log(values)
        }
    }
    render() {
        return (
            <div className="Calculator">
                <Display value={this.state.displayValue} />
                <Button label="AC" onClick={this.clearMemory} triple />
                <Button label="/" onClick={this.setOperation} operation />
                <Button label="7" onClick={this.addDigit} />
                <Button label="8" onClick={this.addDigit} />
                <Button label="9" onClick={this.addDigit} />
                <Button label="*" onClick={this.setOperation} operation />
                <Button label="4" onClick={this.addDigit} />
                <Button label="5" onClick={this.addDigit} />
                <Button label="6" onClick={this.addDigit} />
                <Button label="-" onClick={this.setOperation} operation />
                <Button label="1" onClick={this.addDigit} />
                <Button label="2" onClick={this.addDigit} />
                <Button label="3" onClick={this.addDigit} />
                <Button label="+" onClick={this.setOperation} operation />
                <Button label="0" onClick={this.addDigit} double />
                <Button label="." onClick={this.addDigit} />
                <Button label="=" onClick={this.setOperation} operation />

            </div>
        )
    }
}