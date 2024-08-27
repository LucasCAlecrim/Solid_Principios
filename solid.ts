// SOLID.ts

// Single Responsibility Principle (SRP)
// Classe Funcionario com responsabilidade única: armazenar dados do funcionário
class Funcionario {
    nome: string;
    salario: number;
  
    constructor(nome: string, salario: number) {
      this.nome = nome;
      this.salario = salario;
    }
  }
  
  // CalculadoraPagamento tem a responsabilidade única de calcular o pagamento
  class CalculadoraPagamento {
    static calcular(funcionario: Funcionario, horasTrabalhadas: number): number {
      return funcionario.salario * horasTrabalhadas;
    }
  }
  
  // Open/Closed Principle (OCP)
  // Interface para estratégias de pagamento
  interface PagamentoStrategy {
    calcularPagamento(funcionario: Funcionario, horasTrabalhadas: number): number;
  }
  
  // Implementação para pagamento por hora
  class PagamentoPorHora implements PagamentoStrategy {
    calcularPagamento(funcionario: Funcionario, horasTrabalhadas: number): number {
      return funcionario.salario * horasTrabalhadas;
    }
  }
  
  // Implementação para pagamento fixo
  class PagamentoFixo implements PagamentoStrategy {
    calcularPagamento(funcionario: Funcionario): number {
      return funcionario.salario; // pagamento fixo
    }
  }
  
  // ProcessadorPagamento usa uma estratégia de pagamento sem modificar seu comportamento
  class ProcessadorPagamento {
    private estrategiaPagamento: PagamentoStrategy;
  
    constructor(estrategiaPagamento: PagamentoStrategy) {
      this.estrategiaPagamento = estrategiaPagamento;
    }
  
    processar(funcionario: Funcionario, horasTrabalhadas: number): string {
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
  
  // Interface Segregation Principle (ISP)
  // Interface Logger define um método de log
  interface Logger {
    log(message: string): void;
  }
  
  // Implementação para log no console
  class ConsoleLogger implements Logger {
    log(message: string): void {
      console.log(message);
    }
  }
  
  // Implementação para log em arquivo
  class FileLogger implements Logger {
    log(message: string): void {
      // Simula gravação em arquivo
      console.log(`Gravado em arquivo: ${message}`);
    }
  }
  
  // Dependency Inversion Principle (DIP)
  // App depende da abstração Logger, não de implementações concretas
  class App {
    private logger: Logger;
  
    constructor(logger: Logger) {
      this.logger = logger;
    }
  
    run(): void {
      this.logger.log("Aplicação iniciada.");
    }
  }
  
  // Utilizando a classe App com diferentes loggers
  const appConsole = new App(new ConsoleLogger());
  appConsole.run();
  
  const appFile = new App(new FileLogger());
  appFile.run();
  