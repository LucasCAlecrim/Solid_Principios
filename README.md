# Solid_Principios
Estudos para o SOLID e seus Principios

# Solid_Principios
Estudos para o SOLID e seus Principios

# Explicação dos Princípios SOLID

## Single Responsibility Principle (SRP) - Princípio da Responsabilidade Única

- **Definição**: Uma classe deve ter apenas uma razão para mudar, ou seja, uma única responsabilidade.
- **Exemplo**: A classe `Funcionario` tem a responsabilidade de armazenar dados do funcionário. As responsabilidades de cálculo de pagamento e registro são separadas em outras classes (`PagamentoStrategy`, `ProcessadorPagamento`).

```typescript
// Responsável apenas por armazenar dados do funcionário
class Funcionario {
  nome: string;
  salario: number;

  constructor(nome: string, salario: number) {
    this.nome = nome;
    this.salario = salario;
  }
}

// Classe responsável pelo cálculo de pagamento
class CalculadoraPagamento {
  static calcular(funcionario: Funcionario, horasTrabalhadas: number): number {
    return funcionario.salario * horasTrabalhadas;
  }
}
```
## Open/Closed Principle (OCP) - Princípio Aberto/Fechado

- **Definição**: Entidades de software (classes, módulos, funções, etc.) devem estar abertas para extensão, mas fechadas para modificação.
- **Exemplo**: `PagamentoStrategy` permite adicionar novas estratégias de pagamento sem modificar o código existente. As classes `PagamentoPorHora` e `PagamentoFixo` implementam a interface `PagamentoStrategy`, e novas estratégias podem ser adicionadas conforme necessário.
```typescript
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

// Classe que usa a estratégia de pagamento
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

```

## Liskov Substitution Principle (LSP) - Princípio da Substituição de Liskov

- **Definição**: Subtipos devem ser substituíveis por seus tipos base sem alterar o comportamento correto do programa.
- **Exemplo**: `PagamentoStrategy` é uma interface que pode ser implementada por diferentes estratégias de pagamento, garantindo que qualquer implementação possa ser usada sem alterar o comportamento esperado.
```typescript
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

// Utilizando qualquer implementação de PagamentoStrategy sem alterar o comportamento
const funcionario = new Funcionario("João", 50);
const pagamentoPorHora = new PagamentoPorHora();
const pagamentoFixo = new PagamentoFixo();

console.log(pagamentoPorHora.calcularPagamento(funcionario, 160)); // 8000,00
console.log(pagamentoFixo.calcularPagamento(funcionario)); // 50,00


```

## Interface Segregation Principle (ISP) - Princípio da Segregação de Interfaces

- **Definição**: Uma interface não deve forçar uma classe a implementar métodos que ela não usa.
- **Exemplo**: `Logger` é uma interface simples que define um único método `log`. As classes `ConsoleLogger` e `FileLogger` implementam essa interface de acordo com suas necessidades específicas.
```typescript
// Interface para loggers
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

```
## Dependency Inversion Principle (DIP) - Princípio da Inversão de Dependência

- **Definição**: Dependências devem ser direcionadas para abstrações e não para concretizações. Os detalhes devem depender das abstrações, e não o contrário.
- **Exemplo**: `App` depende da interface `Logger` em vez de uma implementação concreta. Isso permite que diferentes tipos de loggers possam ser usados sem modificar a classe `App`.

```typescript
// Interface para loggers
interface Logger {
  log(message: string): void;
}

// Implementações de Logger
class ConsoleLogger implements Logger {
  log(message: string): void {
    console.log(message);
  }
}

class FileLogger implements Logger {
  log(message: string): void {
    console.log(`Gravado em arquivo: ${message}`);
  }
}

// Classe que depende da abstração Logger
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

```