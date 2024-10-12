import type { PaymentMethod } from "./modules";  // Ensure this is correctly imported

class Airtel implements PaymentMethod {
  constructor(private readonly phone: string, private readonly pin: string) {}
  pay(amount: string): string {
    return `Paying with Airtel ${amount} using ${this.phone}.`;
  }
}

class MTN implements PaymentMethod {
  constructor(private readonly phone: string, private readonly pin: string) {}
  pay(amount: string): string {
    return `Paying with MTN ${amount} using ${this.phone}.`;
  }
}

export default class PaymentGateWay {
  private amount: string;
  private phone: string;

  constructor(amount: string, phone: string) {
    this.amount = amount;
    this.phone = phone;
  }

  setGateway(method: string): string {
    switch (method) {
      case "MTN":
        const mtn = new MTN(this.phone, "2580");
        return mtn.pay(this.amount);
      default:
        const airtel = new Airtel(this.phone, "2580");
        return airtel.pay(this.amount);
    }
  }
}

// Example usage
const payment1 = new PaymentGateWay("100", "0750482089");
console.log(payment1.setGateway("Airtel")); // Outputs: Paying with Airtel 100 using 0750482089.

const payment2 = new PaymentGateWay("50", "0778743490");
console.log(payment2.setGateway("MTN")); // Outputs: Paying with MTN 50 using 0778743490.
