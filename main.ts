interface Actionable<T> {
    cancel(): T;
    verify(): T;
    ship(): T;
}

interface State extends Actionable<State> {}

class Order implements Actionable<Order>{
    private state: State;

    constructor (state: State = new Placed()) {
        this.state = state
    }

    cancel(): Order {
        return new Order(this.state.cancel());
    }

    verify(): Order {
        return new Order(this.state.verify());
    }

    ship(): Order {
        return new Order(this.state.ship());
    }
}

class Placed implements State {
    cancel(): State {
        console.log("Cancelling the order");
        return new Cancelled();
    }

    verify(): State {
        console.log("Verifying the payment");
        return new Verified();
    }

    ship(): State {
        console.log("Cannot ship. Payment verification is required");
        return this;
    }
}

class Cancelled implements State {
    cancel(): State {
        console.log("Cannot cancel. Order has already been cancelled");
        return this;
    }

    verify(): State {
        console.log("Cannot verify. Order has been cancelled");
        return this;
    }

    ship(): State {
        console.log("Cannot ship. Order has been cancelled");
        return this;
    }
}

class Verified implements State {
    cancel(): State {
        console.log("Cancelling the order");
        return new Cancelled();
    }

    verify(): State {
        console.log("Will not verify. Order has already been verified");
        return this;
    }

    ship(): State {
        console.log("Shipping");
        return new Shipped();
    }
}

class Shipped implements State {
    cancel(): State {
        console.log("Cannot cancel. Order has already been shipped");
        return this;
    }

    verify(): State {
        console.log("Will not verify. Order has already been shipped");
        return this;
    }

    ship(): State {
        console.log("Will not ship. Order has already been shipped");
        return this;
    }
}


let order = new Order();
console.log(order);

order = order.verify().ship().cancel();
console.log(order);
