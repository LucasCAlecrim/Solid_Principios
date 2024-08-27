"use strict";
// SOLID.ts
// Single Responsibility Principle (SRP)
// Classe Funcionario com responsabilidade única: armazenar dados do funcionário
class Funcionario {
    constructor(nome, salario) {
        this.nome = nome;
        this.salario = salario;
    }
}
// CalculadoraPagamento tem a responsabilidade única de calcular o pagamento
class CalculadoraPagamento {
    static calcular(funcionario, horasTrabalhadas) {
        return funcionario.salario * horasTrabalhadas;
    }
}
// Implementação para pagamento por hora
class PagamentoPorHora {
    calcularPagamento(funcionario, horasTrabalhadas) {
        return funcionario.salario * horasTrabalhadas;
    }
}
// Implementação para pagamento fixo
class PagamentoFixo {
    calcularPagamento(funcionario) {
        return funcionario.salario; // pagamento fixo
    }
}
// ProcessadorPagamento usa uma estratégia de pagamento sem modificar seu comportamento
class ProcessadorPagamento {
    constructor(estrategiaPagamento) {
        this.estrategiaPagamento = estrategiaPagamento;
    }
    processar(funcionario, horasTrabalhadas) {
        const pagamento = this.estrategiaPagamento.calcularPagamento(funcionario, horasTrabalhadas);
        return `Pagamento para ${funcionario.nome}: R$ ${pagamento.toFixed(2).replace('.', ',')}`;
    }
}
// Liskov Substitution Principle (LSP)
// Qualquer implementação de PagamentoStrategy deve ser substituível
const funcionario = new Funcionario("João", 50);
const pagamentoPorHora = new PagamentoPorHora();
const pagamentoFixo = new PagamentoFixo();
console.log(pagamentoPorHora.calcularPagamento(funcionario, 160)); // 8000.00
console.log(pagamentoFixo.calcularPagamento(funcionario)); // 50.00
// Implementação para log no console
class ConsoleLogger {
    log(message) {
        console.log(message);
    }
}
// Implementação para log em arquivo
class FileLogger {
    log(message) {
        // Simula gravação em arquivo
        console.log(`Gravado em arquivo: ${message}`);
    }
}
// Dependency Inversion Principle (DIP)
// App depende da abstração Logger, não de implementações concretas
class App {
    constructor(logger) {
        this.logger = logger;
    }
    run() {
        this.logger.log("Aplicação iniciada.");
    }
}
// Utilizando a classe App com diferentes loggers
const appConsole = new App(new ConsoleLogger());
appConsole.run();
const appFile = new App(new FileLogger());
appFile.run();
//# sourceMappingURL=solid.js.map